import React from 'react'
import image from '../../../components/placeholder.png';
import { useParams } from "react-router-dom";
import globalStyles from '../../pages.module.css';
import styles from './team.module.css';
import Button from '../../../components/button/button';
import Header from '../../../components/header/header';
import MemberBlock from '../../../components/memberblock/memberblock';


//Hard coded for now- will grab from database
const members = [ 
  { id: 1533, name: "John Smith", image: image },
  { id: 2354, name: "Jane Doe", image: image },
  { id: 3876, name: "Cindy Lou", image: image },
  { id: 4767, name: "Mary", image: image },
];

const Team = (props) => {   

  // TEMP HARDCODED
  const teamID = "1"; // acting as a substitute for a user's team ID
  let teamNamePrefix = "Team ";
  let teamName = "Temp Name"; // acting as a substitute for a team's name

  let { id } = useParams();

    return (
          <>
            <Header 
              name={teamNamePrefix + teamName}
            />

          <div className={`${globalStyles.grid_page} ${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
            <h3 className={`${globalStyles.text} ${styles.university}`}>Dynamic University Name TODO</h3>

            <div className={globalStyles.grid}>
                {/* Team Members */}
                {
                    // eslint-disable-next-line
                    members.map((member) => {
                        return (
                            <MemberBlock member={member} />
                        )
                    })
                }
            </div>

            { teamID == id &&
              <div className={styles.editButtonRow}>
                <Button name='Edit Team Name' />
                <Button name='Edit Team Profile Picture' />
                <Button name='Edit Roster' />
              </div>
            }

          </div>
        </>
    )
};
  
export default Team;