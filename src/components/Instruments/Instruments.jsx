import React from "react";
import './Instruments.css'
import guitar from './guitar.svg';
import piano from './piano.svg';
import ukulele from './ukulele.svg';

export default function Instruments({chooseInstrument}) {
  const choose = (item) => {
    chooseInstrument(item)
  } 
    return (
      <div className="music-container">
          <div className="music-item item-1 guitar" onClick={()=>choose("guitar")} >
            <img src={guitar} alt="article-cover" />
          </div>

          <div className="music-item item-2 piano" onClick={()=>choose("piano")} >
            <img src={piano} alt="article-cover" />
          </div>
          <div className="music-item item-3 ukulele" onClick={()=>choose("ukulele")}>
            <img src={ukulele} alt="article-cover" />
          </div>
        </div>
    )
}