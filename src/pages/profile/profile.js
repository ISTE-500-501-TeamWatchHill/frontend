import React, {useState, useEffect} from 'react'
import globalStyles from '../pages.module.css';
import styles from './profile.module.css';
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';


const Profile = (props) => {  

    // Needed for all API calls
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');
    const navigate = useNavigate();
    // eslint-disable-next-line
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //Default user
    const [person, setPerson] = useState({
      "_id": "640f5aa209be69cb0b64e42d",
      "teamID": "1423518",
      "roleID": 19202,
      "universityID": 2760,
      "firstName": "...",
      "lastName": "",
      "teamName": "No team found",
      "universityName": "No university found",
      "email": "No email found"
    });
    //Default team
    const [team, setTeam] = useState();

    //Retreive user using the token
    useEffect(()=> {

      if (!user) {
        navigate("/login");
        navigate(0);
      }


      const fetchTeam = async (teamID) => {
        const raw = JSON.stringify({
          "id": teamID
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

      const fetchUser = async () => {
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
              fetchTeam(result.teamID);
            })
            .catch(function(error) {
                console.log('error', error);
            });
      }

      fetchUser();
      
      // eslint-disable-next-line
    },[]);

    
    

    return (
        <>
            {!user && (
                <Navigate to="/" replace={true} />
            )}

            <div className={`${globalStyles.h1_title_section} ${styles.background}`}>
            </div>

            
            <div className={styles.profile_margin}>
            <h3 className={`${globalStyles.headline_text}`}>{`${person.firstName} ${person.lastName}`}</h3>
            <br/><br/>

            {/* Table containing user information  */}
            <table className={styles.profile_table}>
              <tbody>
              <tr className={styles.row_border}>
                <td className={styles.fields}>Name</td>
                <td className={`${globalStyles.text} ${globalStyles.p}`}>{`${person.firstName} ${person.lastName}`}</td>
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
                <td className={`${globalStyles.text} ${globalStyles.p}`}>
                  {team && `${team} - `} {team && <a href="/team/edit">Edit</a>}
                  {!team && `User hasn't joined a team yet!`}
                </td>
              </tr>

              <tr className={styles.row_border}>
                <td className={styles.fields}>Role</td>
                <td className={`${globalStyles.text} ${globalStyles.p}`}>
                  {person.roleID === 19202 && `Registered User`}
                  {person.roleID === 31514 && `University Moderator`}
                  {person.roleID === 21149 && `Content Moderator`}
                  {person.roleID === 14139 && `Administrator`}
                  {![19202,31514,21149,14139].includes(person.roleID) && `No role set`}
                </td>
              </tr>
            </tbody>
            </table>
            </div>
        </>
  )
};

export default Profile;
