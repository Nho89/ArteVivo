import React, { useEffect, useState } from 'react';
import Course from "../components/Course";  
import { getCourses } from "../services/courseServices";
import "./PageCourses.css";
const PageCourses = () => {
  const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses();
                setCourses(data);
            } catch (err) {
                setError("Error al obtener los cursos");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <div>Cargando cursos...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container-courses">
            <h2 className="text-center mt-4">Cursos disponibles</h2>
            <div className="content-courses">
                
                        <Course/>
                   
                
            </div>
        </div>
    );
}

export default PageCourses