import React from 'react';
import styles from './home.module.css';
import globalStyles from '../pages.module.css';
import Button from '../../components/button/button';
import Spacer from '../../components/spacer/spacer';
import { useTranslation } from "react-i18next";

// TODO
    // Make dynamic
    // Make responsive
    // Change images + add alt text
    // Make dynamic timer
    // Add fonts
    // Make components out of repeated items

// TechDebt
    // Refactor dynamic text elements
const Home = () => {
    const { t, i18n } = useTranslation();

    return (
        <>
            <div className={styles.home_title_section}>
                <h1 className={`${styles.home_title} ${styles.h1}`}>A New World</h1>
                <Spacer height='16px' />
                <div className={globalStyles.text}>{t("homeSubTitle.label")}</div>
                <Spacer height='42px' />
                <div className={styles.countdown}>TODO: Dynamic countdown timer here</div>
                <Spacer height='40px' />
                <div className={globalStyles.button_row}>
                    <Button name={t("learnMoreButton.label")} transparentBackground={true} link="/tournament"/>
                    <Spacer width="20px"/>
                    <Button name={t("registerButton.label")} link="/register"/>
                </div>
            </div>

            <div className={globalStyles.subsection}>
                <h3 className={globalStyles.text}>{t("homeTournamentExplanationTitle.label")}</h3>
                <Spacer height='32px'/>
                <div className={globalStyles.text}>
                    <p className={`${globalStyles.p} ${globalStyles.text}`}>{t("homeTournamentExplanationp1.label")}</p>
                    <Spacer height='40px'/>
                    <p className={`${globalStyles.p} ${globalStyles.text}`}>{t("homeTournamentExplanationp2.label")}</p>
                    <Spacer height='40px'/>
                    <p className={`${globalStyles.p} ${globalStyles.text}`}>{t("homeTournamentExplanationp3.label")}</p>
                </div>
            </div>

            <div className={styles.third_section}>
                <img src='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Aardvark%20Games' alt='TODO'/>
                <Spacer width='75px'/>
                <p className={`${globalStyles.p} ${globalStyles.text}`}>{t("homePrizeExplanation.label")}</p>
            </div>

            <div className={styles.fourth_section}>
                <h3 className={globalStyles.text}>{t("whoPlaying.label")}</h3>
                <Spacer height='48px' />
                <div className={styles.teams_playing}>
                    <div className={styles.team_playing}>
                        <img src='https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Aardvark%20Games' alt='TODO'/>
                        <Spacer width='24px'/>
                        <div className={styles.small_text}>Cornell University</div>
                    </div>

                    <div className={styles.team_playing}>
                        <img src='https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Aardvark%20Games' alt='TODO'/>
                        <Spacer width='24px'/>
                        <div className={styles.small_text}>University College of Dublin</div>
                    </div>

                    <div className={styles.team_playing}>
                        <img src='https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Aardvark%20Games' alt='TODO'/>
                        <Spacer width='24px'/>
                        <div className={styles.small_text}>IIT Delhi</div>
                    </div>

                    <div className={styles.team_playing}>
                        <img src='https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Aardvark%20Games' alt='TODO'/>
                        <Spacer width='24px'/>
                        <div className={styles.small_text}>Kyoto University</div>
                    </div>

                    <div className={styles.team_playing}>
                        <img src='https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Aardvark%20Games' alt='TODO'/>
                        <Spacer width='24px'/>
                        <div className={styles.small_text}>Pontificia UCC</div>
                    </div>

                    <div className={styles.team_playing}>
                        <img src='https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Aardvark%20Games' alt='TODO'/>
                        <Spacer width='24px'/>
                        <div className={styles.small_text}>Rochester Institute of Technology</div>
                    </div>
                </div>
            </div>
        </>
    )
};
  
export default Home;