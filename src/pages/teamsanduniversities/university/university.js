import React from 'react'
// import image from '../../../components/placeholder.png';
import { useParams } from "react-router-dom";
import globalStyles from '../../pages.module.css';
import styles from './university.module.css';

import Header from '../../../components/header/header';
// import Spacer from '../../../components/spacer/spacer';
import TeamBlock from '../../../components/teamblock/teamblock';


//Hard coded for now- will grab from database.
const teams = [ 
  { id: 1, name: "Team One", universityname: "Rochester Istitute of Technology", universityid: 1, numplayers: 4 },
  { id: 2, name: "Team Two", universityname: "Rochester Istitute of Technology", universityid: 1, numplayers: 4 },
  { id: 3, name: "Team Three", universityname: "Rochester Istitute of Technology", universityid: 1, numplayers: 5 },
  { id: 4, name: "Team Four", universityname: "Rochester Istitute of Technology", universityid: 1, numplayers: 4 }
];


const University = (props) => {   

  let { id } = useParams();

    return (
          <>
            <Header 
              name={`University with ID: ${id}`}
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
          </>
    )
};
  
export default University;