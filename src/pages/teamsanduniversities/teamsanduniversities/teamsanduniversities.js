import React, {useState} from 'react'
import Button from '../../../components/button/button';
import SearchBar from '../../../components/searchbar/searchbar';
import TeamBlock from '../../../components/teamblock/teamblock';
import './teamsanduniversities.css';

//Hard coded for now- will grab from database
const teams = [ 
  { name: "Team One", universityname: "Rochester Istitute of Technology", numplayers: 4 },
  { name: "Team Two", universityname: "Univerity of Buffalo", numplayers: 4 },
  { name: "Team Three", universityname: "Far Far Away", numplayers: 5 },
  { name: "Team Four", universityname: "Winterfell", numplayers: 4 },
  { name: "Team Five", universityname: "Gatlin College of Civil War Studies", numplayers: 3 },
  { name: "Team Six", universityname: "Europe", numplayers: 5 },
  { name: "Team Seven", universityname: "Garden Life University", numplayers: 4 },
  { name: "Team Eight", universityname: "Law School USA", numplayers: 5 },
  { name: "Team Nine", universityname: "None", numplayers: 4 },
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

            <div class="grid">
                {/* Results */}
                {teams.map((team) => {
                    if (searchValue.length == 0 || team.name.toLowerCase().includes(searchValue.toLowerCase()) || team.universityname.toLowerCase().includes(searchValue.toLowerCase())) {
                        return (
                            <TeamBlock
                                team = {team}
                            />
                        )
                    }
                })}
            </div>
          </>
    )
};
  
export default TeamsAndUniversities;