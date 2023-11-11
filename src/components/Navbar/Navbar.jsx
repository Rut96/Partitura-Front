import React, { useState, useEffect } from "react";
import './Navbar.css';
import logo from './logo.svg';

import axios from 'axios';


function Navbar() {
  const [searchText, setSearchText] = useState('');
  const placeHolder = 'Search';
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
      axios.get('/isLogIn').then(res=>{
        setIsUserLoggedIn(res.data);
      })
  }, []);

  const clickOnSearch = () => {
    alert(searchText);
    setSearchText('');
  };

  const login = () => {
    return(
      <a href="/login" >
        <button className="log-in">Log in</button>
      </a>
    )
  }
  const logOut = () => {
    return(
      <a href="#" >
        <button className="log-in" onClick={()=>sendLogOut()}>Log out</button>
      </a>
    )
  }

const sendLogOut = async () => {
try{
    axios.get('/logout', {withCredentials: true}).then(res=>{
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
          <li><a href="/">Home</a></li>
          <li><a href="/contant">Contact</a></li>
          {
            isUserLoggedIn ? <li><a href="/profile">Profile</a></li> : null
          }
          <li className="search">
            <form className="search-form"onSubmit={(e)=>e.preventDefault()}>
              <input type="text" placeholder={placeHolder} onChange={(e) => setSearchText(e.target.value)}/>
              <input type="submit" value="Search" onClick={clickOnSearch}/>
            </form>
          </li>
          {isUserLoggedIn ? '' : <li><a href="/signup">Sign up</a></li>}
        </ul>
      </nav>
      {
        isUserLoggedIn ? logOut() : login()
      }
    </header>
  );
}

export default Navbar;
