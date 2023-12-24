import React, {useState, useEffect } from 'react';
import './HomePage.css'

import RandomContent from '../../components/RandomContent/RandomContent'
import Instruments from '../../components/Instruments/Instruments';

import axios from 'axios';

import FilterBar from '../../components/FilterBar/FilterBar';

function HomePage(props) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [instrument, setInstrument] = useState('guitar');
  const [filterBy, setFilterBy] = useState(false);
  const [contentItems, setContentItems] = useState(null);
  const [contentItemsBackUp, setContentItemsBackUp] = useState(null);
  const [authorNames, setAuthorNames] = useState(null);
  const [genres, setGenres] = useState(null);

  useEffect(() => {
      axios.get('/isLogIn').then(res=>{
        setIsUserLoggedIn(res.data);
      })
  }, []);

  useEffect(() => {
    axios.get('/songs').then(res=>{
      setContentItems(res.data)
      setContentItemsBackUp(res.data);
      let authors = res.data.map((item)=>{
        return item.authorName
      })
      let genres = res.data.map((item)=>{
        return item.genre
      })
      
      setAuthorNames(removeDuplicates(authors));
      setGenres(removeDuplicates(genres));
      
    })
  }, []);

  const removeDuplicates = (arr) => {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

  const handleInstrument = (event) => {
    setInstrument(event);
  }

  const handleFilter = (value, key) => {
    setFilterBy(!filterBy)
    let filteredArray;
   
    if(value === 'date' && filterBy){
      console.log('!!!!!!!!!!!!!!!')
      filteredArray = contentItems.sort(function(a, b) {
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      });
    }else{
      filteredArray = contentItems.filter(function(obj) {
        return obj[key] === value;
      });
    }
    
    console.log(contentItemsBackUp)
    console.log(filterBy)
    filterBy ? setContentItems(filteredArray) : setContentItems(contentItemsBackUp)
    
  }

  const handleSearch = (searchText) => {
    axios.post('/songs/search', { title: searchText }).then((res)=>{
      setContentItems(res.data);
      document.getElementById('searchField').value = '';
    })
  }

  const handleReset = (str) => {
    setContentItems(contentItemsBackUp)
    document.getElementById('searchField').value = '';
  }

  return (
    <div>
      <div className="main-container">
        <Instruments chooseInstrument={handleInstrument}/>

        <FilterBar 
          onReset={handleReset}
          onFilterChange={handleFilter}
          onSearchChange={handleSearch}
          authorNames={authorNames} 
          genres={genres}
        />

        <div className="randomSongs-container">
          <RandomContent 
            contentItems={contentItems}
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
