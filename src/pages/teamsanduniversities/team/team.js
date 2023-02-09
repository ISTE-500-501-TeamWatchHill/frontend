import React from 'react'
import './team.css';
import image from '../../../components/placeholder.png';
import { useParams } from "react-router-dom";

const Team = (props) => {   

  let { team } = useParams();

    return (
          <>
            <div>Hello this is a team page for {JSON.parse(team).name}</div>
          </>
    )
};
  
export default Team;