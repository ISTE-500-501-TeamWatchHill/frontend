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

    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
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
                <FaEdit 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        handleEdit(editUniversityData)
                    }}
                ></FaEdit>

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
        changeEditUniversity(data);
        setEditOpen(true);
    };

    const handleDelete = (data) => {
        changeEditUniversity(data);
        setDeleteOpen(true);
    };

    const columns = [
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
                <AddPopup 
                    show={addOpen} 
                    type="university" 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        setAddOpen(false); 
                    }} 
                    changeFailed={(e) => { 
                        setToastTitle("Failed to Add University");
                        setToastMessage("Please check to ensure the API is up and running and the information entered in the form is valid.");
                        setToastOpen(true);
                        setAddOpen(false); 
                    }}
                />
                <EditPopup 
                    show={editOpen} 
                    type="university" 
                    data={editUniversity} 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        setEditOpen(false); 
                    }} 
                    changeFailed={(e) => { 
                        setToastTitle("Failed to Edit University");
                        setToastMessage("Please check to ensure the API is up and running and the information entered in the form is valid.");
                        setToastOpen(true);
                        setAddOpen(false); 
                    }}
                />
                <DeletePopup 
                    show={deleteOpen} 
                    type="university" 
                    data={editUniversity} 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        setDeleteOpen(false); 
                    }} 
                    changeFailed={(e) => { 
                        setToastTitle("Failed to Delete University");
                        setToastMessage("Please check to ensure the API is up and running and the information entered in the form is valid.");
                        setToastOpen(true);
                        setAddOpen(false); 
                    }}
                />

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

                <DataTable
                    columns={columns}
                    data={universities}
                />
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
  
export default ManageUniversities;