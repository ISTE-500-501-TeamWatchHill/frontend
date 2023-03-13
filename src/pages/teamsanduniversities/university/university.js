import React, {useState, useEffect} from 'react'
// import image from '../../../components/placeholder.png';
import { useParams } from "react-router-dom";
import globalStyles from '../../pages.module.css';
import styles from './university.module.css';

import Header from '../../../components/header/header';
// import Spacer from '../../../components/spacer/spacer';
import TeamBlock from '../../../components/teamblock/teamblock';

const University = (props) => {   

  let { id } = useParams();

  const [university, setUniversity] = useState([{"universityID": 2429, "name": "Monroe Community College"}]);
  const [teams, setTeams] = useState([{ teamID: 1, description: "Team One", universityID: 1, universityName: "RIT", players: [] }]);



   // Needed for all API calls
   const BASE_URL = process.env.REACT_APP_BASE_URL;
   //const cookies = new Cookies();
   //const user = cookies.get('user');
   let myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");

  useEffect(()=> {
    async function getUniversity() {
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            body: {
              id: id
            },
            redirect: 'follow'
        };

        await fetch(`${BASE_URL}/universities/byID`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
              setUniversity(result);
            })
            .catch(function(error) {
                console.log('error', error);
            });
    }
    getUniversity();
  })

  //TODO: get teams by univ id 

    return (
          <>
          
            <div className={globalStyles.background}>
              <Header 
                name={`${university.name}`}
              />

              <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
                <h3 className={`${globalStyles.text} ${globalStyles.sub_header_spacer}`}>DESCRIPTION</h3>

                <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>Registration for this tournament is limited to countries in which participation is legal. If there is a difference of opinion in interpretation of the law, Aardvark Games' legal counsel will have the final word on a Team's ability to register.</p>
              </div>

              <h3 className={`${globalStyles.text} ${styles.gridTitleMargin} ${globalStyles.margin8_top} ${globalStyles.sub_header_spacer}`}>TEAMS</h3>
              <div className={`${globalStyles.grid_page} ${globalStyles.margin8_bottom}`}>
                <div className={`${globalStyles.body_margin} ${globalStyles.grid_list}`}>
                    {/* Teams */}
                    {
                        // eslint-disable-next-line
                        teams.map((team) => {
                          return (
                              // TODO: change key to use unique identifier
                              <TeamBlock key={team.name} team={team} />
                          )
                      })
                    }
                </div>
              </div>
            </div>
          </>
    )
};
  
export default University;