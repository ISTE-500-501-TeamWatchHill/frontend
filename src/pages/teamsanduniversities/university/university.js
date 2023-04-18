import React, {useState, useEffect} from 'react'
// import image from '../../../components/placeholder.png';
import { useParams } from "react-router-dom";
import globalStyles from '../../pages.module.css';
import styles from './university.module.css';

import TeamBlock from '../../../components/teamblock/teamblock';
import BackArrow from '../../../components/backarrow/backarrow';

const University = (props) => {   

  let { id } = useParams();

  //Defaults for university and associated teams
  const [university, changeUniversity] = useState({"universityID": 2429, "name": "Monroe Community College"});
  const [teams, setTeams] = useState([{ _id: 1, description: "Team One", universityID: 1, universityName: "RIT", players: [] }]);

   // Needed for all API calls
   const BASE_URL = process.env.REACT_APP_BASE_URL;
   // eslint-disable-next-line
   let myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");

   //Attempt to get university
  useEffect(()=> {
    async function getUniversity() {
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
    getUniversity();
  },[BASE_URL, id, myHeaders])

  //Attempt to get teams from the given university
  useEffect(()=> {
    
    async function getTeams() {
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
    getTeams();
  },[university,BASE_URL, id, myHeaders])

    return (
          <>
              {/* Header */}
              <div className={`${globalStyles.h1_title_section} ${styles.background}`}>
                  <h1 className={globalStyles.h1_title}>{university.name}</h1>
              </div>

              <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top}`}>
                  <BackArrow text="Back to Teams" route="/teamsanduniversities"/>
              </div>

              <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
                <p className={`${globalStyles.text} ${globalStyles.p}`}>Registration for this tournament is limited to countries in which participation is legal. If there is a difference of opinion in interpretation of the law, Aardvark Games' legal counsel will have the final word on a Team's ability to register.</p>
              </div>

              <h3 className={`${globalStyles.text} ${styles.gridTitleMargin} ${globalStyles.margin8_top} ${globalStyles.sub_header_spacer}`}>TEAMS</h3>
              <div className={`${globalStyles.margin8_bottom}`}>
                {/* Display all teams in a given university */}
                <div className={`${globalStyles.body_margin} ${styles.grid}`}>
                    {/* Teams */}
                    {
                        // eslint-disable-next-line
                        teams.map((team) => {
                          return (
                              <TeamBlock key={team._id} team={team} />
                          )
                      })
                    }
                </div>

                <h3 className={`${globalStyles.text} ${styles.gridTitleMargin} ${globalStyles.margin8_top} ${globalStyles.sub_header_spacer}`}>UPCOMING GAMES</h3>
              </div>
          </>
    )
};
  
export default University;