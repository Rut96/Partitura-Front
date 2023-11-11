import React from "react";
import './ChordContainer.css';

import ChordComponent from './Chords/Chords';

export default function ChordContainer(props){
    return(
    <div className="chords-container">
        <div>
          <h2>
          Accords:
          </h2>
        </div>
        <div className="chords_item">
            {
                props.chords.map((chordName, index) => (
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
  )
}
