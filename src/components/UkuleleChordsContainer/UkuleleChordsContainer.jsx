import React from "react";
import './UkuleleChordsContainer.css';

import UkuleleChord from '../UkuleleChord/UkuleleChord';

export default function UkuleleChordsContainer(props) {


  return(
    <div className="chords-container_ukulele">
      <div>
        <h2>
        Accords:
        </h2>
      </div>
      <div className="chords_item_ukulele">
          {
              props.chords.map((chordName, index) => (
                  <div key={index} className="chord-item_ukulele">
                    <UkuleleChord
                      chordName={chordName}
                      />
                    <div className="chord-name_ukulele">{chordName}</div>
                  </div>
              ))
          }
      </div>
  </div>
  )

}