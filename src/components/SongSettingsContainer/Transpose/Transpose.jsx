import React from "react";
import './Transpose.css';


function Transpose({transpose}){
  let count = 1
  const handleTransposeUp = () => {
    count === 12 ? count = 1 : count++
    transpose(count);
  };
  const handleTransposeDown = () => {
    count === 0 ? count = 12 : count--
    transpose(10);
  };

    return(
    <div className="transpose">
    <h1>transpose</h1>
    <a className="arrow-up" onClick={handleTransposeUp}>
      <span className="left-arm"></span>
      <span className="right-arm"></span>
      <span className="arrow-slide"></span>
    </a>
    <a className="arrow-down" onClick={handleTransposeDown}>
      <span className="left-arm"></span>
      <span className="right-arm"></span>
      <span className="arrow-slide"></span>
    </a>
  </div>)
}

export default Transpose;