import React, {useState, useEffect} from 'react'
import globalStyles from '../pages.module.css';
import styles from './profile.module.css';
import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';


const Profile = (props) => {  

    // Needed for all API calls
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');
    // eslint-disable-next-line
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //Default user
    const [person, setPerson] = useState({
      "_id": "640f5aa209be69cb0b64e42d",
      "teamID": "1423518",
      "roleID": 19202,
      "universityID": 2760,
      "firstName": "Test",
      "lastName": "User",
      "teamName": "Sample Team One",
      "universityName": "RIT",
      "email": "spammewemails@rit.edu"
    });
    //Default team
    const [team, setTeam] = useState("ABP");

    //Retreive user using the token
    useEffect(()=> {
      async function getUser() { 
          const raw = JSON.stringify({
            "token": user.token
          });
  
          const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
          };
  
          await fetch(`${BASE_URL}/userSec/getUserProfile`, requestOptions) 
              .then(response => response.json())
              .then(function(result) {
                setPerson(result); 
              })
              .catch(function(error) {
                  console.log('error', error);
              });
      }
      getUser();
    },[BASE_URL, myHeaders]);

    //Retreive user's team with the newly retreived user
    useEffect(()=> {
      async function getTeam() { 
          const raw = JSON.stringify({
            "id": person.teamID
          });
  
          const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
          };
  
          await fetch(`${BASE_URL}/teamPub/byID`, requestOptions) 
              .then(response => response.json())
              .then(function(result) {
                setTeam(result.description); 
              })
              .catch(function(error) {
                  console.log('error', error);
              });
      }
      getTeam();
    },[BASE_URL, person, myHeaders]);
    

    return (
        <>
            {!user && (
                <Navigate to="/" replace={true} />
            )}

            <div className={`${globalStyles.h1_title_section} ${styles.background}`}>
            </div>

            
            <div className={styles.profile_margin}>
            <h3 className={`${globalStyles.headline_text}`}>{`${user.firstName} ${user.lastName}`}</h3>
            <br/><br/>

            {/* Table containing user information  */}
            <table className={styles.profile_table}>
              <tr className={styles.row_border}>
                <td className={styles.fields}>Name</td>
                <td className={`${globalStyles.text} ${globalStyles.p}`}>{`${user.firstName} ${user.lastName}`}</td>
             </tr>

             <tr className={styles.row_border}>
                <td className={styles.fields}>University</td>
                <td className={`${globalStyles.text} ${globalStyles.p}`}>{`${person.universityName}`}</td>
             </tr>

             <tr className={styles.row_border}>
                <td className={styles.fields}>University Email</td>
                <td className={`${globalStyles.text} ${globalStyles.p}`}>{`${person.email}`}</td>
             </tr>

             <tr className={styles.row_border}>
                <td className={styles.fields}>Team</td>
                <td className={`${globalStyles.text} ${globalStyles.p}`}>{`${team}`}</td>
             </tr>

            </table>
            </div>
        </>
  )
};

export default Profile;
