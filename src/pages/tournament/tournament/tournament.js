import React from 'react';
import styles from './tournament.module.css';
import globalStyles from '../../pages.module.css';
import "@fontsource/mulish";

import Spacer from '../../../components/spacer/spacer';
import Button from '../../../components/button/button';
import Header from '../../../components/header/header';

const Tournament = () => {
    
return (
      <>
        <Header 
          name="Tournament"
        />

        <div className={globalStyles.wide_subsection}>
          <h3 className={globalStyles.text}>RULES</h3>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>Registration for this tournament is limited to countries in which participation is legal. If there is a difference of opinion in interpretation of the law, Aardvark Games' legal counsel will have the final word on a Team's ability to register.</p>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>Each Team will have at least two, but no more than five, members.</p>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>The deadline for registration is midnight EDT on Monday, May 1, 2023, unless an extension for all is publicized on the tournament website.</p>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>Registration must be completed on the tournament website. </p>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>Each Team member must be currently enrolled at the college/university that the Team wishes to represent. A Team member may not play for more than one college in the 2023 tournament. Eligibility will be verified in advance with the college and team  members will be required to present valid student IDs on the day of the on-site tournament. Any questions regarding IDs on the day of the tournament will be decided by the on-site Moderator representing the college.</p>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>Any Team that fails to appear in person and on time on the day of the on-campus tournament round forfeits that game.</p>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>The dates of tournament game play and all Team match ups will be selected by Aardvark Games. If an odd number of teams register for any site, the first team to complete registration will be awarded a bye in the first round of competition. </p>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>Game play and scoring will take place according to the printed rules shipped with the game.</p>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>Tournament play will be run consistently at each location to ensure that all players are treated equally. Both players and moderators are expected to cooperate to run an orderly competition. Players and moderators must treat each other in a fair and respectful manner, following both the rules and the spirit in which those rules were created.</p>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>Aardvark Games reserves the right to alter these rules, as well as the right to interpret, modify, clarify, or otherwise issue official changes to these rules without prior notice.</p>
        </div>

        <div className={styles.sign_up_section}>
          <h3 className={globalStyles.text}>Take Home the Prize!</h3>
          <Spacer height='32px' />
          <div className={globalStyles.button_row}>
            <Button name="Login" link="/login"/>
            <Spacer width="20px"/>
            <Button name="Register for Tournament" link="/register"/>
          </div>
        </div>

        
      </>
  )
};
  
export default Tournament;