import React from 'react';
import { useTranslation } from "react-i18next";
import globalStyles from '../../pages.module.css';
import styles from './aardvarkgames.module.css';
import "@fontsource/mulish";

const AardvarkGames = () => {
  const { t } = useTranslation();
    
  return (
    <>
      <div className={`${globalStyles.h1_title_section} ${styles.background}`}>
          <h1 className={globalStyles.h1_title}>{t("aardvarkTitle.aardvarkgames")}</h1>
      </div>
      
      <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
      <h3 className={`${globalStyles.headline_text}`}>{t("aardvarkAbout.aardvarkgames")}</h3>

        <p className={`${globalStyles.green_bar} ${globalStyles.sub_header_spacer}`}>__</p>

        <p className={`${globalStyles.text} ${globalStyles.wide_p} ${globalStyles.sub_text_spacer}`}>{t("blurbOne.aardvarkgames")}</p>

        <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>{t("blurbTwo.aardvarkgames")}</p>
      </div>
    </>
  )
};
  
export default AardvarkGames;