import React from 'react'
import './university.css';
import image from '../../../components/placeholder.png';
import { useParams } from "react-router-dom";

const University = (props) => {   

  let { id } = useParams();

    return (
          <>
            <div>Hello this is a university page for university with id: {id}</div>
          </>
    )
};
  
export default University;