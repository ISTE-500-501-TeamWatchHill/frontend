import React, {useState, useEffect} from 'react';
import globalStyles from '../../../pages.module.css';
import styles from './manageuniversities.module.css';
import AddPopup from '../../../../components/addpopup/addpopup';
import EditPopup from '../../../../components/editpopup/editpopup';
import DeletePopup from '../../../../components/deletepopup/deletepopup';
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Button from '../../../../components/button/button';
import Cookies from 'universal-cookie';
import { Navigate } from "react-router-dom";
import Toast from '../../../../components/toast/toast';
// import { use } from 'i18next';

const ManageUniversities = (props) => {  

    //To keep the open status of the add, edit and delete popups
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    //To keep the status of the universities and currently selected university
    const [universities, changeUniversities] = useState([{ universityID: 1, domain: "", moderatorIDs: [""], name: "", logo: "", description: "", approvalStatus: true }]);
    const [editUniversity, changeEditUniversity] = useState({ universityID: 1, domain: "", moderatorIDs: [""], name: "", logo: "", description: "", approvalStatus: true });
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
        async function getUniversities() {
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
  
            await fetch(`${BASE_URL}/universityPub/all`, requestOptions)
                .then(response => response.json())
                .then(function(result) {
                    //Attempt to retreive universities and associated teams information
                    changeUniversities(result);
                })
                .catch(function(error) {
                    console.log('error', error);
                    //Display the error
                    setToastTitle("Failed to Retreive Universities");
                    setToastMessage("Please check to ensure the API is up and running.");
                    setToastOpen(true);
                });
        }
        getUniversities();
        // eslint-disable-next-line
    }, [])

    const addEdit = (editUniversityData) => {
        return (
          <>
            <div className={styles.icons}>
                {/* Edit button */}
                <FaEdit 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        handleEdit(editUniversityData)
                    }}
                ></FaEdit>

                {/* Trash button */}
                <FaTrash 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        handleDelete(editUniversityData)
                    }}
                ></FaTrash>
            </div>
          </>
        );
    };

    const handleEdit = (data) => {
        //Update the university being edited
        changeEditUniversity(data);
        //Open the edit popup for universities
        setEditOpen(true);
    };

    const handleDelete = (data) => {
        //Update the university being edited
        changeEditUniversity(data);
        //Open the delete popup for universities
        setDeleteOpen(true);
    };

    const columns = [
        //Columns that will be in the management table
        {
          name: "ID",
          selector: (row) => row.universityID,
          sortable: true
        },
        {
          name: "Name",
          selector: (row) => row.name,
          sortable: true
        },
        {
          name: "Domain",
          selector: (row) => row.domain,
          sortable: true
        },
        {
            name: "Description",
            selector: (row) => row.description
        },
        {
            name: "Approval Status",
            selector: (row) => row.approvalStatus,
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
                <h1 className={globalStyles.h1_title_manageView}>Manage Universities</h1>
            </div>
            
            <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
                {/* Add popup */}
                <AddPopup 
                    show={addOpen} 
                    type="university" 
                    onClick={(e) => { 
                        e.preventDefault();
                        //Close the popup 
                        setAddOpen(false); 
                    }} 
                    //Set toast title and message
                    //Close the popup and open the toast message
                    changeFailed={(e) => { 
                        setToastTitle("Failed to Add University");
                        setToastMessage("Please check to ensure the API is up and running and the information entered in the form is valid.");
                        setToastOpen(true);
                        setAddOpen(false); 
                    }}
                />

                {/* Edit popup */}
                <EditPopup 
                    show={editOpen} 
                    type="university" 
                    data={editUniversity} 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        //Close the popup 
                        setEditOpen(false); 
                    }} 
                    //Set toast title and message
                    //Close the popup and open the toast message
                    changeFailed={(e) => { 
                        setToastTitle("Failed to Edit University");
                        setToastMessage("Please check to ensure the API is up and running and the information entered in the form is valid.");
                        setToastOpen(true);
                        setAddOpen(false); 
                    }}
                />

                {/* Delete popup */}
                <DeletePopup 
                    show={deleteOpen} 
                    type="university" 
                    data={editUniversity} 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        //Close the popup 
                        setDeleteOpen(false); 
                    }} 
                    //Set toast title and message
                    //Close the popup and open the toast message
                    changeFailed={(e) => { 
                        setToastTitle("Failed to Delete University");
                        setToastMessage("Please check to ensure the API is up and running and the information entered in the form is valid.");
                        setToastOpen(true);
                        setAddOpen(false); 
                    }}
                />

                {/* Add university button above the management table */}
                <div className={styles.addButton}>
                    <div></div>
                    <Button 
                        name="Add University"
                        onClick={(e) => { 
                            e.preventDefault(); 
                            setAddOpen(true);
                        }}
                    />
                </div>

                {/* Management table */}
                <DataTable
                    columns={columns}
                    data={universities}
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
  
export default ManageUniversities;