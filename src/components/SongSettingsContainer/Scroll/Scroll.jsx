import React from "react";
import './Scroll.css';
function Scroll({scrollDown}){
  const handleScrollDown = () => {
    scrollDown()
  };
    return(
        <div className="scroll">
        <h1>scroll down</h1>
        <a className="scroll-arrow-down" onClick={handleScrollDown}>
          <span className="left-arm"></span>
          <span className="right-arm"></span>
          <span className="arrow-slide"></span>
        </a>
      </div> 
    )
}

export default Scroll