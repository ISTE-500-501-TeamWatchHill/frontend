import React from 'react';
import styles from './gameblock.module.css';
import globalStyles from '../../pages/pages.module.css';

import image from '../placeholder.png';

const GameBlock = (props) => {
    if (!props.game.gameid) {
        throw new Error ("ERROR: No game id.");
    }

    if (!props.game.teamoneid) {
        throw new Error ("ERROR: No team one id.");
    }

    if (!props.game.teamtwoid) {
        throw new Error ("ERROR: No team two id.");
    }

    if (!props.game.datetime) {
        throw new Error ("ERROR: No game date and time.");
    }

    if (!props.game.location) {
        throw new Error ("ERROR: No game location.");
    }

    return (
        <>
            <div className={globalStyles.block}>
                <div className={`${styles.flex} ${styles.center}`}>
                    <div>
                        <p><strong>START TIME</strong></p>
                        <p>{props.game.datetime.substring(12)}</p>
                        <br/>
                        <p><strong>LOCATION</strong></p>
                        <p>{props.game.location}</p>
                    </div>

                    <div className={`${globalStyles.flex} ${styles.center}`}>
                        <div>
                            <p>TEAM</p>
                            <a href={"/team/" + props.game.teamoneid} key={"/team/" + props.game.teamoneid} className={globalStyles.text}>Team {props.game.teamoneid}</a>
                            <p>University Name Here</p>
                        </div>

                        <img className={globalStyles.img} src={image} alt="Placeholder"/>

                        <div>
                            <p className={globalStyles.text}>0 - 0</p>
                        </div>

                        <img className={globalStyles.img} src={image} alt="Placeholder"/>

                        <div>
                            <p>TEAM</p>
                            <a href={"/team/" + props.game.teamtwoid} key={"/team/" + props.game.teamtwoid}className={globalStyles.text}>Team {props.game.teamtwoid}</a>
                            <p>University Name Here</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default GameBlock;