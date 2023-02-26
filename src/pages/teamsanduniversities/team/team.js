import React from 'react'
import image from '../../../components/placeholder.png';
import { useParams } from "react-router-dom";
import globalStyles from '../../pages.module.css';
import styles from './team.module.css';

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

  let { id } = useParams();

    return (
          <>
          
          <Header 
            name={id}
          />

            <h3> University Name</h3>

            <div class={styles.grid}>
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
          </>
    )
};
  
export default Team;