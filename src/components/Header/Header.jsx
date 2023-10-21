import React, { useState, useEffect } from "react";
import './Header.css';
// import { Link } from 'react-router-dom';
import axios from "axios";

function Header() {
  // const history = useHistory();s
   
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [searchText, setSearchText] = useState('');
  const placeHolder = 'Search';
  // const searchData = [];

  useEffect(() => {
    // Update the document title using the browser API
      axios.get('/isLogIn').then(res=>{
        // console.log(res.data)
        setIsUserLoggedIn(res.data);
      })
  }, []);

  const searchField = ({ searchText, placeHolder }) => {
    return (
      <div className="grid-item">
        <input
          value={searchText}
          placeholder={placeHolder}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-field"
        />
      </div>
    );
  };

  const clickOnSearch = () => {
    // console.log(searchText);
    alert(searchText);
    setSearchText('');
  };

  const searchButton = () => {
    return (
      <button className="grid-item search-button" onClick={clickOnSearch}>
        Search
      </button>
    );
  };

  const navigateToLogin = () => {
    // <Link to="/login">Login</Link>
    window.location.href = '/login';
    // Use appropriate navigation method based on your router configuration
  };

  const navigateToSignup = () => {
    window.location.href = '/signup';
  };

  const sendLogOut = async () => {
    try{
      axios.get('/logout', {withCredentials: true}).then(res=>{
        window.location.href = '/';
      });
    }catch(error){
      console.error('Logout failed:', error);
    }
  }

  const signup = () => {
    return (
      <button onClick={navigateToSignup}>
        Sign Up
      </button>

    );
  };

  const logIn = () => {
    return (
      <button  onClick={navigateToLogin}>
        Login
      </button>

    );
  };

  const logOut = () => {
    return (
      <button className="grid-item log item4" onClick={sendLogOut} >LOGOUT</button>
    );
  };

  const drawMenu = () => {
    const menuItemsForLoggedUser = ['Home', 'Personal', 'Instruments', 'Genres', 'Tuner', 'Help'];
    const menuItemsForNotLoggedUser = ['Home', 'Instruments', 'Genres', 'Tuner', 'Help'];
    const userMenu = isUserLoggedIn ? menuItemsForLoggedUser : menuItemsForNotLoggedUser;
    return (
      <ul id="menu">
        {userMenu.map((item, index) => (
          <a href="#" key={index}>
            <li>{item}</li>
          </a>
        ))}
      </ul>
    );
  };

const menu = () => {
    return (
        <div id="menuToggle" className="item1 grid-item">
          <input type="checkbox" />
          {
            drawMenu()
          }
        </div>
    )
  }

const notLoggedUser = () => {
  return(
    <div className="grid-item log item4">
      {logIn()} 
      {signup()}
    </div>
  )
}

  return (
    <nav role="navigation">
      <div className="navigation-container">
        {/* here */}
        {menu()}
        {/* here */}
        <div className="home item3">
          <div>Partitura</div>
        </div>
        <div className="item2">
          {searchField({ searchText, placeHolder })}
          {searchButton()}
        </div>
        {isUserLoggedIn ? logOut() : notLoggedUser()}
      </div>
    </nav>
  );
}

export default Header;
