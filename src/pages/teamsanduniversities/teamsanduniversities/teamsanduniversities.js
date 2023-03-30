import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import globalStyles from '../../pages.module.css';
import styles from './teamsanduniversities.module.css';
import Cookies from 'universal-cookie';
import SearchBar from '../../../components/searchbar/searchbar';
import Button from '../../../components/button/button';
import Popup from '../../../components/popup/popup';
import TeamBlock from '../../../components/teamblock/teamblock';
import DataTable from "react-data-table-component";
// import { use } from 'i18next';

const TeamsAndUniversities = (props) => {  
    const cookies = new Cookies();
    const user = cookies.get('user');

    //Setup for hook for search term from search bar
    const [searchValue, changeSearchValue] = useState("");
    const [sortOption, changeSortOption] = useState(null);
    const [open, setOpen] = useState(true);
    const [teams, changeTeams] = useState([{ _id: 1, approvalStatus: true, description: "Team One", logo: "", players: [], universityInfo: [{approvalStatus: true, description: "", domain: "", logo: "", name: "", universityID: 1}] }]);
    const [editTeam, changeEditTeam] = useState({ _id: 1, description: "Team One", universityID: 1, universityName: "RIT", players: [] });
    const [token, changeToken] = useState("");

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
                });
        }
        getTeams();
    },[token])


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

    const addEdit = (editTeamData) => {
        return (
          <>
            <Button 
                name="Edit"
                onClick={() => handleEdit(editTeamData)}>
            </Button>
          </>
        );
    };

    const handleEdit = (data) => {
        setOpen(true);
        changeEditTeam(data);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const columns = [
        {
          name: "ID",
          selector: (row) => row._id,
          sortable: true
        },
        {
          name: "Name",
          selector: (row) => row.description,
          sortable: true
        },
        {
          name: "Players"
        },
        {
          name: "University Name",
          selector: (row) => row.universityInfo[0].name,
          sortable: true
        },
        {
            name: "Manage",
            cell: (row) => addEdit(row)
        }
    ];

    return (
        <>
            {/* I'm a visitor or a logged in user who is not an admin */}
            {
            (!user || (user && user.role!==14139)) && 
            <div className={`${globalStyles.h1_title_section} ${styles.background}`}>
                <h1 className={globalStyles.h1_title}>Teams & Universities</h1>
            </div>
            }

            {/* I'm an admin */}
            {
            (user && user.role===14139) && 
            <div className={`${globalStyles.h1_title_section_manageView} ${styles.background}`}>
                <h1 className={globalStyles.h1_title_manageView}>Manage Teams & Universities</h1>
            </div>
            }
            

            

            <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
                {/* I'm a visitor or a logged in user who is not an admin */}
                {
                    (!user || (user && user.role!==14139)) && 
                    <div>
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
                }
                 

                {/* I'm an admin */}
                {
                    (user && user.role===14139) && 
                    <div>
                        <Popup show={open} data={editTeam} onClose={handleClose} />

                        <DataTable
                            columns={columns}
                            data={teams}
                        />
                    </div>
                } 
            </div>
        </>
    )
};
  
export default TeamsAndUniversities;