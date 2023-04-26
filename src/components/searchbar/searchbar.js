import React from 'react';
import { useTranslation } from "react-i18next";
import styles from './searchbar.module.css';

const SearchBar = (props) => {   
    const { t } = useTranslation(); 
      
    return <div>
        {/* Search Bar */}
        <input
            className={styles.searchBar}
            type="search"
            placeholder={t("search.teamsunis")}
            onChange={(e) => props.onSearchChange(e.target.value)}
            value={props.searchTerm} 
        />
    </div>
};

export default SearchBar;