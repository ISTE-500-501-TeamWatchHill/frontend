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
    const [person, setPerson] = useState({
      //"_id": ObjectId("640f5aa209be69cb0b64e42d"),
      "uid": 1423518,
      "roleID": 19202,
      "universityID": 2760,
      "firstName": "Test",
      "lastName": "User",
      "teamName": "Sample Team One",
      "universityName": "RIT",
      "email": "spammewemails@rit.edu"
    });
    const [university, setUniversity] = useState("RIT");

    /* TODO:
     * dynamic profile pic
     * style it - alexis pls <3
    */

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
    },[BASE_URL, user, myHeaders]);

    useEffect(() => {
      const fetchUniversity = async () => {
        const raw = JSON.stringify({
          "universityID": person.universityID
        });
  
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        };
  
        await fetch(`${BASE_URL}/universityPub/byUniversityID`, requestOptions)
          .then(response => response.json())
          .then(function(result) {
            setUniversity(result.name);
          })
          .catch(function(error) {
            console.log('error', error);
          }); 
      }
      fetchUniversity();
    },[person, BASE_URL, myHeaders]);
    

    return (
        <>
            {!user && (
                <Navigate to="/" replace={true} />
            )}

            <div className={`${globalStyles.h1_title_section} ${styles.background}`}>
                <h1 className={globalStyles.h1_title}>{`${user.firstName} ${user.lastName}`}</h1>
            </div>

            {/* get univ name slay  */}
            <p className={`${globalStyles.text} ${globalStyles.p}`}>Name: {`${user.firstName} ${user.lastName}`}</p>
            <p className={`${globalStyles.text} ${globalStyles.p}`}>University: {`${university}`}</p>
            <p className={`${globalStyles.text} ${globalStyles.p}`}>University Email: {`${person.email}`}</p>
            <p className={`${globalStyles.text} ${globalStyles.p}`}>Team: {`${person.teamName}`}</p>
        </>
  )
};

export default Profile;