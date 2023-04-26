import React from 'react';
import { useTranslation } from "react-i18next";
import styles from './teamblock.module.css';
import image from '../placeholder.png';
import globalStyles from '../../pages/pages.module.css';

const TeamBlock = (props) => { 
    const { t } = useTranslation();
    
    return (
          <>
            <div className={styles.block}>
                <div className={styles.flexBlock}>
                    <img className={styles.img} src={image} alt="Placeholder"/>

                    <div>
                        <a className={props.team.approvalStatus ? `${globalStyles.text} ${styles.green}` : `${styles.disabled} ${globalStyles.text}`} href={"/team/" + props.team._id} key={"/team/" + props.team._id} >{props.team.description}</a>
                        {props.team.universityInfo && <p className={globalStyles.sub_text}><a href={"/university/" + props.team.universityInfo[0].universityID} key={"/university/" + props.team.universityInfo[0].universityID}>{props.team.universityInfo[0].name}</a></p>}
                        <p className={globalStyles.sub_text}>{props.team.players.length} {t("players.teamsunis")}</p>
                        <p className={!props.team.approvalStatus ? `${styles.visible}` : `${styles.hidden}`}>{t("pendingApproval.teamsunis")}</p>
                    </div>
                </div>
            </div>
          </>
    )
};
  
export default TeamBlock;