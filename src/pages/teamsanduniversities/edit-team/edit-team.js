import React, {useState, useEffect} from 'react';
import styles from './edit-team.module.css';
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import landscapeImage from '../../../assets/images/loginsidepanel.png';
import Button from '../../../components/button/button';
import Spacer from '../../../components/spacer/spacer';

const EditTeam = () => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');
    const navigate = useNavigate();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const [team, setTeam] = useState({
        "_id": "Default ID",
        "universityID": 0,
        "players": [],
        "description": "No Team",
        "approvalStatus": false,
    });
    const [members, setMembers] = useState([]);

    async function onSubmitTeam(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const playerOne = e.target.player1.value;
        const playerTwo = e.target.player2.value;
        const playerThree = e.target.player3.value;
        const playerFour = e.target.player4.value;
        const playerFive = e.target.player5.value;

        let emails = [playerOne];

        if (playerTwo) { emails.push(playerTwo) }
        if (playerThree) { emails.push(playerThree) }
        if (playerFour) { emails.push(playerFour) }
        if (playerFive) { emails.push(playerFive) }

        const raw = {
            "token": user.token,
            "id": team._id,
            "updatedData": {
                "universityID": team.universityID,
                "emails": emails,
                "description": e.target.teamName.value,
                "approvalStatus": team.approvalStatus,
            }
        };

        console.log(raw);

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(raw),
            redirect: 'follow'
        };

        await fetch(`${BASE_URL}/teamSec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    navigate("/user");
                    navigate(0);
                }
            })
            .catch(function(error) {
                console.log('error', error);
                // changeHasError(true);
            }); 
    }

    useEffect(()=> {
        const fetchMember = async (userID) => {
            const raw = JSON.stringify({
              "id": userID
            });
        
            const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
            };
        
            await fetch(`${BASE_URL}/userPub/byID`, requestOptions)
              .then(response => response.json())
              .then(function(result) { 
                setMembers(current => [...current, result]);
              })
              .catch(function(error) {
                console.log('error', error);
                //Display the error
                // setToastTitle("Failed to Retreive Team");
                // setToastMessage("Please check to ensure the API is up and running.");
                // setToastOpen(true);
              });
          }
        const fetchTeam = async (teamID) => {
            const raw = JSON.stringify({
              "id": user.teamID,
            });
    
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
            };
    
            await fetch(`${BASE_URL}/teamPub/byID`, requestOptions) 
                .then(response => response.json())
                .then(function(result) {
                    setTeam(result); 
                    console.log(result);
                    result.players.map(player => {
                        return fetchMember(player);
                    });
                })
                .catch(function(error) {
                    console.log('error', error);
                });
        }

        fetchTeam();
    }, []);

    function renderRestOfRows()  {
        const rows = []
        for(let index=members.length; index<5; index++) {
            rows.push(
                <>
                    <input 
                        key={index}
                        className={styles.inputText} 
                        type="email"
                        id={`player${index+1}`} 
                        name={`player${index+1}`} 
                        placeholder={`Player ${index+1}'s email`} 
                    /> 
                </>
            );
        }
        return rows;
    }

    return (
        <>
            {!user && (
                <Navigate to="/login" replace={true} />
            )}
            
            
            <Spacer height="80px"/>
            <div className={styles.login_section}>
                <form className={styles.form} onSubmit={onSubmitTeam}>
                    <h1 className={styles.title}>Edit {team.description}</h1>
                    <input 
                        className={styles.inputText} 
                        type="text" 
                        id="teamName" 
                        name="teamName" 
                        placeholder='Team Name' 
                        // defaultValue={`${team.description}`} 
                        required
                    />
                    {
                        members.length >0 &&
                        members.map((member, index) => {
                            return ( 
                                <input 
                                    key={index}
                                    className={styles.inputText} 
                                    type="email"
                                    id={`player${index+1}`} 
                                    name={`player${index+1}`} 
                                    placeholder={`Player ${index+1}'s email`} 
                                    defaultValue={member.email}
                                /> 
                            )
                        })
                        // fix defaultValue of team.description issue
                        // error messages on bad input
                    }
                    { renderRestOfRows() }
                    <Button type='submit' name='Edit Team' width='100%' />
                </form>
                
                <img src={landscapeImage} alt="Landscape" />
            </div>
        </>
    );
}

export default EditTeam;