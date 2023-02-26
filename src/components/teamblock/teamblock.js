import React from 'react'
import styles from './teamblock.module.css';
import image from '../placeholder.png';
import globalStyles from '../../pages/pages.module.css';
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
            <div className={globalStyles.block}>
                <div className={globalStyles.flex}>
                    <img className={globalStyles.img} src={image} alt="Placeholder"/>

                    <div>
                        <a className={globalStyles.text} href={"/team/" + props.team.id} key={"/team/" + props.team.id} >{props.team.name}</a>
                        <p lassName={globalStyles.sub_text}><strong>University Name:</strong> <a href={"/university/" + props.team.universityid} key={"/university/" + props.team.universityid}>{props.team.universityname}</a></p>
                        <p lassName={globalStyles.sub_text}><strong>Number of Players:</strong> {props.team.numplayers}</p>
                    </div>
                </div>
            </div>
          </>
    )
};
  
export default TeamBlock;