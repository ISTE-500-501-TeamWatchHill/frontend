import React from 'react'
import styles from './teamblock.module.css';
import image from '../placeholder.png';
import globalStyles from '../../pages/pages.module.css';
// import Team from '../../pages/teamsanduniversities/team/team';

const TeamBlock = (props) => {   
    //fix id stuff pending removal of team id 
    if (!props.team._id) {
        throw new Error ("ERROR: No team id.");
    }

    if (!props.team.description) {
        throw new Error ("ERROR: No team name.");
    }

    if (!props.team.universityName) {
        throw new Error ("ERROR: No university name.");
    }

    if (!props.team.universityID) {
        throw new Error ("ERROR: No university id.");
    }

    if (!props.team.players) {
        throw new Error ("ERROR: No number of players set.");
    }

    return (
          <>
            <div className={styles.block}>
                <div className={styles.flexBlock}>
                    <img className={styles.img} src={image} alt="Placeholder"/>

                    <div>
                        <a className={globalStyles.text} href={"/team/" + props.team._id} key={"/team/" + props.team._id} >{props.team.description}</a>
                        <p className={globalStyles.sub_text}><a href={"/university/" + props.team.universityID} key={"/university/" + props.team.universityID}>{props.team.universityName}</a></p>
                        <p className={globalStyles.sub_text}>{props.team.players.length} PLAYERS</p>
                    </div>
                </div>
            </div>
          </>
    )
};
  
export default TeamBlock;