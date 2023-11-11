import React from "react";
import './Font.css';

function Font({handleFont}){
  const handleClick = (event) => {
    handleFont(event)
  }
    return(
        <div className="font">
              <h1>font</h1>
              <button className="font-btn-plus btn-blow" onClick={()=>handleClick('up')}>
                <span>+</span>
              </button>
              <button className="font-btn-minus btn-blow" onClick={()=>handleClick('down')}>
                <span>-</span>
              </button>
        </div>
    )
}

export default Font;