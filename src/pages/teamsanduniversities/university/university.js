import React from 'react'
import image from '../../../components/placeholder.png';
import { useParams } from "react-router-dom";
import globalStyles from '../../pages.module.css';
import styles from './university.module.css';

import Header from '../../../components/header/header';

const University = (props) => {   

  let { id } = useParams();

    return (
          <>
            <Header 
              name={id}
            />
          </>
    )
};
  
export default University;