import React, {useState} from 'react'
import Select from 'react-select'
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
    const [sortOption, changeSortOption] = useState(null);

if (sortOption!=null) {
    let isTeamNameSort = sortOption.value === "team";

    teams.sort(function (a, b) {
        console.log(sortOption)
        
        if ((isTeamNameSort) ? a.name < b.name : a.universityname < b.universityname) {
            return -1;
        }
        if ((isTeamNameSort) ? a.name > b.name : a.universityname > b.universityname) {
            return 1;
        }
        return 0;
    });
}


    return (
          <>
            {/* Title */}
            <h1> Teams </h1>

            {/* View and Search Functionality */}
            <div className="flex">
                {/* Sort Button */}
                <Select
                    //Default value is null
                    className="select"
                    placeholder="Sort by..."
                    value={sortOption}
                    options={[
                        { value: 'team', label: 'Team A-Z' },
                        { value: 'university', label: 'University A-Z' }
                    ]}
                    onChange={changeSortOption}
                />

                {/* Search Bar */}
                <SearchBar 
                    searchTerm = {searchValue}
                    onSearchChange = {changeSearchValue}
                    teams={teams}
                />
            </div>

            <div className="grid">
                {/* Results */}
                {
                    // eslint-disable-next-line
                    teams.map((team) => {
                        if (searchValue.length === 0 || team.name.toLowerCase().includes(searchValue.toLowerCase()) || team.universityname.toLowerCase().includes(searchValue.toLowerCase())) {
                            return (
                                // TODO: change key to use unique identifier
                                <TeamBlock key={team.name} team={team} />
                            )
                        }
                    })
                }
            </div>
          </>
    )
};
  
export default TeamsAndUniversities;