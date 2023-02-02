import React, {useState} from 'react'
import './searchbar.css';

const SearchBar = (props) => {      
    return <div>
        {/* Search Bar */}
        <input
            type="search"
            placeholder="Filter teams and universites"
            onChange={(e) => props.onSearchChange(e.target.value)}
            value={props.searchTerm} 
        />
    </div>
};

export default SearchBar;