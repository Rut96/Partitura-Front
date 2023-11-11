import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

function LoginPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post('/login', { username, password });

      if (res.status === 302) {
       // console.log('redirect')
        // Handle success action here
        // Redirect or set state as needed
      } else if (res.status === 401) {
        // Authentication failure, set error message
        setErrorMessage('Username or password is incorrect.');
      }

     // console.log(props);
      props.history.push('/profile', { user: res.data });
      props.history.go('/profile', { user: res.data });
    } catch (err) {
     // console.log(err);
      
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
        <h2>Login</h2>
        <input type="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        
        {errorMessage ? <div className="error-message">{errorMessage}</div>: null}
        
        <button className="google-auth" onClick={handleLoginWithGoogle}>Google</button>
        <button className="facebook-auth" onClick={handleLoginWithFacebook}>Facebook</button>

        <div className="links">
          <a href="#">Forgot Password</a>
          <a href="/signup">Signup</a>
        </div>
        <div className="inputBox">
          <input type="submit" value="Login" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
