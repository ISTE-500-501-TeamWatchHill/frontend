import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import globalStyles from '../../pages.module.css';
import styles from './team.module.css';
import MemberBlock from '../../../components/memberblock/memberblock';
import BackArrow from '../../../components/backarrow/backarrow';
// import GameBlock from '../../../components/gameblock/gameblock';

const Team = () => {   
  let { id } = useParams();
  
  const [team, setTeam] = useState({
    "_id": "Loading...",
    "teamID": 1,
    "universityID": 2760,
    "universityName": "Loading...",
    "players": [],
    "description": "Loading...",
    "logo": "",
    "approvalStatus": false,
  });
  const [members, setMembers] = useState([{
    "canMarket": false,
    "email": "...",
    "firstName": "...",
    "lastName": "...",
    "roleID": 19202,
    "teamID": "...",
    "universityID": 2760,
    "_id": "..."
  }]);
  // const [games, setGames] = useState([]);

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
          const updatedMembers = members;
          updatedMembers.push(result);
          setMembers(updatedMembers); 
        })
        .catch(function(error) {
          console.log('error', error);
        });
    }

    const fetchTeam = async () => {
      const raw = JSON.stringify({
        "id": id
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      await fetch(`${BASE_URL}/teamPub/byIDExpanded`, requestOptions)
        .then(response => response.json())
        .then(function(result) { 
          setTeam(result[0]);
          result[0].players.map(player => {
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
        <div className={`${globalStyles.h1_title_section} ${styles.background}`}>
            <h1 className={globalStyles.h1_title}>{team.description}</h1>
        </div>

        <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top}`}>
            <BackArrow text="Back to Teams" route="/teamsanduniversities"/>
        </div>

        <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
          <h3 className={globalStyles.headline_text}>{team.universityName}</h3>
          <p className={`${globalStyles.green_bar} ${globalStyles.sub_header_spacer}`}>____</p>
          <p className={`${globalStyles.text} ${globalStyles.bold} ${globalStyles.margin8_top} ${globalStyles.margin4_bottom}`}>PLAYERS</p>

          <div className={styles.grid}>
              {/* Team Members */}
              {
                  members.map((member, index) => {
                    <MemberBlock key={index} member={member}/> 
                  })
              }
          </div>

          <p className={`${globalStyles.text} ${globalStyles.bold} ${globalStyles.margin8_top} ${globalStyles.margin4_bottom}`}>UPCOMING GAMES</p>

          <div className={styles.gridList}>
              {/* Games */}
              {/* {
                games.length > 0 &&
                  games.map((game, index) => {
                    return (
                        <GameBlock key={index} game={game} />
                    );
                  })
              } */}
          </div>
        </div>
    </>
  );
};
  
export default Team;