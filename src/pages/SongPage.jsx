// src/components/SongPage.js
import React, { useRef } from 'react';
import axios from 'axios';
import ChordSheetJS from 'chordsheetjs';
import './SongPage.css'

import Song from '../components/Song/Song';

import ChordComponent from '../components/Chords/Chords';

// const containerRef = useRef(null);

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
      authorData: ''
    }
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
  
  transposeChord = (chord, transposition) => {
    // Extract the chord name and any number following it
    const matches = chord.match(/^([A-G][#b]?)([0-9]*)$/);
  
    if (matches) {
      const rootNote = matches[1];
      const chordNumber = parseInt(matches[2]) || 0;
  
      // Transpose the chord root note based on the provided interval
      const transposedRootNote = this.transposeRootNote(rootNote, transposition);
  
      // Combine the transposed root note with the chord number
      const transposedChord = transposedRootNote + chordNumber;
  
      return transposedChord;
    } else {
      return chord;
    }
  };
  
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
        allChords.push(item.chords);
      }
    });
  });
  
  return allChords.filter((value, index)=> allChords.indexOf(value) === index);
};
  
  

  componentDidMount(){
    axios.get(`/songs/${this.state.id}`).then((res)=>{
      console.log(res)
      let { author, chords, dateAdded, genre, image, lyrics, title } = res.data;
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
        lyricsOld: lyrics
      });
      //authors
      axios.get(`/authors/${this.state.author}`).then((res)=>{
        console.log(res.data)
        this.setState({authorData: res.data})
      })
    })
  }

  transpose(num){
    this.setState({
      amount: num
    })
    let newLyrics = this.transposeChordSheet( this.state.lyrics , this.state.amount);
    this.setState({
      lyrics: newLyrics
    })
    // console.log(this.state)
  }

  restartTransporse(){
    this.setState({
      amount: 0
    })
    // let newLyrics = this.transposeChordSheet( this.state.lyrics , this.state.amount);
    this.setState({
      lyrics: this.state.lyricsOld
    })
  }

  render(){
    console.log(this.state)
    if(this.state.lyrics.length> 0){
      const chords = this.extractChordsFromChordSheet(this.state.lyrics);
      console.log(chords);
      return(
        <div className='songContainer'>
          <div className='song-area'>
          <div>
            <h1>
              { this.state.authorData.name }
            </h1>
          </div>
          <h1>{this.state.title}</h1>
          <div className='transposeBtn'>
            <button onClick={()=>this.transpose(1)}>Transpose Up</button>
            <button onClick={()=>this.restartTransporse()}>Restart Transpose</button>
          </div>
          <Song lyrics={this.state.lyrics} key={this.state.id}/>

          </div>
          
          <div className="chords-area">
            <div className='chords-component'>

            
          {
          chords.map((chordName, index) => (
            <div key={index} className="chord-item">
              <ChordComponent
                chordName={chordName}
                />
              <div className="chord-name">{chordName}</div>
            </div>
          ))
          }
          </div>
          </div>

          <div className='video-area'>

          </div>
          <div className='content-area'>

          </div>
        </div>
      )
    }else{
      return(
        <div>
          Loading ...
        </div>
      )
    }
  }
}



