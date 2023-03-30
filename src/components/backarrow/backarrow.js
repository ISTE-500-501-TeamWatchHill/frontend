import globalStyles from '../../pages/pages.module.css';
import styles from './backarrow.module.css';
import { FaArrowLeft } from 'react-icons/fa';

const BackArrow = (props) => { 
    if (!props.text) {
        throw new Error ("ERROR: No back information.");
    }

    if (!props.route) {
        throw new Error ("ERROR: No route information.");
    }
    
    return (
        <>
            <a href={props.route}> 
                <div className={styles.flex}>
                    <FaArrowLeft /> 
                    <p className={globalStyles.sub_text}>{props.text}</p>
                </div>
            </a>
        </>
    )
};
  
export default BackArrow;