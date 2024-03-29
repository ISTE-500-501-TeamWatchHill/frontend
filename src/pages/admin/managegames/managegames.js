import React, {useState, useEffect} from 'react';
import globalStyles from '../../pages.module.css';
import styles from './managegames.module.css';
import AddPopup from '../../../components/addpopup/addpopup';
import EditPopup from '../../../components/editpopup/editpopup';
import DeletePopup from '../../../components/deletepopup/deletepopup';
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Cookies from 'universal-cookie';
import Button from '../../../components/button/button';
import { Navigate } from "react-router-dom";
import Toast from '../../../components/toast/toast';

const ManageGames = (props) => {  

    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [games, changeGames] = useState([{_id: 1, universityID: 1, homeTeam: "Team One", homeTeamInfo: [{description: "", logo: "", universityID: 1}], awayTeam: "Team Two", awayTeamInfo: [{description: "", logo: "", universityID: 1}], winningTeam: "Team One", gameFinished: true, gameTime: "12:00pm EST", locationInfo: [{name: ""}]}]);
    const [editGame, changeEditGame] = useState({_id: 1, universityID: 1, homeTeam: "Team One", homeTeamInfo: [{description: "", logo: "", universityID: 1}], awayTeam: "Team Two", awayTeamInfo: [{description: "", logo: "", universityID: 1}], winningTeam: "Team One", gameFinished: true, gameTime: "12:00pm EST", locationInfo: [{name: ""}]});
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
        async function getGames() {
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
  
            await fetch(`${BASE_URL}/gamePub/allExpanded`, requestOptions)
                .then(response => response.json())
                .then(function(result) {
                  changeGames(result);
                })
                .catch(function(error) {
                    console.log('error', error);
                    //Display the error
                    setToastTitle("Failed to Retreive Games");
                    setToastMessage("Please check to ensure the API is up and running.");
                    setToastOpen(true);
                });
        }
        getGames();
        // eslint-disable-next-line
    }, [])

    const addEdit = (editGameData) => {
        return (
          <>
            <div className={styles.icons}>
                <FaEdit 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        handleEdit(editGameData)
                    }}
                ></FaEdit>

                <FaTrash 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        handleDelete(editGameData)
                    }}
                ></FaTrash>
            </div>
          </>
        );
    };

    const handleEdit = (data) => {
        changeEditGame(data);
        setEditOpen(true);
    };

    const handleDelete = (data) => {
        changeEditGame(data);
        setDeleteOpen(true);
    };

    const columns = [
        {
          name: "Home Team",
          selector: (row) => row.homeTeamInfo[0].description,
          sortable: true
        },
        {
            name: "Away Team",
            selector: (row) => row.awayTeamInfo[0].description,
            sortable: true
        },
        {
            name: "Winning Team",
            selector: (row) => (row.winningTeam === null)? row.winningTeam : (row.winningTeam === row.homeTeam)? row.homeTeamInfo[0].description : row.awayTeamInfo[0].description, 
            sortable: true
        },
        {
            name: "Time",
            selector: (row) => row.gameTime,
            sortable: true
        },
        {
            name: "Location",
            selector: (row) => row.universityID,
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
                <h1 className={globalStyles.h1_title_manageView}>Manage Games</h1>
            </div>
            
            <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
                <AddPopup 
                    show={addOpen} 
                    type="game" 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        setAddOpen(false); 
                    }} 
                    changeFailed={(e) => { 
                        setToastTitle("Failed to Add Game");
                        setToastMessage("Please check to ensure the API is up and running and the information entered in the form is valid.");
                        setToastOpen(true);
                        setAddOpen(false); 
                    }} 
                />
                <EditPopup 
                    show={editOpen} 
                    type="game" data={editGame} 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        setEditOpen(false); 
                    }} 
                    changeFailed={(e) => { 
                        setToastTitle("Failed to Edit Game");
                        setToastMessage("Please check to ensure the API is up and running and the information entered in the form is valid.");
                        setToastOpen(true);
                        setEditOpen(false); 
                    }} 
                />
                <DeletePopup 
                    show={deleteOpen} 
                    type="game" 
                    data={editGame} 
                    onClick={(e) => { 
                        e.preventDefault(); 
                        setDeleteOpen(false); 
                    }} 
                    changeFailed={(e) => { 
                        setToastTitle("Failed to Delete Game");
                        setToastMessage("Please check to ensure the API is up and running and the information entered in the form is valid.");
                        setToastOpen(true);
                        setDeleteOpen(false); 
                    }} 
                />

                <div className={styles.addButton}>
                    <div></div>
                    <Button 
                        name="Add Game"
                        onClick={(e) => { 
                            e.preventDefault(); 
                            setAddOpen(true);
                        }}
                    />
                </div>

                <DataTable
                    columns={columns}
                    data={games}
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
  
export default ManageGames;