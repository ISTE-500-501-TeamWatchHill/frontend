import React, {useState} from 'react'
import Button from '../../components/button/button';
import SearchBar from '../../components/searchbar/searchbar'
import './teamsanduniversities.css';

//Hard coded for now- will grab from database
const teams = [ 
  { name: "Team One", info: "Team one info" },
  { name: "Team Two", info: "Team two info" },
  { name: "Team Three", info: "Team three info" },
];

const TeamsAndUniversities = () => {   
    //Setup for hook for search term from search bar
    const [searchValue, changeSearchValue] = useState("");

    return (
          <>
            {/* Title */}
            <h1> Teams </h1>

            {/* View and Search Functionality */}
            <div class="flex">
                {/* Sort Button */}
                <Button name="Sort By"/>

                {/* Search Bar */}
                <SearchBar 
                    searchTerm = {searchValue}
                    onSearchChange = {changeSearchValue}
                    teams={teams}
                />
            </div>

            {/* Results */}
            {teams.map((team) => {
                if (searchValue.length == 0 || team.name.toLowerCase().includes(searchValue.toLowerCase())) {
                    return (
                        <TeamBlock
                            team = {team}
                        />
                    )
                }
            })}
          </>
    )
};
  
export default TeamsAndUniversities;