import React from "react";
import './SongInfoContainer.css';
import ReactPlayer from 'react-player'; 
import CustomLink from '../../components/CustomLink/CustomLink';

export default function SongInfoContainer(props){

    return(
        <div className="info-container">
        <div className="author">
         
            <CustomLink 
            fontSize='32px'
            className='link-author' 
            to='/author' 
            text={props.authorName}  
            state={props.author}
            history={props.history}
            />
        </div>

        <div className="song-name">{props.title}</div>
        <div className="youtube">
          <ReactPlayer url={props.songVideo}  className='video-area'/> 
        </div>
        </div>
    )
}