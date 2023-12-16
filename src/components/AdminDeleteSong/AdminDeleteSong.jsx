import React, { useState } from 'react';
import axios from 'axios';

import './AdminDeleteSong.css';

const AdminDeleteSong = ({ songs }) => {

  const [song, setSong] = useState(null)

  const handleChange = (e) =>{
    const { value } = e.target;
    setSong(value)
  }

  const handleClick = async (e) => {
    try{
      let result = await axios.delete(`/songs/${song}`);
      console.log(result);
      console.log('song deleted')
    }
    catch(err){
      console.log(err)
    }
  }

  return(
    <div className='songDeleteAdmin'>
    <h1>
    Delete Song
    </h1>
    <select className='selectDeleteSong' name="song" value={song || ''} onChange={handleChange}>
      <option value="">Select an song</option>
      {
      songs?.map((song, id) => (
        <option key={id} value={song._id}>
          {song.title}
        </option>
      ))
      }
    </select>
    <button type="submit" className='adminDeleteSong-submit' onClick={handleClick}>Delete</button>
  </div>
  )
}


export default AdminDeleteSong;