import React from 'react';
import styles from './home.module.css';
import globalStyles from '../pages.module.css';
import Button from '../../components/button/button';
import Spacer from '../../components/spacer/spacer';
import CountdownTimer from '../../components/countdowntimer/countdowntimer';
import { useTranslation } from "react-i18next";
import firstPlacePrizeImage from '../../assets/images/firstPrize.png';
import cornellImage from '../../assets/images/universities/cornell_circle.png';
import delhiImage from '../../assets/images/universities/delhi_circle.png';
import dublinImage from '../../assets/images/universities/dublin_circle.png';
import kyotoImage from '../../assets/images/universities/kyoto_circle.png';
import pontificiaImage from '../../assets/images/universities/pontificia_circle.png';
import ritImage from '../../assets/images/universities/rit_circle.png';

const Home = () => {
    const { t } = useTranslation();

    return (
        <>
        <div className={globalStyles.background}>
            <div className={styles.home_title_section}>
                <h1 className={`${styles.home_title} ${styles.h1}`}>A New World</h1>
                <Spacer height='16px' />
                <div className={globalStyles.text}>{t("homeSubTitle.label")}</div>
                <Spacer height='42px' />
                <div><CountdownTimer /></div>
                <Spacer height='40px' />
                <div className={globalStyles.button_row}>
                    <Button name={t("learnMoreButton.label")} transparentBackground={true} link="/tournament"/>
                    <Spacer width="20px"/>
                    <Button name={t("registerButton.label")} link="/register"/>
                </div>
            </div>

            <div className={`${globalStyles.thintext_margin} ${globalStyles.margin8_top_bottom} ${globalStyles.center_text}`}>
                <h3 className={globalStyles.headline_text}>{t("homeTournamentExplanationTitle.label")}</h3>

                <p className={`${globalStyles.green_bar} ${globalStyles.sub_header_spacer}`}>____</p>

                <p className={`${globalStyles.p} ${globalStyles.text} ${globalStyles.sub_text_spacer}`}>{t("homeTournamentExplanationp1.label")}</p>
                <p className={`${globalStyles.p} ${globalStyles.text} ${globalStyles.sub_text_spacer}`}>{t("homeTournamentExplanationp2.label")}</p>
                <p className={`${globalStyles.p} ${globalStyles.text} ${globalStyles.margin20_bottom}`}>{t("homeTournamentExplanationp3.label")}</p>
            
                <h3 className={globalStyles.headline_text}>{t("homeTournamentPrizeTitle.label")}</h3>

                <p className={`${globalStyles.green_bar} ${globalStyles.sub_header_spacer}`}>____</p>

                <p className={`${globalStyles.p} ${globalStyles.text}`}>{t("homePrizeExplanation.label")}</p>

                <div className={`${globalStyles.green_box} ${globalStyles.margin8_top} ${globalStyles.margin20_bottom}`}>
                    <img className={styles.prizeImg} src={firstPlacePrizeImage} alt='Tournament cup'/>
                    <p className={`${globalStyles.p} ${globalStyles.text} ${styles.left_text}`}>{t("homeFirstPlace.label")}</p>
                </div>

                <h3 className={`${globalStyles.headline_text} ${globalStyles.sub_header_spacer}`}>{t("whoPlaying.label")}</h3>

                <p className={`${globalStyles.green_bar} ${globalStyles.sub_header_spacer}`}>____</p>
            </div>

            <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top}`}>
                <div className={styles.universities}>
                    <div className={styles.team_playing}>
                        <img className={styles.uni_img} src={cornellImage} alt='Cornell University Logo'/>
                        <p className={globalStyles.small_text}>Cornell University</p>
                    </div>

                    <div className={styles.team_playing}>
                        <img className={styles.uni_img} src={dublinImage} alt='University College of Dublin Logo'/>
                        <p className={globalStyles.small_text}>University College of Dublin</p>
                    </div>

                    <div className={styles.team_playing}>
                        <img className={styles.uni_img} src={delhiImage} alt='IIT Dehli Logo'/>
                        <p className={globalStyles.small_text}>IIT Delhi</p>
                    </div>

                    <div className={styles.team_playing}>
                        <img className={styles.uni_img} src={kyotoImage} alt='Kyoto University Logo'/>
                        <p className={globalStyles.small_text}>Kyoto University</p>
                    </div>

                    <div className={styles.team_playing}>
                        <img className={styles.uni_img} src={pontificiaImage} alt='Pontificia UCC Logo'/>
                        <p className={globalStyles.small_text}>Pontificia UCC</p>
                    </div>

                    <div className={styles.team_playing}>
                        <img className={styles.uni_img} src={ritImage} alt='Rochester Institute of Technology Logo'/>
                        <p className={globalStyles.small_text}>Rochester Institute of Technology</p>
                    </div>

                    
                </div>
            </div>
        </div>
        <div className={globalStyles.green_block}></div>
        </>
    )
};
  
export default Home;