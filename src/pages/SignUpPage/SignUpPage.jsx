import React, { useState } from 'react';
import './SignUpPage.css';

import axios from 'axios';

function SignupPage(props) {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); 
  
  const handleClick = async (e) => {
    // Handle the click event
    e.preventDefault();
    if(password === passwordRepeat){
      await sendNewUser(email, username, password)
    }
  };

  const sendNewUser = async (email, username, password) => {
    try{
      let response = await axios.post('/user/register', { email, username, password });
      if(response.status === 200){
        props.history.push('/');
        props.history.go('/');
      }else{
        setErrorMessage('something went wrong')
      }
    }catch(err){
     // console.log(err)
    }
  }

  return (
    <div className="container">
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="center">
        <h2>Sign up</h2>
        {errorMessage ? <div className='error'>{errorMessage}</div>: null}
        <input type="text" placeholder="user name" onChange={(e)=>setUsername(e.target.value)}/>
        <input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
        <input type="password" placeholder="repeat password" onChange={(e)=>setPasswordRepeat(e.target.value)}/>

        <div className="inputBox">
          <input type="submit" value="Sign up" onClick={(e)=>handleClick(e)}/>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
