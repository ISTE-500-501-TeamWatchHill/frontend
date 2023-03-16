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
  const [team, setTeam] = useState({ teamID: 1, description: "Team One", universityID: 1, universityName: "RIT", players: ["2893572"] });
  const [members, setMembers] = useState([]);

  // Needed for all API calls
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  // eslint-disable-next-line
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");



    async function getTeam() {
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
              console.log(result);
              setTeam(result); 
            })
            .catch(function(error) {
                console.log('error', error);
            });
    }
    //getPlayers();


  //causes infinite re-renders
  // function getPlayers() {

  //   async function getMember(userID) {
  //       const raw = JSON.stringify({
  //         "id": userID
  //       });

  //       const requestOptions = {
  //           method: 'POST',
  //           headers: myHeaders,
  //           body: raw,
  //       };

  //       await fetch(`${BASE_URL}/userPub/byID`, requestOptions)
  //           .then(response => response.json())
  //           .then(function(result) {
  //             //setMembers(result);
  //             let updatedMembers = [...members, result];
  //             //console.log("setting member");
  //             setMembers(updatedMembers); 
  //           })
  //           .catch(function(error) {
  //               console.log('error', error);
  //           });
  //   }
  //   team.players.forEach(player => {
  //     console.log("in for each");
  //     getMember(player);
  //   });
  // }

    return (
          <>

          <div className={globalStyles.background}>
            <Header 
              name={`${team.description}`}
            />

            <div className={`${globalStyles.grid_page} ${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
              <h3 className={`${globalStyles.text} ${styles.university}`}> University Name</h3>

              <div className={globalStyles.grid}>
                  {/* Team Members */}
                  {members.length>0 &&
                      // eslint-disable-next-line
                      members.map((member) => {
                          return (
                              <MemberBlock member={member} />
                          )
                      })
                  }
              </div>
            </div>
          </div>
        </>
    )
};
  
export default Team;