import React, { useState, useEffect } from "react";
import './Navbar.css';
import logo from './logo.svg';

import axios from 'axios';


function Navbar(props) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
      axios.get('/isLogIn').then(res=>{
        let { role } = res.data;
        role === 'admin' ? setShowAdmin(true) : setShowAdmin(false);
        setIsUserLoggedIn(res.data ? true : false);
      })
  }, []);

  const login = () => {
    return(
      <a href="/login" >
        <button className="log-in">Log in</button>
      </a>
    )
  }
  const logOut = () => {
    return(
      <div >
        <button className="log-in" onClick={()=>sendLogOut()}>Log out</button>
      </div>
    )
  }

  const sendLogOut = async () => {
  try{
      axios.get('/auth/logout', {withCredentials: true}).then(res=>{
      window.location.href = '/';
      });
  }catch(error){
      console.error('Logout failed:', error);
  }
  }

  return (
    <header style={{ backgroundColor: 'rgb(207, 217, 229)' }}>
      <img className="logo" src={logo} alt="logo" />
      <nav>
        <ul className="nav-links">
          <li><a href="/" className="link home">Home</a></li>
          <li><a href="/contact" className="link contact">Contact</a></li>
          {
            isUserLoggedIn ? <li><a href="/profile" className="link profile">Profile</a></li> : null
          }
          {
            showAdmin ?  <li><a href="/admin" className="link profile">Admin</a></li> : null
          }

          {isUserLoggedIn ? '' : <li><a href="/signup" className="link signup">Sign up</a></li>}
        </ul>
      </nav>
      {
        isUserLoggedIn ? logOut() : login()
      }
    </header>
  );
}

export default Navbar;
