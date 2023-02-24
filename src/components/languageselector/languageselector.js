import React from "react";

import { useTranslation } from "react-i18next";


const LanguageSelector = () => {

  const { t, i18n } = useTranslation();


  //Creating a method to change the language onChnage from select box
  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value
    i18n.changeLanguage(languageValue);
  }


  return (
    <select className="lang-select" style={{margin: 8, width: 100}} onChange={changeLanguageHandler}>
        <option value="en" >English</option>
        <option value="es" >Spanish</option>
    </select>
  );

};


export default LanguageSelector;