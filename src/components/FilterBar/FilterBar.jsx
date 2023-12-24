import React, { useState } from 'react';

import './FilterBar.css';

const FilterBar = ({ onFilterChange, onSearchChange, onReset, authorNames, genres }) => {
  const [authorFilter, setAuthorFilter] = useState(false);
  const [genreFilter, setGenreFilter] = useState(false);
  const [dateFilter, setDateFilter] = useState(false);
  const [search, setSearch] = useState(null);

  const submitSearch = () => {
    onSearchChange(search);
  }

  const reset = () => {
    onReset()
  }

  const trigger = (item) => {
    
    switch(item){
      case 'authorName':
        setDateFilter(false);
        setGenreFilter(false)
        setAuthorFilter(!authorFilter);
        break;
      case 'genre':
        setDateFilter(false);
        setAuthorFilter(false)
        setGenreFilter(!genreFilter);
        break;
      case 'dateAdded':
        setAuthorFilter(false);
        setGenreFilter(false);
        setDateFilter(!dateFilter);
        break;
      default:
        break;
    }
  }

  return (
    <div className='btns'>
      {/* coloring and trigger */}
      <div className="order">
        <button 
          onClick={()=>trigger('authorName')}
          id="authorName" 
          className="by"
          style={{
            backgroundColor: authorFilter ? '#8ca9f1' : null
          }} 
        > 
        author 
        </button>
        <button 
          onClick={()=>trigger('genre')}
          id="genre" 
          className="by"
          style={{
            backgroundColor: genreFilter ? '#8ca9f1' : null
          }}
        > genre 
        </button>
        <button 
          onClick={()=>trigger('dateAdded')}
          id="dateAdded" 
          className="by"
          style={{
            backgroundColor: dateFilter ? '#8ca9f1' : null
          }}
        > 
        date
        </button>
      </div> 
          
        {
          genreFilter ?  <div className='order'>
          {
            genres.map((name, idx)=>{
              return(
                <button 
                  key={idx} 
                  className='by' 
                  onClick={()=>onFilterChange(name, 'genre')}
                >
                  {name}
                </button>
              )
  
            })
          }
        </div> : null
        }
        
        {
          authorFilter ? <div className='order'>
          {
            authorNames.map((name, idx)=>{
              return(
                <button key={idx} className='by'onClick={()=>onFilterChange(name, 'authorName')}>
                  {name}
                </button>
              )
  
            })
          }
        </div> : null
        }

        {
          dateFilter ? <div className='order'>
          {
                <button className='by'onClick={()=>onFilterChange('date', 'dateAdded')}>
                  Date
                </button>
          }
        </div> : null
        }

        <li className="search">
            <form className="search-form"onSubmit={(e)=>e.preventDefault()}>
              <input 
              id="searchField" 
              type="text" 
              placeholder={'Search'} 
              onChange={(e) => setSearch(e.target.value) }
              />
              <button className='resetBtn' onClick={reset} >Reset</button>
              <input type="submit" value="Search" onClick={submitSearch}/>
            </form>
          </li>
    </div>
  );
};

export default FilterBar;



