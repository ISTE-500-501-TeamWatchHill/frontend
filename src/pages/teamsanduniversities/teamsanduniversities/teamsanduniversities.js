import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import globalStyles from '../../pages.module.css';
import styles from './teamsanduniversities.module.css';

import Header from '../../../components/header/header';
import SearchBar from '../../../components/searchbar/searchbar';
import TeamBlock from '../../../components/teamblock/teamblock';
import Cookies from 'universal-cookie';
import { use } from 'i18next';

const TeamsAndUniversities = () => {   

    //Setup for hook for search term from search bar
    const [searchValue, changeSearchValue] = useState("");
    const [sortOption, changeSortOption] = useState(null);
    const [teams, changeTeams] = useState([{ teamID: 1, description: "Naur One", universityID: 1, universityName: "RIT", players: [] }]);
    const [universities, changeUniversities] = useState([{"universityID": 2429, "name": "Monroe Community College"}]);
    const [token, changeToken] = useState("");

    // Needed for all API calls
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    useEffect(()=> {
        async function getUniversities() {
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            await fetch(`${BASE_URL}/universities/all`, requestOptions)
                .then(response => response.json())
                .then(function(result) {
                    changeUniversities(result);
                })
                .catch(function(error) {
                    console.log('error', error);
                });
        }
        getUniversities();
    },[token])

    useEffect(() =>{
        async function getTeams () {
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            await fetch(`${BASE_URL}/teams/all`, requestOptions)
                .then(response => response.json())
                .then(function(result) {
                    result.map((team) => {
                        team.universityName = universities.filter(university => {
                            return university.universityID === team.universityID
                        })[0].name;
                    });
                    changeTeams(result);
                })
                .catch(function(error) {
                    //console.log('error', error);
                }); 
        }
        getTeams();
    }, [universities] )  

    if (sortOption !== null) {
        teams.sort(function (a, b) {            
            if ((sortOption.value !== "none") ? (sortOption.value === "team") ? a.description < b.description : a.universityName < b.universityName : a.teamID < b.teamID) {
                return -1;
            }
            if ((sortOption.value !== "none") ? (sortOption.value === "team") ? a.description > b.description : a.universityName > b.universityName : a.teamID > b.teamID) {
                return 1;
            }
            return 0;
        });
    }

    return (
        <>
          <div className={globalStyles.background}>
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
                            if (searchValue.length === 0 || team.description.toLowerCase().includes(searchValue.toLowerCase()) || team.universityName.toLowerCase().includes(searchValue.toLowerCase())) {
                                return (
                                    // TODO: change key to use unique identifier
                                    <TeamBlock key={team.description} team={team} />
                                )
                            }
                        })
                       
                    }
                </div>
            </div>
          </div>
        </>
    )
};
  
export default TeamsAndUniversities;