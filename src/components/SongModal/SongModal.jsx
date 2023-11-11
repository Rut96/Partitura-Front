import React, {useState, useEffect} from "react";
import axios from "axios";

export const SongModal = ({image, title, dateAdded, author, genre, _id, history, instrument}) => {
    // Initialize state to store the fetched data
    const [authorData, setAuthor] = useState([]);

    useEffect(() => {
      const apiUrl = `/authors/${author}`;
      axios.get(apiUrl)
        .then(({data}) => {
          // Update the state with the fetched data
          setAuthor(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, [author]);

    const handleClick = () => {
     // console.log(history);
        history.push('/song', { _id: _id, instrument } );
        history.go('/song', { _id: _id, instrument } );
    };



    return(
      <div className="card r1" onClick={()=>handleClick()}>
        <img src={image} alt="Mountains" />
          <div className="card-content">
          <h2>{title}</h2>
          <p>{authorData.name}, {genre}</p>
        </div>
      </div>
    )
}
