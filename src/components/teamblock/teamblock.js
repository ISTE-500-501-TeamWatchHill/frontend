import React from 'react'
import styles from './teamblock.module.css';
import image from '../placeholder.png';

const TeamBlock = (props) => {   
    if (!props.team.name) {
        throw new Error ("ERROR: No team name.");
    }

    if (!props.team.universityname) {
        throw new Error ("ERROR: No university name.");
    }

    if (!props.team.numplayers) {
        throw new Error ("ERROR: No number of players set.");
    }

    return (
          <>
            <div className={styles.block}>
                <div className={styles.flex}>
                    <img className={styles.img} src={image} alt="Placeholder"/>

                    <div>
                        <h2>{props.team.name}</h2>
                        <p><strong>University Name:</strong> {props.team.universityname}</p>
                        <p><strong>Number of Players:</strong> {props.team.numplayers}</p>
                    </div>
                </div>
            </div>
          </>
    )
};
  
export default TeamBlock;