import React from 'react';
import { Link } from 'react-router-dom';
import "./course.css";

export default function Course({ id, img, name, description }) {
  return (
    <div className="main-container">
      <div className="course-container">
        <div className="course-img-container">
          <img src={img} alt={name} />
        </div>
        <div className="course-details">
          <h5 className="course-title">{name}</h5>
          <p className="description">{description}</p>
          {/* لینک به صفحه جزئیات دوره */}
          <Link to={`/course_details/${id}`} className="course-btn link-btn">
            More Info →
          </Link>
        </div>
      </div>
    </div>
  );
}
