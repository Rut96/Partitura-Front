import React from "react";
import './SongLyricsContainer.css';

import Song from '../Song/Song';


export default function SongLyricsContainer(props){
    return(
        <div className="song" style={{ fontSize: `${props.fontSize}px` }}> 
            <Song lyrics={props.lyrics} key={props.id} />
        </div> 
    )
}