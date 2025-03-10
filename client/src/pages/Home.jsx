<<<<<<< HEAD
import courseData from "../courseData";  
import Course from "../components/Course";
import AcademySection from "../components/AcademySection";
import Header from "../components/Header";


=======
import React, { useEffect, useState } from 'react';
import Course from "../components/Course";  
import { getCourses } from "../services/courseServices";
import "./Home.css";
import AcademySection from "../components/AcademySection";
import Header from "../components/Header";
import { Link } from 'react-router-dom';
>>>>>>> dev
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
        <div className="home-container">
            <img src="https://res.cloudinary.com/artevivo/image/upload/v1741366210/Group_50_ts4z1q.png" alt="Banner" className="banner-img" />

            <AcademySection />
            <div className="container d-flex flex-column align-items-center main-container">
                {/* <h3 className="text-center main-title">Available Courses</h3> */}
                <div className="row w-100">
                {courses.map((course, index) => (
                        <div 
                            key={course.id} 
                            className={`col-md-12 mb-4 d-flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`} 
                            style={{ alignItems: "center" , gap:"30px"}}
                        >
                            <div className="course-img-container">
                                <img src={course.url} className="img-fluid course-img" alt={course.name} />
                            </div>
                            <div style={{ width: "50%", padding: "10px" }}>
                                <h5 className="course-title">{course.name}</h5>
                                <p className="description-paraf">{course.description}</p>
                                <Link className="link-btn" to={`/course_details/${course.id}`}>
                                    Ver más →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        </div>
        
    );
}
