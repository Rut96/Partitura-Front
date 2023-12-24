import React from "react";
import Transpose from './Transpose/Transpose';
import Scroll from "./Scroll/Scroll";
import Font from "./Font/Font";
import Favorite from "./Favorite/Favorite";

import './SongSettingsContainer.css';

const SongSettingsContainer = ({transpose, scrollDown, isLogin, handleAddFav, handleFont}) => {

  const handleAdd = () =>{
    handleAddFav()
  }

  return (
    <div className="settings-container">
      <Transpose transpose={transpose} />
      <Scroll scrollDown={scrollDown}/>
      <Font handleFont={handleFont}/>
      {
        isLogin ? <div onClick={handleAdd}>
        <Favorite />
        </div> : null
      }
    </div>
  );
};

export default SongSettingsContainer;
