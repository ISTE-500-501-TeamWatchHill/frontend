import React, {useState, useEffect} from 'react'
import globalStyles from '../pages.module.css';
import styles from './profile.module.css';
import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Header from '../../components/header/header';


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

    /* TODO:
     * dynamic profile pic
        * need endpoint for this also? 
     * connect to backend
        * what endpoint will allow me to get user info based on whats in the cookie? 
        * /how do i get this info 
     * style it - alexis pls <3
    */

    useEffect(()=> {
      async function getUser() {
          const raw = JSON.stringify({
            "email": user.email
          });
  
          const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
          };
  
          await fetch(`${BASE_URL}/userPub/byID`, requestOptions)
              .then(response => response.json())
              .then(function(result) {
                setPerson(result); 
              })
              .catch(function(error) {
                  console.log('error', error);
              });
      }
      //getUser();
    },[BASE_URL, user, myHeaders])
    

    return (
        <>
            {!user && (
                <Navigate to="/" replace={true} />
            )}
          <div className={globalStyles.background}>
            <Header 
              name={`${user.firstName} ${user.lastName}`}
            />
            <p className={`${globalStyles.text} ${globalStyles.wide_p} ${globalStyles.white}`}>Name: {`${user.firstName} ${user.lastName}`}</p>
            <p className={`${globalStyles.text} ${globalStyles.wide_p} ${globalStyles.white}`}>Password: ****</p>
            <p className={`${globalStyles.text} ${globalStyles.wide_p} ${globalStyles.white}`}>University: {`${person.universityName}`}</p>
            <p className={`${globalStyles.text} ${globalStyles.wide_p} ${globalStyles.white}`}>University Email: {`${person.email}`}</p>
            <p className={`${globalStyles.text} ${globalStyles.wide_p} ${globalStyles.white}`}>Team: {`${person.teamName}`}</p>
          </div>
        </>
  )
};

export default Profile;