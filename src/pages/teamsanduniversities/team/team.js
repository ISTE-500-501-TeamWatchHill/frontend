import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import globalStyles from '../../pages.module.css';
import styles from './team.module.css';
import Header from '../../../components/header/header';
import MemberBlock from '../../../components/memberblock/memberblock';

/* TODO
 * maybe look for a way to pass univ info? 
*/

const Team = () => {   
  let { id } = useParams();
  
  // roleID, universityID,  
  const [team, setTeam] = useState({
    "_id": "Loading...",
    "teamID": 1,
    "universityID": 2760,
    "players": [],
    "description": "Loading...",
    "logo": "",
    "approvalStatus": false,
  });
  const [members, setMembers] = useState([]);
  const [university, setUniversity] = useState("Loading...");

  // Needed for all API calls
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  // eslint-disable-next-line
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
          let updatedMembers = [...members, result];
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

  useEffect(() => {
    const fetchUniversity = async () => {
      const raw = JSON.stringify({
        "id": team.universityID
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      await fetch(`${BASE_URL}/universityPub/byID`, requestOptions)
        .then(response => response.json())
        .then(function(result) {
          setUniversity(result.name);
        })
        .catch(function(error) {
          console.log('error', error);
        }); 
    }
    fetchUniversity();
  },[team, BASE_URL, myHeaders]);


  return (
    <>
      <div className={globalStyles.background}>
        <Header name={`${team.description}`} />

        <div className={`${globalStyles.grid_page} ${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
          <h3 className={`${globalStyles.text} ${styles.university}`}> <a href={"/university/" + team.universityID}>{university}</a></h3>

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