import React from 'react';
import globalStyles from '../../pages.module.css';
import Header from '../../../components/header/header';

const Schedule = () => {
  return (
        <>
          <div className={globalStyles.background}>
            <Header 
              name="Schedule"
            />
          </div>
        </>
    )
  };
export default Schedule;