// components/Course.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import "./course.css"

export default function Course({ img, name, description }) {
  return (
    <div className='main-container'>
    <div className="course-container">

      <div className="course-img-container">
        <img src={img} className="img-fluid" alt={name} />
      </div>
      <div className="course-details">
        <h5 className="course-title">{name}</h5>
        <p className="description">{description}</p>
        <Link className="course-btn link-btn">More Info → </Link>
      </div>


    </div>

    </div>
  );
}
