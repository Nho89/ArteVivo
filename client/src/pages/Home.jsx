import React, { useEffect, useState } from 'react';
import Course from "../components/Course";  
import { getCourses } from "../services/courseServices";
export default function Home() {
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
        <div className="container">
            <h1 className="text-center mt-4">Available Courses</h1>
            <div className="row d-flex flex-wrap justify-content-start">
                {courses.map(course => (
                    <div key={course.id} className="col-md-4 mb-4">
                        <Course img={course.img} name={course.name} description={course.description} id={course.id} />
                    </div>
                ))}
            </div>
        </div>
    );
}
