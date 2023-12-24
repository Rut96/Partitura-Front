import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassPage.css';

import CustomLink from '../../components/CustomLink/CustomLink';

function ForgotPassPage(props) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post('/auth/forgotPassword', { email });
      if (res.status === 401) {
        setErrorMessage('Username or password is incorrect.');
      }
      props.history.push('/login');
      props.history.go('/login');
    } catch (err) {
      if(err.response.status===401){
        setErrorMessage('Username or password is incorrect.');
      }
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
      <div className="center">
        <h2>Forgot Password</h2>
        <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        
        {errorMessage ? <div className="error-message">{errorMessage}</div>: null}
        
        <button className="google-auth" onClick={handleLoginWithGoogle}>Google</button>
        <button className="facebook-auth" onClick={handleLoginWithFacebook}>Facebook</button>

        <div className="links">
          <CustomLink to={'/signup'} text='Signup' history={props.history}/>
        </div>
        <div className="inputBox">
          <input type="submit" value="Reset pass" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassPage;
