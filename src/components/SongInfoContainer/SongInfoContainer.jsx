import React, { useState } from "react";
import './SongInfoContainer.css';
import ReactPlayer from 'react-player'

export default function SongInfoContainer(props){
    return(
        <div className="info-container">
        <div className="author">
          <a className="link-author" onClick={props.goToAuthor}>
            {props.authorName}
          </a>
        </div>

        <div className="song-name">{props.title}</div>
        <div className="youtube">
          <ReactPlayer url={props.songVideo}  className='video-area'/> 
        </div>
        </div>
    )
}