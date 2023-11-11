import React from 'react';
import Data from '../../../chordsData/guitar.json'
import Chord from '@tombatossals/react-chords/lib/Chord'

import './Chords'


const ChordComponent = ({ chordName }) => {
    let mainChordName = chordName.split('')[0] 
    const instrument = Data.main
    const tunings = Data.tunings
    const instrumentnew = {...instrument, tunings}
    const chord = Data.chords[mainChordName][0];
  return (
    <div className='chord-container'>
      <Chord
        chord={chord.positions[0]}
        instrument={instrumentnew}
        />
    </div>
  );
};

export default ChordComponent;
