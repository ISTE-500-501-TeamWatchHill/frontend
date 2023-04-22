import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import globalStyles from '../../pages.module.css';
import styles from './team.module.css';
import MemberBlock from '../../../components/memberblock/memberblock';
import BackArrow from '../../../components/backarrow/backarrow';
import GameBlock from '../../../components/gameblock/gameblock';
import Toast from '../../../components/toast/toast';

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

  const [members, setMembers] = useState([]);

  const [games, setGames] = useState([{
    "awayTeam": "643b18d356ec1b04ce3e5e47",
    "gameFinished": false,
    "gameTime": "...",
    "homeTeam": "64389a3e0231f39d1b359aa0",
    "universityID": 2760,
    "winningTeam": null,
    "_id": "64090521737ad91d7cd5fb25",
    "homeTeamInfo": [
      {
          "universityID": 2760,
          "description": "..."
      }
    ],
    "awayTeamInfo": [
        {
            "universityID": 2760,
            "description": "..."
        }
    ],
    "locationInfo": [
        {
            "name": "..."
        }
    ]
  }]);

  //To keep the status of when messages need to be shown
  const [toastOpen, setToastOpen] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastMessage, setToastMessage] = useState("");

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
          setMembers(current => [...current, result]);
        })
        .catch(function(error) {
          console.log('error', error);
          //Display the error
          setToastTitle("Failed to Retreive Team");
          setToastMessage("Please check to ensure the API is up and running.");
          setToastOpen(true);
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
            return fetchMember(player);
          })
        })
        .catch(function(error) {
          console.log('error', error);
          //Display the error
          setToastTitle("Failed to Retreive Team");
          setToastMessage("Please check to ensure the API is up and running.");
          setToastOpen(true);
        }); 
    }

    const fetchGames = async () => {
      const raw = JSON.stringify({
        "id": id
      });


      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      await fetch(`${BASE_URL}/gamePub/byTeamID`, requestOptions)
        .then(response => response.json())
        .then(function(result) { 
          setGames(result);
        })
        .catch(function(error) {
          console.log('error', error);
          //Display the error
          setToastTitle("Failed to Retreive Team");
          setToastMessage("Please check to ensure the API is up and running.");
          setToastOpen(true);
        });
    }

    fetchTeam();
    fetchGames();

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
                members.length > 0 &&
                  members.map((member, index) => {
                    return ( <MemberBlock key={index} member={member}/> )
                  })
              }
          </div>

          <p className={`${globalStyles.text} ${globalStyles.bold} ${globalStyles.margin8_top} ${globalStyles.margin4_bottom}`}>UPCOMING GAMES</p>

          <div className={styles.gridList}>
              {/* Games */}
              {
                games.length > 0 &&
                  games.map((game, index) => {
                    return ( <GameBlock key={index} game={game} /> );
                  })
              }
          </div>
        </div>

        {
            toastOpen &&
            <Toast 
                title={toastTitle}
                message={toastMessage}
                onclick={() => setToastOpen(false)}
            />
        }
    </>
  );
};
  
export default Team;