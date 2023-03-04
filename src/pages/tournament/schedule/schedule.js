import React from 'react';
import globalStyles from '../../pages.module.css';

import Header from '../../../components/header/header';
import GameBlock from '../../../components/gameblock/gameblock';

//Hard coded for now- will grab from database.
const rawgames = [ 
  { gameid: 1, teamoneid: 1, teamtwoid: 5, datetime: "04 Aug 2023 00:12:00 EST", location: "Antarctica" },
  { gameid: 2, teamoneid: 2, teamtwoid: 6, datetime: "04 Aug 2023 00:12:00 EST", location: "Antarctica" },
  { gameid: 3, teamoneid: 3, teamtwoid: 7, datetime: "05 Aug 2023 00:01:00 EST", location: "Antarctica" },
  { gameid: 4, teamoneid: 4, teamtwoid: 8, datetime: "05 Aug 2023 00:12:00 EST", location: "Antarctica" }
];

//parallel array
let gamesDates = [
  // "date1"
];

let games = [
  // [
  //   {Games_with_1_date_here: "time 1"},
  //   {Games_with_1_date_here: "time 2"}
  // ]
];

rawgames.forEach((game) => {
  //Get index of date if its in splitGamesDates otherwise returns -1
  const index = gamesDates.indexOf(game.datetime.substring(0,11)); //needs to be date only not datetime

  
  if (index === -1) {
    //index is -1, create a new array
    gamesDates.push(game.datetime.substring(0,11)) //need to push date only not datetime
    games.push([game]); //push new empty array with game in it
  } else {
    //add game to that already existing date array
    games[index].push(game); //push game to already existing array
  }
});

const Schedule = () => {
  return (
        <>
        <div className={globalStyles.background}>
          <Header 
            name="Schedule"
          />

          {/* TODO FOR ALEXIS
            filter games by date/team/university location
            incorporate endpoint 
             */}


          <div className={`${globalStyles.grid_page} ${globalStyles.margin8_top}`}>
            <div className={`${globalStyles.body_margin} ${globalStyles.grid_list}`}>
                {/* Teams */}
                {
                  games.map( (gamesForDateX) => {
                    return (
                      <>
                        <h3 className={`${globalStyles.text} ${globalStyles.sub_header_spacer}`}>{gamesDates[games.indexOf(gamesForDateX)]}</h3>
                      
                        {
                          // eslint-disable-next-line
                          gamesForDateX.map((game) => {
                            return (
                                // TODO: change key to use unique identifier
                                <GameBlock key={game.gameid} game={game} />
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
          </div>
        </>
    )
  };
export default Schedule;