import React from 'react'
// import styles from './teamblock.module.css';
import image from '../placeholder.png';
import globalStyles from '../../pages/pages.module.css';
// import Team from '../../pages/teamsanduniversities/team/team';

const TeamBlock = (props) => {   
    if (!props.team.teamID) {
        throw new Error ("ERROR: No team id.");
    }

    if (!props.team.description) {
        throw new Error ("ERROR: No team name.");
    }

    // if (!props.team.universityName) {
    //     throw new Error ("ERROR: No university name.");
    // }

    if (!props.team.universityID) {
        throw new Error ("ERROR: No university id.");
    }

    // if (!props.team.players) {
    //     throw new Error ("ERROR: No number of players set.");
    // }

    return (
          <>
            <div className={globalStyles.block}>
                <div className={globalStyles.flex}>
                    <img className={globalStyles.img} src={image} alt="Placeholder"/>

                    <div>
                        <a className={globalStyles.text} href={"/team/" + props.team.teamID} key={"/team/" + props.team.teamID} >{props.team.description}</a>
                         <p className={globalStyles.sub_text}><strong>University Name:</strong> <a href={"/university/" + props.team.universityID} key={"/university/" + props.team.universityID}>{props.team.universityName}</a></p>
                        {/* <p className={globalStyles.sub_text}><strong>Number of Players:</strong> {props.team.players.length}</p> */}
                    </div>
                </div>
            </div>
          </>
    )
};
  
export default TeamBlock;