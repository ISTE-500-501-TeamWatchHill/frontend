import React, {useState, useEffect} from 'react';
import globalStyles from '../../pages.module.css';
import styles from './manageusers.module.css';
import Cookies from 'universal-cookie';
import AddPopup from '../../../components/addpopup/addpopup';
import EditPopup from '../../../components/editpopup/editpopup';
import DeletePopup from '../../../components/deletepopup/deletepopup';
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Button from '../../../components/button/button';
import { Navigate } from "react-router-dom";
// import { use } from 'i18next';

const ManageUniversities = (props) => {  
    const cookies = new Cookies();
    const user = cookies.get('user');

    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [users, changeUsers] = useState([{roleID: 19202, universityID: 1357, firstName: "Jane", lastName: "Doe", email: "janedoe@rit.edu", teamInfo: [{players: [], description: ""}]}]);
    const [editUser, changeEditUser] = useState({roleID: 19202, universityID: 1357, firstName: "Jane", lastName: "Doe", email: "janedoe@rit.edu", teamInfo: [{players: [], description: ""}]});

    // Needed for all API calls
    const BASE_URL = process.env.REACT_APP_BASE_URL;
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
                  changeUsers(result);
                })
                .catch(function(error) {
                    console.log('error', error);
                });
        }
        getUsers();
        // eslint-disable-next-line
    }, [])

    const addEdit = (editUserData) => {
        return (
          <>
            <div className={styles.icons}>
                <FaEdit 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        handleEdit(editUserData)
                    }}
                ></FaEdit>

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
        changeEditUser(data);
        setEditOpen(true);
    };

    const handleDelete = (data) => {
        changeEditUser(data);
        setDeleteOpen(true);
    };

    const columns = [
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
                <AddPopup show={addOpen} type="user" onClick={(e) => { e.preventDefault(); setAddOpen(false); }} />
                <EditPopup show={editOpen} type="user" data={editUser} onClick={(e) => { e.preventDefault(); setEditOpen(false); }} />
                <DeletePopup show={deleteOpen} type="user" data={editUser} onClick={(e) => { e.preventDefault(); setDeleteOpen(false); }} />

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

                <DataTable
                    columns={columns}
                    data={users}
                />
            </div>
        </>
    )
};
  
export default ManageUniversities;