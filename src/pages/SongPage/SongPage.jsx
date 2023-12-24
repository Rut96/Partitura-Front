// src/components/SongPage.js
import React from 'react';
import axios from 'axios';
import ChordSheetJS from 'chordsheetjs';
import './SongPage.css'

import SongSettingsContainer from '../../components/SongSettingsContainer/SongSettingsContainer';
import SongInfoContainer from '../../components/SongInfoContainer/SongInfoContainer';
import Instruments from '../../components/Instruments/Instruments';

import ChordContainer from '../../components/ChordContainer/ChordContainer';
import SongLyricsContainer from '../../components/SongLyricsContainer/SongLyricsContainer';

import SongCard from '../../components/SongCard/SongCard'

import UkuleleChordsContainer from '../../components/UkuleleChordsContainer/UkuleleChordsContainer';
import PianoChordContainer from '../../components/PianoChordContainer/PianoChordContainer';

export default class SongPage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      id: props.location.state._id,
      author: '',
      chords: '',
      dateAdded: '',
      genre: '',
      image: '',
      lyrics: '',
      title: '',
      amount: 0,
      lyricsOld: '',
      authorData: '',
      songVideo: '',
      scrollInterval: null,
      scrollToggleFlag: true,
      authorSongs: [],
      isLogin: false,
      instrumentChoosen: props.location.state.instrument,
      fontSize: 24
    }
  }

  componentDidMount(){
    this.isLogin();
    axios.get(`/songs/${this.state.id}`).then((res)=>{
     // console.log(res)
      let { author, chords, dateAdded, genre, image, lyrics, title, songVideo, _id } = res.data;
     // console.log(res.data)
      lyrics = this.transposeChordSheet( lyrics , 0 );
      this.setState({
        author,
        chords,
        dateAdded,
        genre,
        image,
        lyrics,
        title,
        amount: 0,
        lyricsOld: lyrics,
        songVideo,
        _id
      });
      //authors
      axios.get(`/authors/${this.state.author}`).then((res)=>{
        this.setState({authorData: res.data})
      }).then(()=>{
        axios.get(`/songs/search/author/${this.state.author}`).then((res)=>{
          this.setState({ authorSongs: res.data })
        });
      })

    })
  }

  scrollDown = () => {
    const scrollDistance = 20; // 10 pixels, assuming 1 centimeter is approximately 10 pixels
    const scrollDuration = 1000; // 1000 milliseconds (1 second)

    if (!this.state.scrollInterval) {
      const scrollInterval = setInterval(() => {
        window.scrollBy(0, scrollDistance);
      }, scrollDuration);
      this.setState({ scrollInterval });
    }
  };

  stopScrolling = () => {
    if (this.state.scrollInterval) {
      clearInterval(this.state.scrollInterval);
      this.setState({ scrollInterval: null });
    }
  };

  scrollToggle(){
    let flag = this.state.scrollToggleFlag;
    flag ? this.scrollDown() : this.stopScrolling();
    flag = !flag;
    this.setState({scrollToggleFlag: flag})
  }

  transposeChordSheet = (chordSheet, transposition) => {
    const lines = chordSheet.split('\n');
    const transposedLines = [];
  
    lines.forEach((line) => {
      if (line.trim() === '') {
        transposedLines.push(line);
        return;
      }
  
      const tokens = line.split(/\s+/);
  
      const transposedTokens = tokens.map((token) => {
        if (token.match(/[A-G][#b]?[0-9]?/)) {
          // Transpose chords based on the provided interval
          return this.transposeChord(token, transposition);
        } else {
          return token;
        }
      });
  
      transposedLines.push(transposedTokens.join(' '));
    });
  
    return transposedLines.join('\n');
  };
  
  transposeChord(chord, amount) {
    let scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    let normalizeMap = {"Cb":"B", "Db":"C#", "Eb":"D#", "Fb":"E", "Gb":"F#", "Ab":"G#", "Bb":"A#",  "E#":"F", "B#":"C"}
    return chord.replace(/[CDEFGAB](b|#)?/g, function(match) {
        let i = (scale.indexOf((normalizeMap[match] ? normalizeMap[match] : match)) + amount) % scale.length;
        return scale[ i < 0 ? i + scale.length : i ];
    })
}
  
  transposeRootNote = (rootNote, transposition) => {
    const notes = 'C,C#,D,D#,E,F,F#,G,G#,A,A#,B'.split(',');
    const rootIndex = notes.indexOf(rootNote);
    
    if (rootIndex !== -1) {
      const transposedIndex = (rootIndex + transposition) % 12;
      return notes[transposedIndex];
    } else {
      return rootNote;
    }
  };

  // Function to extract chords from a chord sheet
  extractChordsFromChordSheet = (chordSheet) => {
  const parser = new ChordSheetJS.UltimateGuitarParser();
  const song = parser.parse(chordSheet);
  
  const allChords = [];
  
  song.lines.forEach((line) => {
    line.items.forEach((item) => {
      // console.log(item)
      if(item.chords){
        // console.log(item.chords)
          allChords.push(item.chords.replaceAll('0', 'maj'));
      }
    });
  });

  // console.log(allChords)
  
  //filter unique items
  return allChords.filter((value, index)=> allChords.indexOf(value) === index);
};
  
  transpose(num){
    this.setState({
      amount: num
    })
    let newLyrics = this.transposeChordSheet( this.state.lyrics , this.state.amount);
    this.setState({
      lyrics: newLyrics
    })
  }

  restartTransporse(){
    this.setState({
      amount: 0
    })
    this.setState({
      lyrics: this.state.lyricsOld
    })
  }

  goToAuthor(e){
   console.log(this.props)
    this.props.history.push('/author', { author: this.state.author});
    this.props.history.go('/author', { author: this.state.author });
  }

  isLogin(){
    axios.get('/isLogIn').then((res)=>{
      this.setState({isLogin:res.data})
    })
  }

  handleFavoriteClick(){
    // in db we'r checking that there arn't duplicates  
    let body = this.state;
    axios.post('/user/favorites', body).then((res)=>{
      alert('add song to favorite')
    })
  }

  chooseInstrument(item){
    this.setState( { instrumentChoosen: item } )
  }

  guitarChords(chords){
    return(
      <ChordContainer chords={chords}/>
    )
  }

  pianoChords(chords){
    return <PianoChordContainer chords={chords}/>
  }

  ukuleleChords(chords){
    return(
      <UkuleleChordsContainer chords={chords}/>
    )
  }

  drawChordsByType(type, chords){
    switch(type){
      case 'guitar':
        return this.guitarChords(chords);
      case 'piano':
        return this.pianoChords(chords);
      case 'ukulele':
        return this.ukuleleChords(chords);
      default:
        return this.guitarChords(chords);
    }
  }

  handleFontChange(eventType){
    eventType === 'up' ? this.setState({fontSize: this.state.fontSize+1}) :  this.setState({fontSize: this.state.fontSize-1});
    // console.log(this.state.fontSize);
  }

  render() {
    const chords = this.extractChordsFromChordSheet(this.state.lyrics);
    console.log(this.state.author)
    return (
      <div>
        <div className="main-songPage-container">
          <div className="other-songs-container">
            {
              this.state.authorSongs.length > 0 ? this.state.authorSongs.map((song, index)=>{
                return <SongCard key={index} imageUrl={song.image} title={song.title} author={song.author} 
                                  genre={song.genre} _id={song._id} history={this.props.history}/>
              }) : null
            }
          </div>

          {
            <Instruments 
            chooseInstrument={this.chooseInstrument.bind(this)} 
            className='instruments'/>
          }

          {
            this.state.lyrics ? <SongSettingsContainer 
            handleFont={this.handleFontChange.bind(this)} 
            handleAddFav={this.handleFavoriteClick.bind(this)} 
            isLogin ={ this.state.isLogin } 
            transpose={this.transpose.bind(this)} 
            scrollDown={this.scrollToggle.bind(this)}
            /> : null
          }

          {
            <SongInfoContainer 
              authorName={this.state.authorData.name} 
              title={this.state.title} 
              songVideo={this.state.songVideo}
              author={this.state.author}
              history={this.props.history}
              // goToAuthor={this.goToAuthor.bind(this)}
            />
          }
  
          {
            <SongLyricsContainer 
            lyrics={this.state.lyrics} 
            id={this.state.id}
            fontSize={this.state.fontSize}
            />
          }

          {
            this.drawChordsByType(this.state.instrumentChoosen, chords)
          }
          
        </div>
      </div>
    );
  }
}

