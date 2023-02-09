import React from 'react'
import './teamblock.css';
import image from '../placeholder.png';
import Team from '../../pages/teamsanduniversities/team/team';

const TeamBlock = (props) => {   
    if (!props.team.id) {
        throw new Error ("ERROR: No team id.");
    }

    if (!props.team.name) {
        throw new Error ("ERROR: No team name.");
    }

    if (!props.team.universityname) {
        throw new Error ("ERROR: No university name.");
    }

    if (!props.team.universityid) {
        throw new Error ("ERROR: No university id.");
    }

    if (!props.team.numplayers) {
        throw new Error ("ERROR: No number of players set.");
    }

    return (
          <>
            <div class="block">
                <div class="flex">
                    <img src={image} alt="Placeholder"/>

                    <div>
                        <a href={"/team/" + JSON.stringify(props.team)} key={"/team/" + JSON.stringify(props.team)}>{props.team.name}</a>
                        <p><strong>University Name:</strong> <a href={"/university/" + props.team.universityid} key={"/university/" + props.team.universityid}>{props.team.universityname}</a></p>
                        <p><strong>Number of Players:</strong> {props.team.numplayers}</p>
                    </div>
                </div>
            </div>
          </>
    )
};
  
export default TeamBlock;