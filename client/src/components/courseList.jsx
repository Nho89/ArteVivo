import React, { useEffect, useState } from 'react';
import { getCourses } from '../services/courseServices';
import "./CourseList.css"
import Course from './Course';


export default function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="course-list">
      <div className="d-flex flex-wrap justify-content-between">
        {courses.map((course, index) => (
          <div
            className={`course-item ${index % 2 === 0 ? 'right' : 'left'}`}
            key={course.id}
          >
            <Course
              id={course.id} 
              img={course.url}
              name={course.name}
              description={course.description}
              
            />
          </div>
        ))}
      </div>
    </div>
  );
}
