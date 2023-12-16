import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

import CustomLink from '../../components/CustomLink/CustomLink';

function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); 

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      axios({
        method: 'POST',
        url: '/auth/loginLocal',
        data: { username: email, password }
      }).then((res)=>{
        if(res.status===200){
          props.history.push('/profile');
          props.history.go('/profile');
        }
      })
    } catch (err) {
      setErrorMessage('Username or password is incorrect.');
    }
  }

  const handleLoginWithGoogle = () => {
    window.location.href = 'http://localhost:3030/auth/google';
  }

  const handleLoginWithFacebook = () => {
    window.location.href = 'http://localhost:3030/auth/facebook';
  }

  return (
    <div className="container">
      <div className="top"></div>
      <div className="bottom"></div>
      <form className="center">

        <h2>Login</h2>
        <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        
        {errorMessage ? <div className="error-message">{errorMessage}</div>: null}
        
        <div className="google-auth" onClick={handleLoginWithGoogle}>Google</div>
        <div className="facebook-auth" onClick={handleLoginWithFacebook}>Facebook</div>

        <div className="links">
          <CustomLink to={'/forgot'} text='Forgot Password' history={props.history}/>
          <CustomLink to={'/signup'} text='Signup' history={props.history}/>
        </div>

        <div className="inputBox">
          <input type="submit" value="Login" onClick={(e)=>handleSubmit(e)} />
        </div>

      </form>
    </div>
  );
}

export default LoginPage;
