import React, {useState, useEffect} from 'react';
import globalStyles from '../../../pages.module.css';
import styles from './manageteams.module.css';
import Cookies from 'universal-cookie';
import Button from '../../../../components/button/button';
import Popup from '../../../../components/popup/popup';
import DataTable from "react-data-table-component";
// import { use } from 'i18next';

const ManageTeams = (props) => {  
    const cookies = new Cookies();
    const user = cookies.get('user');

    //Setup for hook for search term from search bar
    const [searchValue, changeSearchValue] = useState("");
    const [sortOption, changeSortOption] = useState(null);
    const [open, setOpen] = useState(false);
    const [teams, changeTeams] = useState([{ _id: 1, approvalStatus: true, description: "Team One", logo: "", players: [], universityInfo: [{approvalStatus: true, description: "", domain: "", logo: "", name: "", universityID: 1}] }]);
    const [editTeam, changeEditTeam] = useState({ _id: 1, description: "Team One", universityID: 1, universityName: "RIT", players: [] });

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
    }, [])

    const addEdit = (editTeamData) => {
        return (
          <>
            <Button 
                name="Edit"
                onClick={(e) => { 
                    e.preventDefault(); 
                    handleEdit(editTeamData)
                }}>
            </Button>
          </>
        );
    };

    const handleEdit = (data) => {
        changeEditTeam(data);
        setOpen(true);
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
            name: "",
            cell: (row) => addEdit(row)
        }
    ];

    return (
        <>
            {/* Disables rest of page from being clicked when a popup is open */}
            {
                open &&
                <div className={globalStyles.disable}></div>
            }
            
            <div className={`${globalStyles.h1_title_section_manageView} ${styles.background}`}>
                <h1 className={globalStyles.h1_title_manageView}>Manage Teams & Universities</h1>
            </div>
            
            <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
                <Popup show={open} data={editTeam} onClick={(e) => { e.preventDefault(); setOpen(false); }} />

                <DataTable
                    columns={columns}
                    data={teams}
                />
            </div>
        </>
    )
};
  
export default ManageTeams;