import React from 'react'
import './team.css';
import image from '../../../components/placeholder.png';
import { useParams } from "react-router-dom";
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
            {/* Title */}
            <h1> Team Name ({id}) </h1>

            <h3> University Name</h3>

            <div class="grid">
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