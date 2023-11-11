import React, { useState } from 'react';

import './FilterBar.css';

const FilterBar = ({ filters, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterToggle = (filter) => {
    const newSelectedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((selectedFilter) => selectedFilter !== filter)
      : [...selectedFilters, filter];

    setSelectedFilters(newSelectedFilters);
    onFilterChange(newSelectedFilters); // Notify parent component about filter change
  };

  return (
    <div className='filter-bar'>
      <strong>Order by:</strong>
      {filters.map((filter) => (
        <button
          className='filter-button'
          key={filter}
          onClick={() => handleFilterToggle(filter)}
          style={{
            backgroundColor: selectedFilters.includes(filter) ? 'blue' : 'white',
            color: selectedFilters.includes(filter) ? 'white' : 'black',
          }}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
