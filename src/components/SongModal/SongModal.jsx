import React from "react";
import './SongModal.css';

export const SongModal = ({image, title, genre, _id, history, instrument, authorName}) => {


    const handleClick = () => {
     // console.log(history);
        history.push('/song', { _id: _id, instrument } );
        history.go('/song', { _id: _id, instrument } );
    };



    return(
      <div className="card" onClick={()=>handleClick()}>
        <img src={image} alt="song-img" />
          <div className="card-content">
          <h2>{title}</h2>
          <p>{authorName}, {genre}</p>
        </div>
      </div>
    )
}
