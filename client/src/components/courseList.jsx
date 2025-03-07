// components/CourseList.jsx

import React, { useEffect, useState } from 'react';
import { getCourses } from '../services/courseServices'; 
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
      <div className="d-flex flex-wrap justify-content-center">
        {courses.map((course) => (
          <Course
            key={course.id}
            img={course.url}
            name={course.name}
            description={course.description}
          />
        ))}
      </div>
    </div>
  );
}
