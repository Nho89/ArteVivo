import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import { getCourseById, enrollInCourse } from '../services/courseServices.js';
import { useUserContext } from '../context/UserContext';
import './CourseDetails.css';
const CourseDetails = () => {
  const { id } = useParams();  
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, userAuth } = useUserContext();

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

  const handleEnroll = async () => {
    if (!userAuth) {
      navigate('/login');
      return;
    }

    try {
      await enrollInCourse(user.id, id);
      alert('Inscripción exitosa');
    } catch (error) {
      console.error('Error al inscribirse en el curso:', error);
      setError('Error al inscribirse en el curso');
    }
  };



  if (!course) {
    return <div>Cargando datos del curso...</div>;
  }
  return (
    <div className="course-details-container">
      <div className="course-info">
        <h2>{course.name}</h2>
        <p>{course.description}</p>
        {course.url ? <img src={course.url} alt={course.name} className='image-course-details'/> : <p>Imagen no disponible</p>}
      </div>
      <div className="course-actions">
        <button className="btn-student" onClick={handleEnroll}>Inscribirme como Alumno</button>
        <button className="btn-professor" onClick={()=>navigate('/registerTeacher')}>Inscribirme como Profesor</button>
      </div>
    </div>
  )
}
export default CourseDetails