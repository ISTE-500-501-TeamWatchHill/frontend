import React from 'react';
import { useTranslation } from "react-i18next";
import globalStyles from '../../pages.module.css';
import styles from './boardgame.module.css';
import "@fontsource/mulish";

import boardGameImages from '../../../assets/images/boardGameImages.png';


const BoardGame = () => {
    const { t } = useTranslation();

  return (
    <>
      <div className={`${globalStyles.h1_title_section} ${styles.background}`}>
          <h1 className={globalStyles.h1_title}>{t("boardGame.boardgame")}</h1>
      </div>

      <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
          <h3 className={globalStyles.headline_text}>{t("about.boardgame")}</h3>

          <p className={`${globalStyles.green_bar} ${globalStyles.sub_header_spacer}`}>__</p>

          <p className={`${globalStyles.text} ${globalStyles.p} ${globalStyles.sub_text_spacer}`}>{t("ruleOne.boardgame")}</p>
          <p className={`${globalStyles.text} ${globalStyles.p} ${globalStyles.sub_text_spacer}`}>{t("ruleTwo.boardgame")}</p>
          <p className={`${globalStyles.text} ${globalStyles.p} ${globalStyles.sub_header_spacer}`}>{t("ruleThree.boardgame")}</p>

          <img className={globalStyles.margin20_bottom} src={boardGameImages} alt="Images of board games" />

          <h3 className={globalStyles.headline_text}>{t("roles.boardgame")}</h3>

          <p className={`${globalStyles.green_bar} ${globalStyles.sub_header_spacer}`}>__</p>

          <p className={`${globalStyles.p} ${globalStyles.text} ${globalStyles.margin8_bottom}`}>{t("roleBlurb.boardgame")}</p>

          <div className={`${styles.green_box_role} ${globalStyles.margin8_top} ${globalStyles.margin4_bottom}`}>
              <p className={styles.role}>{t("expeditionLeader.boardgame")}</p>
              <p className={`${globalStyles.sub_text} ${styles.left_text}`}>{t("expeditionLeaderBlurb.boardgame")}</p>
          </div>

          <div className={`${styles.green_box_role} ${globalStyles.margin4_bottom}`}>
              <p className={styles.role}>{t("resourceSpecialist.boardgame")}</p>
              <p className={`${globalStyles.sub_text} ${styles.left_text}`}>{t("resourceSpecialistBlurb.boardgame")}</p>
          </div>

          <div className={`${styles.green_box_role} ${globalStyles.margin4_bottom}`}>
              <p className={styles.role}>{t("scientist.boardgame")}</p>
              <p className={`${globalStyles.sub_text} ${styles.left_text}`}>{t("scientistBlurb.boardgame")}</p>
          </div>

          <div className={`${styles.green_box_role} ${globalStyles.margin4_bottom}`}>
              <p className={styles.role}>{t("technician.boardgame")}</p>
              <p className={`${globalStyles.sub_text} ${styles.left_text}`}>{t("technicianBlurb.boardgame")}</p>
          </div>

          <div className={styles.green_box_role}>
              <p className={styles.role}>{t("weapons.boardgame")}</p>
              <p className={`${globalStyles.sub_text} ${styles.left_text}`}>{t("weaponsBlurb.boardgame")}</p>
          </div>

          <p className={`${globalStyles.text} ${globalStyles.p} ${globalStyles.margin8_top}`}>{t("playtime.boardgame")}</p>
      </div>
    </>
  )
};
  
export default BoardGame;