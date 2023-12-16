import React, { useState } from 'react';
import './CustomLink.css';

const CustomLink = ({ to, text, history, fontSize = '16px', fontFamily= '"Montserrat", sans-serif', state }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <a
      id='link'
      style={{fontSize, fontFamily}}
      className={`custom-link ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e)=>{
        e.preventDefault();
        if(to){
          history.push(`${to}`, { state });
          history.go(`${to}`, { state });
        }
      }}
    >
      {
      text
      }
    </a>
  );
};

export default CustomLink;
