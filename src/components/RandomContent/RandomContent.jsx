import React from "react";
import './RandomContent.css'
import axios from "axios";
import { SongModal } from '../SongModal/SongModal'

const RandomContent = (props) => {

  const handleFavoriteClick = (item) => {
    let body = item;
    try{
      axios.post('/user/favorites', body).then((res) => {
        alert('add song to favorite');
      })
    }catch(err){
        alert('cant add song to favorite, please check if you loged in');
    }
  }

  return (
    <div className="content-container">
      {
        props.contentItems?.map((item, index) => {
          let { image, title, dateAdded, author, genre, _id, authorName } = item;

          return (
            <div key={index}>
              {
                props.isLogin ?
                  <div onClick={() => handleFavoriteClick(item)} style={{ cursor: 'pointer' }}>
                    '❤️'
                  </div>
                  : null
              }
              <SongModal
                key={_id}
                _id={_id}
                image={image}
                title={title}
                dateAdded={dateAdded}
                author={author}
                genre={genre}
                authorName={authorName}
                history={props.history}
                instrument={props.instrument}
              />
            </div>
          );
        })
      }
    </div>
  );
}

export default RandomContent;
