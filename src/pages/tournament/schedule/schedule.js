import React, {useState, useEffect} from 'react';
import globalStyles from '../../pages.module.css';
import styles from './schedule.module.css';
import GameBlock from '../../../components/gameblock/gameblock';
import Toast from '../../../components/toast/toast';

const Schedule = () => {

  //Setup for hook for games
  const [games, changeGames] = useState([{ _id: 1, universityID: 1, homeTeam: "Team One", homeTeamInfo: [{description: "", logo: "", universityID: 1}], awayTeam: "Team Two", awayTeamInfo: [{description: "", logo: "", universityID: 1}], winningTeam: "Team One", gameFinished: true, gameTime: "12:00pm EST", locationInfo: [{name: ""}] }]);
  //To keep the status of when messages need to be shown
  const [toastOpen, setToastOpen] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastMessage, setToastMessage] = useState(""); 

  // Needed for all API calls
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  useEffect(()=> {
      async function getGames() {
          const requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
          };

          await fetch(`${BASE_URL}/gamePub/allExpanded`, requestOptions)
              .then(response => response.json())
              .then(function(result) {
                changeGames(result);
              })
              .catch(function(error) {
                  console.log('error', error);
                  //Display the error
                  setToastTitle("Failed to Retreive Schedule");
                  setToastMessage("Please check to ensure the API is up and running.");
                  setToastOpen(true);
              });
      }
      getGames();
    // eslint-disable-next-line
  },[])

  //parallel array
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
              <h1 className={globalStyles.h1_title}>Schedule</h1>
          </div>

          {/* TODO FOR ALEXIS
            filter games by date/team/university location
            incorporate endpoint 
             */}


          <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
            <h3 className={globalStyles.headline_text}>Upcoming Games</h3>

            <p className={`${globalStyles.green_bar} ${globalStyles.sub_header_spacer}`}>__</p>
            <br/>

            <div className={`${styles.grid_list}`}>
                {/* Teams */}
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

          {
              toastOpen &&
              <Toast 
                  title={toastTitle}
                  message={toastMessage}
                  onclick={() => setToastOpen(false)}
              />
          }
        </>
    )
  };
export default Schedule;