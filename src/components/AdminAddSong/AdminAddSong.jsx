import React, { useState } from 'react';
import axios from 'axios';

import './AdminAddSong.css';

const AdminAddSong = ({authorsArr}) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    authorName: '',
    lyrics: '',
    genre: '',
    type: '',
    chords: '',
    image: '',
    songVideo: '',
    dateAdded: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleChangeAuthor = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    let authorId = value;
    let authorName = authorsArr.filter((author)=>{
      return author._id === authorId
    })
    setFormData({
      ...formData,
      authorName: authorName[0].name
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = '/songs';

    try {
      // Using Axios to send a POST request
      const response = await axios.post(apiUrl, formData);

      console.log('Success:', response.data);
      // You can handle the success response here
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='addSongAdmin'>
      <h1>
        Add Song
      </h1>

      <div>
        <input className='adminAddSong-input' type="text" placeholder="Title" name="title" value={formData.title} onChange={handleChange} />
      </div>

      <div>
        <select className='adminAddSong-input' name="author" placeholder='Author' value={formData.author} onChange={handleChangeAuthor}>
          <option value="">Select an author</option>
          {
          authorsArr.map((author, id) => (
            <option key={id} value={author._id}>
              {author.name}
            </option>
          ))
          }
        </select>
      </div>

      <div>
        <textarea className='adminAddSong-input' name="lyrics" placeholder="Lyrics" value={formData.lyrics} onChange={handleChange} />
      </div>

      <div>
        <input className='adminAddSong-input' type="text" placeholder='Genre' name="genre" value={formData.genre} onChange={handleChange} />
      </div>

      <div>
        <input className='adminAddSong-input' type="text" placeholder='Image' name="image" value={formData.image} onChange={handleChange} />
      </div>

      <div>
        <input className='adminAddSong-input' type="text" placeholder='Song Video' name="songVideo" value={formData.songVideo} onChange={handleChange} />
      </div>

      <div>
        <input className='adminAddSong-input' type="text" placeholder='Date Added' name="dateAdded" value={formData.dateAdded} onChange={handleChange} />
      </div>
      <button className='adminAddSong-input adminAddSong-submit' type="submit">Submit</button>

    </form>
  );
};

export default AdminAddSong;
