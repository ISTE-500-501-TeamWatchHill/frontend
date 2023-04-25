import React, {useState, useEffect} from 'react';
import styles from './edit-team.module.css';
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import landscapeImage from '../../../assets/images/loginsidepanel.png';
import Button from '../../../components/button/button';

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
    const [member, setMembers] = useState([]);


    async function onSubmit(e) {
        // e.preventDefault();

        const playerOne = user.email;
        const playerTwo = e.target.playerTwo.value;
        const playerThree = e.target.playerThree.value;
        const playerFour = e.target.playerFour.value;
        const playerFive = e.target.playerFive.value;

        let formValues = [playerOne];

        if (playerTwo) { formValues.push(playerTwo) }
        if (playerThree) { formValues.push(playerThree) }
        if (playerFour) { formValues.push(playerFour) }
        if (playerFive) { formValues.push(playerFive) }

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "universityID": user.universityID,
            "name": e.target.teamName.value,
            "emails": formValues,
            "token": user.token,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${BASE_URL}/teamSec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result && result._id) {
                    navigate(`/team/${result._id}`);
                    navigate(0);
                }
            })
            .catch(function(error) {
                console.log('error', error);
                alert('Failed to edit team');
            }); // TODO: display error, refresh form
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

    // function renderRestOfRows()  {
    //     const rows = []
    //     for(let index=members.length; index<5; index++) {
    //         rows.push(
    //             <>
    //                 <input 
    //                     key={index}
    //                     className={styles.inputText} 
    //                     type="text"
    //                     id={`player${index+1}`}
    //                     name={`player${index+1}`} 
    //                     placeholder='Enter Email'
    //                 />
    //             </>
    //         );
    //     }
    //     return rows;
    // }

    return (
        <>
            {!user && (
                <Navigate to="/login" replace={true} />
            )}
            
            <div className={styles.login_section}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <h1 className={styles.title}>Edit {team.description}</h1>
                    <input className={styles.inputText} type="text" id="teamName" name="teamName" placeholder='Team Name' required />
                    {user && <input className={styles.inputText} type="email" id="playerOne" name="playerOne" value={`${user.email}*`} disabled />}
                    <input className={styles.inputText} type="email" id="playerTwo" name="playerTwo" placeholder="Player 2's email" />
                    <input className={styles.inputText} type="email" id="playerThree" name="playerThree" placeholder="Player 3's email" />
                    <input className={styles.inputText} type="email" id="playerFour" name="playerFour" placeholder="Player 4's email" />
                    <input className={styles.inputText} type="email" id="playerFive" name="playerFive" placeholder="Player 5's email" />
                    {
                        members.map((member, index) => {
                            <input className={styles.inputText} type="email" id="playerTwo" name="playerTwo" placeholder="Player 2's email" />
                        })
                        // started ^^
                        // finish displaying exisiting users
                        // display empty users
                        // onSubmit function
                        // test
                        // fix issue where page is cutting off H1 for some reason

                    }
                    <Button type='submit' name='Edit Team' width='100%' />
                </form>
                
                <img src={landscapeImage} alt="Landscape" />
            </div>
        </>
    );
}

export default EditTeam;