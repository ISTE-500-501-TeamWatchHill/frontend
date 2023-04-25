import React, {useState, useEffect} from 'react';
import globalStyles from '../../pages.module.css';
import styles from './manageusers.module.css';
import AddPopup from '../../../components/addpopup/addpopup';
import EditPopup from '../../../components/editpopup/editpopup';
import DeletePopup from '../../../components/deletepopup/deletepopup';
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Button from '../../../components/button/button';
import Cookies from 'universal-cookie';
import { Navigate } from "react-router-dom";
// import { use } from 'i18next';
import Toast from '../../../components/toast/toast';

const ManageUsers = (props) => {  

    //To keep the open status of the add, edit and delete popups
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    //To keep the status of the users and currently selected user
    const [users, changeUsers] = useState([{roleID: 19202, universityID: 1357, teamID: 'None', firstName: "Jane", lastName: "Doe", email: "janedoe@rit.edu", teamInfo: [{players: [], description: ""}]}]);
    const [editUser, changeEditUser] = useState({roleID: 19202, universityID: 1357, teamID: 'None', firstName: "Jane", lastName: "Doe", email: "janedoe@rit.edu", teamInfo: [{players: [], description: ""}]});
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
        async function getUsers() {
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
  
            await fetch(`${BASE_URL}/userPub/allExpanded`, requestOptions)
                .then(response => response.json())
                .then(function(result) {
                    //Attempt to retreive users and associated teams information
                    changeUsers(result);
                })
                .catch(function(error) {
                    console.log('error', error);
                    //Display the error
                    setToastTitle("Failed to Retreive Users");
                    setToastMessage("Please check to ensure the API is up and running.");
                    setToastOpen(true);
                });
        }
        getUsers();
        // eslint-disable-next-line
    }, [])

    const addEdit = (editUserData) => {
        return (
          <>
            <div className={styles.icons}>
                {/* Edit button */}
                <FaEdit 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        handleEdit(editUserData)
                    }}
                ></FaEdit>

                {/* Trash button */}
                <FaTrash 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        handleDelete(editUserData)
                    }}
                ></FaTrash>
            </div>
          </>
        );
    };

    const handleEdit = (data) => {
        //Update the user being edited
        changeEditUser(data);
        //Open the edit popup for users
        setEditOpen(true);
    };

    const handleDelete = (data) => {
        //Update the user being edited
        changeEditUser(data);
        //Open the delete popup for users
        setDeleteOpen(true);
    };

    const columns = [
        //Columns that will be in the management table
        {
          name: "Name",
          selector: (row) => `${row.firstName} ${row.lastName}`,
          sortable: true
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true
          },
        {
          name: "Role",
          selector: (row) => row.roleID,
          sortable: true
        },
        {
            name: "University ID",
            selector: (row) => row.universityID,
            sortable: true
        },
        {
            name: "Team Name",
            selector: (row) => {
                if (row.teamInfoJoined === undefined || row.teamInfoJoined.length === 0) {
                    return "";
                } else {
                    return row.teamInfoJoined[0].description;
                }
            },
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
                <h1 className={globalStyles.h1_title_manageView}>Manage Users</h1>
            </div>
            
            <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
                {/* Add popup */}
                <AddPopup 
                    show={addOpen} 
                    type="user" 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        //Close the popup
                        setAddOpen(false); 
                    }} 
                    //Set toast title and message
                    //Close the popup and open the toast message
                    changeFailed={(e) => { 
                        setToastTitle("Failed to Add User");
                        setToastMessage("Please check to ensure the API is up and running and the information entered in the form is valid.");
                        setToastOpen(true);
                        setAddOpen(false); 
                    }}
                />

                {/* Edit popup */}
                <EditPopup 
                    show={editOpen} 
                    type="user" 
                    data={editUser} 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        //Close the popup
                        setEditOpen(false); 
                    }} 
                    //Set toast title and message
                    //Close the popup and open the toast message
                    changeFailed={(e) => { 
                        setToastTitle("Failed to Edit User");
                        setToastMessage("Please check to ensure the API is up and running and the information entered in the form is valid.");
                        setToastOpen(true);
                        setAddOpen(false); 
                    }}
                />

                {/* Delete popup */}
                <DeletePopup 
                    show={deleteOpen} 
                    type="user" 
                    data={editUser} 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        //Close the popup
                        setDeleteOpen(false); 
                    }} 
                    //Set toast title and message
                    //Close the popup and open the toast message
                    changeFailed={(e) => { 
                        setToastTitle("Failed to Delete User");
                        setToastMessage("Please check to ensure the API is up and running and the information entered in the form is valid.");
                        setToastOpen(true);
                        setAddOpen(false); 
                    }}
                />

                {/* Add user button above the management table */}
                <div className={styles.addButton}>
                    <div></div>
                    <Button 
                        name="Add User"
                        onClick={(e) => { 
                            e.preventDefault(); 
                            setAddOpen(true);
                        }}
                    />
                </div>

                {/* Management table */}
                <DataTable
                    columns={columns}
                    data={users}
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
  
export default ManageUsers;