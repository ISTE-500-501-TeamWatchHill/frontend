import React, {useState} from "react";
import Select from 'react-select';
import styles from './languageselector.module.css';
import { useTranslation } from "react-i18next";


const LanguageSelector = () => {

  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem("i18nextLng"));


  //Creating a method to change the language onChange from select box
  const changeLanguageHandler = (e) => {
    i18n.changeLanguage(e.value);
    setLanguage(e.value);
  }

  const options = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' }
  ];

  return (
    <div className={styles.flex}>
        <p>Language: </p>

        <Select
            className={styles.select}
            value={options.find(element => element.value === localStorage.getItem("i18nextLng"))}
            options={options}
            onChange={changeLanguageHandler}
        />
    </div>
  );
};


export default LanguageSelector;