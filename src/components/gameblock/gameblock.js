import React from 'react';
import styles from './gameblock.module.css';
import globalStyles from '../../pages/pages.module.css';

import image from '../placeholder.png';

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

    if (!props.game.gameFinished) {
        console.log("No game status provided");
    }

    if (!props.game.gameTime) {
        console.log("No game time provided");
    }

    return (
        <>
            <div className={globalStyles.block}>
                <div className={`${styles.flex} ${styles.center}`}>
                    <div>
                        <p><strong>START TIME</strong></p>
                        <p>{props.game.gameTime}</p>
                        <br/>
                        <p><strong>LOCATION</strong></p>
                        <p>{props.game.universityID}</p>
                    </div>

                    <div className={`${globalStyles.flex} ${styles.center}`}>
                        <div>
                            <p>TEAM</p>
                            {/* Need to fix hard coded url- need team IDs in addition to names or a way to get team name by ID */}
                            <a href={"/team/1"} key={"/team/2"} className={globalStyles.text}>{props.game.homeTeam}</a>
                            <p>Home Team University</p>
                        </div>

                        <img className={globalStyles.img} src={image} alt="Placeholder"/>

                        <div>
                            <p className={globalStyles.text}>0 - 0</p>
                        </div>

                        <img className={globalStyles.img} src={image} alt="Placeholder"/>

                        <div>
                            <p>TEAM</p>
                            <a href={"/team/1"} key={"/team/1"}className={globalStyles.text}>{props.game.awayTeam}</a>
                            <p>Away Team University</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default GameBlock;