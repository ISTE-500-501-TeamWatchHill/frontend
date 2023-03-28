import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import globalStyles from '../../pages.module.css';
import styles from './teamsanduniversities.module.css';
import Cookies from 'universal-cookie';
import SearchBar from '../../../components/searchbar/searchbar';
import TeamBlock from '../../../components/teamblock/teamblock';
// import { use } from 'i18next';

const TeamsAndUniversities = (props) => {  
    const cookies = new Cookies();
    const user = cookies.get('user');

    //Setup for hook for search term from search bar
    const [searchValue, changeSearchValue] = useState("");
    const [sortOption, changeSortOption] = useState(null);
    const [teams, changeTeams] = useState([{ _id: 1, description: "Team One", universityID: 1, universityName: "RIT", players: [] }]);
    const [universities, changeUniversities] = useState([{"universityID": 2429, "name": "Monroe Community College"}]);

    // Needed for all API calls
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    // eslint-disable-next-line
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    useEffect(()=> {
        async function getUniversities() {
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            await fetch(`${BASE_URL}/universityPub/all`, requestOptions)
                .then(response => response.json())
                .then(function(result) {
                    changeUniversities(result);
                })
                .catch(function(error) {
                    console.log('error', error);
                });
        }
        getUniversities();
    })

    useEffect(() =>{
        async function getTeams () {
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            await fetch(`${BASE_URL}/teamPub/all`, requestOptions)
                .then(response => response.json())
                .then(function(result) {
                    // eslint-disable-next-line
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
    }, [universities, BASE_URL, myHeaders] )  

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
            {/* I'm a visitor or a logged in user who is not an admin */}
            {
            (!user || (user && user.role!=14139)) && 
            <div className={`${globalStyles.h1_title_section} ${styles.background}`}>
                <h1 className={globalStyles.h1_title}>Teams & Universities</h1>
            </div>
            }

            {/* I'm an admin */}
            {
            (user && user.role==14139) && 
            <div className={`${globalStyles.h1_title_section_manageView} ${styles.background}`}>
                <h1 className={globalStyles.h1_title_manageView}>Manage Teams & Universities</h1>
            </div>
            }
            

            

            <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
                 <div className={styles.flex}>
                    <div className={styles.left}>
                        <h3 className={globalStyles.headline_text}>All Teams</h3>
                        <p className={globalStyles.green_bar}>____</p>
                    </div>

                    <div className={styles.right}>
                        {/* View and Search Functionality */}
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
                </div> 

                <div className={styles.grid}>
                    {/* Results */}
                    {
                        // eslint-disable-next-line
                        teams.map((team) => {
                            if (searchValue.length === 0 || team.description.toLowerCase().includes(searchValue.toLowerCase()) || team.universityName.toLowerCase().includes(searchValue.toLowerCase())) {
                                return (
                                    // TODO: change key to use unique identifier
                                    <TeamBlock key={team._id} team={team} />
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