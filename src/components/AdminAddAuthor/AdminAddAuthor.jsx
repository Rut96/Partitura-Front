import React, { useState } from 'react';
import axios from 'axios';

import './AdminAddAuthor.css';
  
const AdminAddAuthor = () => {
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        birthdate: '',
        image: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const apiUrl = '/authors';
  
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
      <form onSubmit={handleSubmit} className='addAuthor'>
        <h1>
          Add Author
        </h1>

        <div>
          <input className='adminAddAuthor-input' placeholder='Name' type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
  
        <div>
          <textarea className='adminAddAuthor-input' placeholder='Bio' name="bio" value={formData.bio} onChange={handleChange} />
        </div>
  
        <div>
          <input className='adminAddAuthor-input' placeholder='Birthdate' type="text" name="birthdate" value={formData.birthdate} onChange={handleChange} />
        </div>
  
        <div>
          <input className='adminAddAuthor-input' placeholder='Image' type="text" name="image" value={formData.image} onChange={handleChange} />
        </div>
  
        <button className='adminAddAuthor-submit' type="submit">Submit</button>
  
      </form>
    );
  };

  export default AdminAddAuthor;