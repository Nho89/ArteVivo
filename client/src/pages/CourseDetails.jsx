import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import { getCourseById } from '../services/courseServices.js';
import './CourseDetails.css';
const CourseDetails = () => {
  const { id } = useParams();  
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) { 
      console.log("ID del curso:", id); 
      const fetchCourse = async () => {
        try {
          console.log("Fetching course with ID:", id); 
          const courseData = await getCourseById(id);
          console.log("Course data received:", courseData); 
          setCourse(courseData);
        } catch (err) {
          console.error('Error al obtener el curso:', err);
          setError('Error al obtener el curso');
        }
      };

      fetchCourse();
    } else {
      console.error('ID del curso no encontrado');
      setError('ID del curso no disponible');
    }
  }, [id]);
  if (!course) {
    return <div>Cargando datos del curso...</div>;
  }
  return (
    <div className="course-details-container">
      <div className="course-info">
        <h2>{course.name}</h2>
        <p>{course.description}</p>
        {course.url ? <img src={course.url} alt={course.name} /> : <p>Imagen no disponible</p>}
      </div>
      <div className="course-actions">
        <p>Fecha: </p>
        <p>Disponibilidad:</p>
        <button className="btn-student">Inscribirme como Alumno</button>
        <button className="btn-professor">Inscribirme como Profesor</button>
      </div>
    </div>
  )
}
export default CourseDetails