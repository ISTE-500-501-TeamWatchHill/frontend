import React from 'react'
import styles from './searchbar.module.css';

const SearchBar = (props) => {    
      
    return <div>
        {/* Search Bar */}
        <input
            className={styles.searchBar}
            type="search"
            placeholder="Search teams and universites"
            onChange={(e) => props.onSearchChange(e.target.value)}
            value={props.searchTerm} 
        />
    </div>
};

export default SearchBar;