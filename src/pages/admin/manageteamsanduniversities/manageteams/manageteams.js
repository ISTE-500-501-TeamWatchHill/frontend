import React, {useState, useEffect} from 'react';
import globalStyles from '../../../pages.module.css';
import styles from './manageteams.module.css';
import AddPopup from '../../../../components/addpopup/addpopup';
import EditPopup from '../../../../components/editpopup/editpopup';
import DeletePopup from '../../../../components/deletepopup/deletepopup';
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Button from '../../../../components/button/button';
import { Navigate } from "react-router-dom";
// import { use } from 'i18next';

const ManageTeams = (props) => {  

    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [teams, changeTeams] = useState([{ _id: 1, approvalStatus: true, description: "Team One", logo: "", players: [], universityInfo: [{approvalStatus: true, description: "", domain: "", logo: "", name: "", universityID: 1}] }]);
    const [editTeam, changeEditTeam] = useState({ _id: 1, description: "Team One", universityID: 1, universityName: "RIT", players: [], universityInfo: [{approvalStatus: true, description: "", domain: "", logo: "", name: "", universityID: 1}] });

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
        // eslint-disable-next-line
    }, [])

    const addEdit = (editTeamData) => {
        return (
          <>
            <div className={styles.icons}>
                <FaEdit 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        handleEdit(editTeamData)
                    }}
                ></FaEdit>

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
        changeEditTeam(data);
        setEditOpen(true);
    };

    const handleDelete = (data) => {
        changeEditTeam(data);
        setDeleteOpen(true);
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
                <AddPopup show={addOpen} type="team" onClick={(e) => { e.preventDefault(); setAddOpen(false); }} />
                <EditPopup show={editOpen} type="team" data={editTeam} onClick={(e) => { e.preventDefault(); setEditOpen(false); }} />
                <DeletePopup show={deleteOpen} type="team" data={editTeam} onClick={(e) => { e.preventDefault(); setDeleteOpen(false); }} />

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

                <DataTable
                    columns={columns}
                    data={teams}
                />
            </div>
        </>
    )
};
  
export default ManageTeams;