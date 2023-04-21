import React, {useState, useEffect} from 'react'
// import image from '../../../components/placeholder.png';
import { useParams } from "react-router-dom";
import globalStyles from '../../pages.module.css';
import styles from './university.module.css';

import TeamBlock from '../../../components/teamblock/teamblock';
import BackArrow from '../../../components/backarrow/backarrow';
import GameBlock from '../../../components/gameblock/gameblock';


const University = (props) => {   

  let { id } = useParams();

  const [university, changeUniversity] = useState({"universityID": 2429, "name": "Monroe Community College"});
  const [teams, setTeams] = useState([{ _id: 1, description: "Team One", universityID: 1, universityName: "RIT", players: [] }]);
  // const [games, changeGames] = useState([{ _id: 1, universityID: 1, homeTeam: "Team One", homeTeamInfo: [{description: "", logo: "", universityID: 1}], awayTeam: "Team Two", awayTeamInfo: [{description: "", logo: "", universityID: 1}], winningTeam: "Team One", gameFinished: true, gameTime: "12:00pm EST", locationInfo: [{name: ""}] }]); 
  const [games, changeGames] = useState([]); 


   // Needed for all API calls
   const BASE_URL = process.env.REACT_APP_BASE_URL;
   // eslint-disable-next-line
   let myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");

    useEffect(()=> {
      const getUniversity = async () => {
          const raw = JSON.stringify({
            "universityID": Number(id)
          });

          const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
          };

          await fetch(`${BASE_URL}/universityPub/byUniversityID`, requestOptions)
              .then(response => response.json())
              .then(function(result) {
                changeUniversity(result); 
              })
              .catch(function(error) {
                  console.log('error', error);
              });
      }
      const getTeams = async () => {
        const raw = JSON.stringify({
          "universityID": Number(id)
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        await fetch(`${BASE_URL}/teamPub/byUniID`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
              // eslint-disable-next-line
              result.map((team) => {
                team.universityName = university.name;
              });
              setTeams(result);
            })
            .catch(function(error) {
                console.log('error', error);
            });
      }
      const getGames = async () => {
        const raw = JSON.stringify({
          "id": Number(id)
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        await fetch(`${BASE_URL}/gamePub/byUniversityID`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
              console.log(result);
              changeGames(result);
            })
            .catch(function(error) {
                console.log('error', error);
            });
      }
      getUniversity();
      getTeams();
      getGames();
      // eslint-disable-next-line
    },[]);

    let gameDates = [
      // "date1"
    ];
    
    let gamesByDate = [
      // [
      //   {Games_with_1_date_here: "time 1"},
      //   {Games_with_1_date_here: "time 2"}
      // ]
    ];

    games.forEach((game) => {
      const date = game.gameTime.split("T")[0];
      //Get index of date if its in splitGamesDates otherwise returns -1
      const index = gameDates.indexOf(date); //needs to be date only not datetime
    
      
      if (index === -1) {
        //index is -1, create a new array
        gameDates.push(date) //need to push date only not datetime
        gamesByDate.push([game]); //push new empty array with game in it
      } else {
        //add game to that already existing date array
        gamesByDate[index].push(game); //push game to already existing array
      }
    });

    return (
          <>
              <div className={`${globalStyles.h1_title_section} ${styles.background}`}>
                  <h1 className={globalStyles.h1_title}>{university.name}</h1>
              </div>

              <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top}`}>
                  <BackArrow text="Back to Teams and Universities" route="/teamsanduniversities"/>
              </div>

              <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
                <p className={`${globalStyles.text} ${globalStyles.p}`}>Registration for this tournament is limited to countries in which participation is legal. If there is a difference of opinion in interpretation of the law, Aardvark Games' legal counsel will have the final word on a Team's ability to register.</p>
              </div>

              <h3 className={`${globalStyles.text} ${styles.gridTitleMargin} ${globalStyles.margin8_top} ${globalStyles.sub_header_spacer}`}>TEAMS</h3>
              <div className={`${globalStyles.margin8_bottom}`}>

                <div className={`${globalStyles.body_margin} ${styles.grid}`}>
                    {/* Teams */}
                    {
                        // eslint-disable-next-line
                        teams.map((team, index) => {
                          return (
                              // TODO: change key to use unique identifier
                              <TeamBlock key={index} team={team} />
                          )
                      })
                    }
                </div>

                <h3 className={`${globalStyles.text} ${styles.gridTitleMargin} ${globalStyles.margin8_top} ${globalStyles.sub_header_spacer}`}>UPCOMING GAMES</h3>
                <div className={`${styles.grid_list} ${globalStyles.body_margin}`}>
                  {
                    gamesByDate.map( (gamesForDateX) => {
                      return (
                        <>
                          <h3 className={`${globalStyles.text} ${globalStyles.sub_header_spacer}`}>{gameDates[gamesByDate.indexOf(gamesForDateX)]}</h3>
                        
                          {
                            // eslint-disable-next-line
                            gamesForDateX.map((game, index) => {
                              return (
                                  // TODO: change key to use unique identifier
                                  <GameBlock key={index} game={game} />
                              )
                            })
                          }

                          <div className={globalStyles.margin8_bottom}></div>
                        </>
                      )
                    })
                  };
                </div>
                
              </div>
          </>
    )
};
  
export default University;