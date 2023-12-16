import React, { useState } from 'react';
import axios from 'axios';

import './AdminDeleteAuthor.css';

const AdminDeleteAuthor = ({ authors }) => {

    const [author, setAuthor] = useState(null)
  
    const handleChange = (e) =>{
      const { value } = e.target;
      setAuthor(value)
    }
  
    const handleClick = async (e) => {
      try{
        let result = await axios.delete(`/authors/${author}`);
        console.log(result);
        console.log('song deleted')
      }
      catch(err){
        console.log(err)
      }
    }
  
    return(
      <div className='authorDeleteAdmin'>
      <h1>
      Delete Author
      </h1>
      <div>
      <select className='selectDeletAuthor' name="author" value={author || ''} onChange={handleChange}>
        <option value="">Select an author</option>
        {
        authors?.map((author, id) => (
          <option key={id} value={author._id}>
            {author.name}
          </option>
        ))
        }
      </select>
      </div>
      <button className='adminDeleteAuthor-submit' type="submit" onClick={handleClick}>Delete</button>
    </div>
    )
  }


export default AdminDeleteAuthor