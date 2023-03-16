import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import globalStyles from '../../pages.module.css';
import styles from './team.module.css';

import Header from '../../../components/header/header';
import MemberBlock from '../../../components/memberblock/memberblock';

/* TODO
 * get university name and display it 
 * maybe look for a way to pass univ info? 
 * get users - infinitely re-renders adsfjhsak 
*/

const Team = (props) => {   

  let { id } = useParams();
  // roleID, universityID,  
  const [team, setTeam] = useState({
    "_id": "Loading...",
    "teamID": 1,
    "universityID": 1,
    "players": [],
    "description": "Loading...",
    "logo": "",
    "approvalStatus": false,
  });
  const [members, setMembers] = useState([]);

  // Needed for all API calls
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");


  useEffect(() => {
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
          // setMembers(result);
          let updatedMembers = [...members, result];
          // console.log("setting member");
          setMembers(updatedMembers); 
        })
        .catch(function(error) {
          console.log('error', error);
        });
    }

    const fetchTeam = async () => {
      const raw = JSON.stringify({
        "_id": id
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
          result.players.forEach(player => {
            fetchMember(player);
          });
        })
        .catch(function(error) {
          console.log('error', error);
        });      
    }

    fetchTeam();
    
    // eslint-disable-next-line
  },[]);  


  return (
    <>
      <div className={globalStyles.background}>
        <Header name={`${team.description}`} />

        <div className={`${globalStyles.grid_page} ${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
          <h3 className={`${globalStyles.text} ${styles.university}`}> University Name</h3>

          <div className={globalStyles.grid}>
              {/* Team Members */}
              {
                members.length > 0 &&
                  members.map((member, index) => {
                    return (
                        <MemberBlock key={index} member={member} />
                    );
                  })
              }
          </div>
        </div>
      </div>
    </>
  );
};
  
export default Team;