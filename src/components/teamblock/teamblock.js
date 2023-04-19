import React from 'react'
import styles from './teamblock.module.css';
import image from '../placeholder.png';
import globalStyles from '../../pages/pages.module.css';
// import Team from '../../pages/teamsanduniversities/team/team';

const TeamBlock = (props) => { 
    return (
          <>
            <div className={styles.block}>
                <div className={styles.flexBlock}>
                    <img className={styles.img} src={image} alt="Placeholder"/>

                    <div>
                        <a className={props.team.approvalStatus ? `${globalStyles.text} ${styles.green}` : `${styles.disabled} ${globalStyles.text}`} href={"/team/" + props.team._id} key={"/team/" + props.team._id} >{props.team.description}</a>
                        <p className={globalStyles.sub_text}><a href={"/university/" + props.team.universityInfo[0].universityID} key={"/university/" + props.team.universityInfo[0].universityID}>{props.team.universityInfo[0].name}</a></p>
                        <p className={globalStyles.sub_text}>{props.team.players.length} PLAYERS</p>
                        <p className={!props.team.approvalStatus ? `${styles.visible}` : `${styles.hidden}`}>Pending Approval</p>
                    </div>
                </div>
            </div>
          </>
    )
};
  
export default TeamBlock;