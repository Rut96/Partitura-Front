
import React from 'react';
import ChordSheetJS from 'chordsheetjs';

import './Song.css';


export default class SongPage extends React.Component {
  constructor(props){
    super(props)
    let { lyrics } = props.lyrics;
    this.state = {
      lyrics
    }
  }



  render(){
    const parser = new ChordSheetJS.UltimateGuitarParser();
    const song = parser.parse(this.props.lyrics.substring(1))
    const formatter = new ChordSheetJS.HtmlTableFormatter()
    const formatter2 = new ChordSheetJS.HtmlDivFormatter()
    const disp2 = formatter2.format(song)
    const disp = formatter.format(song)
    return(
      <div>
        <div className='chord-sheet' dangerouslySetInnerHTML={{__html: disp}}/>
      </div>
    )
  }
}
