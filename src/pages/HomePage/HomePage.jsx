import React, {useState, useEffect } from 'react';
import './HomePage.css'

import RandomContent from '../../components/RandomContent/RandomContent'
import Instruments from '../../components/Instruments/Instruments';

import axios from 'axios';

import FilterBar from '../../components/FilterBar/FilterBar';

function HomePage(props) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [instrument, setInstrument] = useState('guitar');

  useEffect(() => {
    // Update the document title using the browser API
      axios.get('/isLogIn').then(res=>{
        setIsUserLoggedIn(res.data);
      })
  }, []);

  const handleInstrument = (event) => {
    // alert(event)
    setInstrument(event);
  }

  return (
    <div>
      <div className="main-container">
        <Instruments chooseInstrument={handleInstrument}/>

        <FilterBar filters={['Author','Genre','Date']} onFilterChange={alert}/>

        <div className="randomSongs-container">
          <RandomContent 
          instrument={instrument}
          history={props.history} 
          isLogin={isUserLoggedIn}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
