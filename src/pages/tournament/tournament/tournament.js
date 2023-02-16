import React from 'react';
// import styles from './tournament.module.css';
import globalStyles from '../../pages.module.css';
import "@fontsource/mulish";

import Spacer from '../../../components/spacer/spacer';

const Tournament = () => {
    
return (
      <>
        <div className={globalStyles.h1_title_section}>
          <h1 className={globalStyles.h1_title}>Tournament</h1>
        </div>

        <div className={globalStyles.subsection}>
          <h3 className={globalStyles.text}>ABOUT</h3>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.p}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis mollis varius. In a rhoncus ex. Vivamus mollis est quis molestie accumsan. Suspendisse gravida, dui non pharetra posuere, tortor ex scelerisque est, id fermentum ligula elit sit amet urna.</p>
        </div>

        <div className={globalStyles.subsection}>
          <h3 className={globalStyles.text}>RULES</h3>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.p}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis mollis varius. In a rhoncus ex. Vivamus mollis est quis molestie accumsan. Suspendisse gravida, dui non pharetra posuere, tortor ex scelerisque est, id fermentum ligula elit sit amet urna.</p>
        </div>

        <div className={globalStyles.subsection}>
          <h3 className={globalStyles.text}>HOW TO WIN</h3>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.p}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis mollis varius. In a rhoncus ex. Vivamus mollis est quis molestie accumsan. Suspendisse gravida, dui non pharetra posuere, tortor ex scelerisque est, id fermentum ligula elit sit amet urna.</p>
        </div>
      </>
  )
};
  
export default Tournament;