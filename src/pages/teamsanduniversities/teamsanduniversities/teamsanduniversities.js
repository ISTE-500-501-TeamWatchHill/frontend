import React, {useState} from 'react'
import Select from 'react-select'
import globalStyles from '../../pages.module.css';
import styles from './teamsanduniversities.module.css';

import Header from '../../../components/header/header';
import SearchBar from '../../../components/searchbar/searchbar';
import TeamBlock from '../../../components/teamblock/teamblock';

//Hard coded for now- will grab from database. Assume default sort is by id
var teams = [ 
  { id: 1, name: "Team One", universityname: "Rochester Istitute of Technology", universityid: 1, numplayers: 4 },
  { id: 2, name: "Team Two", universityname: "University of Buffalo", universityid: 6, numplayers: 4 },
  { id: 3, name: "Team Three", universityname: "Far Far Away", universityid: 3, numplayers: 5 },
  { id: 4, name: "Team Four", universityname: "Winterfell", universityid: 8, numplayers: 4 },
  { id: 5, name: "Team Five", universityname: "Gatlin College of Civil War Studies", universityid: 12, numplayers: 3 },
  { id: 6, name: "Team Six", universityname: "Europe", universityid: 22, numplayers: 5 },
  { id: 7, name: "Team Seven", universityname: "Garden Life University", universityid: 9, numplayers: 4 },
  { id: 8, name: "Team Eight", universityname: "Law School USA", universityid: 2, numplayers: 5 },
  { id: 9, name: "Team Nine", universityname: "None", universityid: 63, numplayers: 4 },
];

const TeamsAndUniversities = () => {   
    //Setup for hook for search term from search bar
    const [searchValue, changeSearchValue] = useState("");
    const [sortOption, changeSortOption] = useState(null);

    if (sortOption!=null) {
        teams.sort(function (a, b) {
            console.log(sortOption)
            
            if ((sortOption.value!="none") ? (sortOption.value === "team") ? a.name < b.name : a.universityname < b.universityname : a.id < b.id) {
                return -1;
            }
            if ((sortOption.value!="none") ? (sortOption.value === "team") ? a.name > b.name : a.universityname > b.universityname : a.id > b.id) {
                return 1;
            }
            return 0;
        });
    }

    return (
          <>
            <Header 
                name="Teams & Universities"
            />

            <div className={`${globalStyles.grid_page} ${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
                {/* View and Search Functionality */}
                <div className={styles.flex}>
                    {/* Sort Button */}
                    <Select
                        //Default value is null
                        className={styles.select}
                        placeholder="Sort by..."
                        value={sortOption}
                        options={[
                            { value: 'none', label: "None" },
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

                <div className={globalStyles.grid}>
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
            </div>
          </>
    )
};
  
export default TeamsAndUniversities;