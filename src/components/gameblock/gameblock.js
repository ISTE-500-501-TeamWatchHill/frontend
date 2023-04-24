import React from 'react';
import styles from './gameblock.module.css';
import globalStyles from '../../pages/pages.module.css';

import image from '../../../src/assets/images/universities/rit_circle.png';
import image2 from '../../../src/assets/images/universities/cornell_circle.png';

const GameBlock = (props) => {
    if (!props.game._id) {
        throw new Error ("ERROR: No game ID.");
    }

    if (!props.game.universityID) {
        throw new Error ("ERROR: No university location.");
    }

    if (!props.game.homeTeam) {
        throw new Error ("ERROR: No home team.");
    }

    if (!props.game.awayTeam) {
        throw new Error ("ERROR: No away team.");
    }

    if (!props.game.gameTime) {
        console.log("No game time provided");
    } 

    return (
        <>
            <div className={styles.block}>
                <div className={`${styles.flexBlock} ${styles.center}`}>
                    <div>
                        {props.game.gameTime &&<p className={styles.h2}>START TIME</p>}
                        {props.game.gameTime && <p className={styles.h1}>{new Date(props.game.gameTime).toLocaleString([], { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>}
                        <br/>
                        <p className={styles.h2}>LOCATION</p>
                        <p className={styles.h1}>{props.game.locationInfo[0].name}</p>
                    </div>

                    <div className={`${styles.flex} ${styles.center}`}>
                        <div>
                            <a href={`/team/${props.game.homeTeam}`} key={`/team/${props.game.homeTeam}`} className={globalStyles.text}>{props.game.homeTeamInfo[0].description}</a>
                            <p>Home Team University</p>
                        </div>

                        <img className={styles.img} src={image} alt="Placeholder"/>

                        <div>
                            <p className={globalStyles.text}> VS </p>
                        </div>

                        <img className={styles.img} src={image2} alt="Placeholder"/>

                        <div>
                            <a href={`/team/${props.game.awayTeam}`} key={`/team/${props.game.awayTeam}`}className={globalStyles.text}>{props.game.awayTeamInfo[0].description}</a>
                            <p>Away Team University</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default GameBlock;