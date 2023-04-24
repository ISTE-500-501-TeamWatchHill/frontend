import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import globalStyles from '../../pages.module.css';
import styles from './teamsanduniversities.module.css';
import SearchBar from '../../../components/searchbar/searchbar';
import TeamBlock from '../../../components/teamblock/teamblock';
// import { use } from 'i18next';
import Toast from '../../../components/toast/toast';

const TeamsAndUniversities = (props) => {  

    //Setup for hook for search term from search bar
    const [searchValue, changeSearchValue] = useState("");
    const [sortOption, changeSortOption] = useState(null);
    const [teams, changeTeams] = useState([{ _id: 1, approvalStatus: true, description: "Team One", logo: "", players: [], universityInfo: [{approvalStatus: true, description: "", domain: "", logo: "", name: "", universityID: 1}] }]);
    //To keep the status of when messages need to be shown
    const [toastOpen, setToastOpen] = useState(false);
    const [toastTitle, setToastTitle] = useState("");
    const [toastMessage, setToastMessage] = useState("");

    // Needed for all API calls
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    // eslint-disable-next-line
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    useEffect(()=> {
        async function getTeams() {
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
  
            await fetch(`${BASE_URL}/teamPub/allExpanded`, requestOptions)
                .then(response => response.json())
                .then(function(result) {
                  changeTeams(result);
                })
                .catch(function(error) {
                    console.log('error', error);
                    //Display the error
                    setToastTitle("Failed to Retreive Teams");
                    setToastMessage("Please check to ensure the API is up and running.");
                    setToastOpen(true);
                });
        }
        getTeams();
        // eslint-disable-next-line
    }, [])


    if (sortOption !== null) {
        teams.sort(function (a, b) {            
            if ((sortOption.value !== "none") ? (sortOption.value === "team") ? a.description < b.description : a.universityInfo[0].name < b.universityInfo[0].name : a._id < b._id) {
                return -1;
            }
            if ((sortOption.value !== "none") ? (sortOption.value === "team") ? a.description > b.description : a.universityInfo[0].name > b.universityInfo[0].name : a._id > b._id) {
                return 1;
            }
            return 0;
        });
    }

    return (
        <>
            <div className={`${globalStyles.h1_title_section} ${styles.background}`}>
                <h1 className={globalStyles.h1_title}>Teams & Universities</h1>
            </div>
            
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
                            if (searchValue.length === 0 || team.description.toLowerCase().includes(searchValue.toLowerCase()) || team.universityInfo[0].name.toLowerCase().includes(searchValue.toLowerCase())) {
                                return (
                                    // TODO: change key to use unique identifier
                                    <TeamBlock key={team._id} team={team} />
                                )
                            }
                        })
                    
                    }
                </div>
            </div>

            {
                toastOpen &&
                <Toast 
                    title={toastTitle}
                    message={toastMessage}
                    onclick={() => setToastOpen(false)}
                />
            }
        </>
    )
};
  
export default TeamsAndUniversities;