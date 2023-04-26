import React from 'react';
import { useTranslation } from "react-i18next";
import styles from './tournament.module.css';
import globalStyles from '../../pages.module.css';
import "@fontsource/mulish";

import Spacer from '../../../components/spacer/spacer';
import Button from '../../../components/button/button';

const Tournament = () => {
  const { t } = useTranslation();
    
return (
      <>
        <div className={`${globalStyles.h1_title_section} ${styles.background}`}>
            <h1 className={globalStyles.h1_title}>{t("tournamentAboutTitle.tournament")}</h1>
        </div>

        <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
          <h3 className={`${globalStyles.headline_text}`}>{t("tournamentAboutRulesTitle.tournament")}</h3>

          <p className={`${globalStyles.green_bar} ${globalStyles.sub_header_spacer}`}>__</p>

          <p className={`${globalStyles.text} ${globalStyles.sub_text_spacer}`}>{t("aboutRuleOne.tournament")}</p>

          <p className={`${globalStyles.text} ${globalStyles.sub_text_spacer}`}>{t("aboutRuleTwo.tournament")}</p>

          <p className={`${globalStyles.text} ${globalStyles.sub_text_spacer}`}>{t("aboutRuleThree.tournament")}</p>

          <p className={`${globalStyles.text} ${globalStyles.sub_text_spacer}`}>{t("aboutRuleFour.tournament")}</p>

          <p className={`${globalStyles.text} ${globalStyles.sub_text_spacer}`}>{t("aboutRuleFive.tournament")}</p>

          <p className={`${globalStyles.text} ${globalStyles.sub_text_spacer}`}>{t("aboutRuleSix.tournament")}</p>

          <p className={`${globalStyles.text} ${globalStyles.sub_text_spacer}`}>{t("aboutRuleSeven.tournament")}</p>

          <p className={`${globalStyles.text} ${globalStyles.sub_text_spacer}`}>{t("aboutRuleEight.tournament")}</p>

          <p className={`${globalStyles.text} ${globalStyles.sub_text_spacer}`}>{t("aboutRuleNine.tournament")}</p>

          <p className={`${globalStyles.text} ${globalStyles.sub_text_spacer}`}>{t("aboutRuleTen.tournament")}</p>
        </div>

        <div className={styles.sign_up_section}>
          <h3 className={`${globalStyles.headline_text} ${globalStyles.white} ${globalStyles.sub_header_spacer}`}>{t("aboutPrize.tournament")}</h3>
          <div className={globalStyles.button_row}>
            <Button name={t("loginButton.home")} link="/login"/>
            <Spacer width="20px"/>
            <Button name={t("aboutRegister.tournament")} link="/register"/>
          </div>
        </div>
      </>
  )
};
  
export default Tournament;