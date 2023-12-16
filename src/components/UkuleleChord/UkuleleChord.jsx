import React from 'react';
import Data from '../../chordsData/ukulele.json'
import Chord from '@tombatossals/react-chords/lib/Chord'

import './UkuleleChord.css'


const UkuleleChord = ({ chordName }) => {
    //// console.log(chordName.split(''))
    let mainChordName = chordName.split('')[0] 
    // let suffixChordName = chordName.split('')[chordName.split('').lenght] 
    const instrument = Data.main
    const tunings = Data.tunings
    //// console.log(tunings)
    const instrumentnew = {...instrument, tunings}
    const chord = Data.chords[mainChordName][0];
    //// console.log(chord)
    //// console.log(instrumentnew)
  return (
    <div className='chord-container'>
      <Chord
        chord={chord.positions[0]}
        instrument={instrumentnew}
        />
    </div>
  );
};

export default UkuleleChord;
