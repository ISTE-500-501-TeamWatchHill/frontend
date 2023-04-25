import React, {useState, useEffect} from 'react';
import globalStyles from '../../../pages.module.css';
import styles from './manageteams.module.css';
import AddPopup from '../../../../components/addpopup/addpopup';
import EditPopup from '../../../../components/editpopup/editpopup';
import DeletePopup from '../../../../components/deletepopup/deletepopup';
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Cookies from 'universal-cookie';
import Button from '../../../../components/button/button';
import { Navigate } from "react-router-dom";
// import { use } from 'i18next';
import Toast from '../../../../components/toast/toast';

const ManageTeams = (props) => {  

    //To keep the open status of the add, edit and delete popups
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    //To keep the status of the teams and currently selected team
    const [teams, changeTeams] = useState([{ _id: 1, approvalStatus: true, description: "Team One", logo: "", players: [], universityInfo: [{approvalStatus: true, description: "", domain: "", logo: "", name: "", universityID: 'None'}] }]);
    const [editTeam, changeEditTeam] = useState({ _id: 1, description: "Team One", universityID: 'None', universityName: "RIT", players: [], universityInfo: [{approvalStatus: true, description: "", domain: "", logo: "", name: "", universityID: 'None'}] });
    //To keep the status of when messages need to be shown
    const [toastOpen, setToastOpen] = useState(false);
    const [toastTitle, setToastTitle] = useState("");
    const [toastMessage, setToastMessage] = useState("");

    // Needed for all API calls
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');
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
                    //Attempt to retreive teams and their university information
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

    const addEdit = (editTeamData) => {
        return (
          <>
            <div className={styles.icons}>
                {/* Edit button */}
                <FaEdit 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        handleEdit(editTeamData)
                    }}
                ></FaEdit>

                {/* Trash button */}
                <FaTrash 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        handleDelete(editTeamData)
                    }}
                ></FaTrash>
            </div>
          </>
        );
    };

    const handleEdit = (data) => {
        //Update the team being edited
        changeEditTeam(data);
        //Open the edit popup for teams
        setEditOpen(true);
    };

    const handleDelete = (data) => {
        //Update the team being edited
        changeEditTeam(data);
        //Open the delete popup for teams
        setDeleteOpen(true);
    };

    const approvalButton = (editTeamData) => {
        return (
            //Approval button
          <>
            <button disabled className={editTeamData.approvalStatus ? `${styles.greenButton}` : `${styles.redButton}`}>
                {editTeamData.approvalStatus ? "Approved" : "Pending"}
            </button>
          </>
        );
    };

    const columns = [
        //Columns that will be in the management table
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
          name: "Number of Players",
          selector: (row) => row.players.length,
        },
        {
          name: "University Name",
          selector: (row) => row.universityInfo[0].name,
          sortable: true
        },
        {
            name: "Approval Status",
            selector: (row) => approvalButton(row),
            sortable: true
        },
        //Will contain edit and delete buttons
        {
            name: "",
            cell: (row) => addEdit(row)
        }
    ];

    return (
        <>
            {!user && (
                <Navigate to="/login" replace={true} />
            )}

            {user && user.role !== 14139 && (
                <Navigate to="/" replace={true} />
            )}

            {/* Disables rest of page from being clicked when a popup is open */}
            {
                (addOpen || editOpen || deleteOpen) &&
                <div className={globalStyles.disable}></div>
            }
            
            <div className={`${globalStyles.h1_title_section_manageView} ${styles.background}`}>
                <h1 className={globalStyles.h1_title_manageView}>Manage Teams</h1>
            </div>
            
            <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
                {/* Add popup */}
                <AddPopup 
                    show={addOpen} 
                    type="team" 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        //Close the popup
                        setAddOpen(false); 
                    }} 
                    //Set toast title and message
                    //Close the popup and open the toast message
                    changeFailed={(e) => { 
                        setToastTitle("Failed to Add Team");
                        setToastMessage("Please check to ensure the API is up and running and the information entered in the form is valid.");
                        setToastOpen(true);
                        setAddOpen(false); 
                    }} 
                />
                <EditPopup 
                    show={editOpen} 
                    type="team" 
                    data={editTeam} 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        //Close the popup
                        setEditOpen(false); 
                    }} 
                    //Set toast title and message
                    //Close the popup and open the toast message
                    changeFailed={(e) => { 
                        setToastTitle("Failed to Edit Team");
                        setToastMessage("Please check to ensure the API is up and running and the information entered in the form is valid.");
                        setToastOpen(true);
                        setEditOpen(false); 
                    }} 
                />
                <DeletePopup 
                    show={deleteOpen} 
                    type="team" 
                    data={editTeam} 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        //Close the popup
                        setDeleteOpen(false); 
                    }} 
                    //Set toast title and message
                    //Close the popup and open the toast message
                    changeFailed={(e) => { 
                        setToastTitle("Failed to Delete Team");
                        setToastMessage("Please check to ensure the API is up and running and the information entered in the form is valid.");
                        setToastOpen(true);
                        setDeleteOpen(false); 
                    }} 
                />

                {/* Add team button above the management table */}
                <div className={styles.addButton}>
                    <div></div>
                    <Button 
                        name="Add Team"
                        onClick={(e) => { 
                            e.preventDefault(); 
                            setAddOpen(true);
                        }}
                    />
                </div>

                {/* Management table */}
                <DataTable
                    columns={columns}
                    data={teams}
                />
            </div>

            {/* Toast message to handle errors and provide feedback to users */}
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
  
export default ManageTeams;