import React from "react";
import './UkuleleChordsContainer.css';

import UkuleleChord from '../UkuleleChord/UkuleleChord';

export default function UkuleleChordsContainer(props) {


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
                    <UkuleleChord
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