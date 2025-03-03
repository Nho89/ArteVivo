import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourses } from "../services/courseServices"; 
export default function Course() {
    const [courses, setCourses] = useState([]); 
    const [error, setError] = useState(null);   
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses(); // Llamamos al servicio para obtener los cursos
                setCourses(data); // Actualizamos el estado con los cursos obtenidos
            } catch (err) {
                setError("Error al obtener los cursos");
                console.error(err);
            } finally {
                setLoading(false); // Finalmente, cambiamos el estado de carga a falso
            }
        };

        fetchCourses(); // Llamamos a la función de obtener los cursos al iniciar el componente
    }, []);
    if (loading) {
        return <div>Cargando cursos...</div>; // Muestra un mensaje mientras carga
    }

    if (error) {
        return <div>{error}</div>; // Muestra el mensaje de error si hubo algún problema
    }
    return (
        <>
            {courses.map((course) => (
                <div key={course.id} className="card shadow-sm p-3 mb-4 bg-white rounded">
                    <img src={course.url} className="card-img-top" alt={course.name} />
                    <div className="card-body">
                        <h3 className="card-title">{course.name}</h3>
                        <p className="card-text">{course.description}</p>
                        <Link to={`/course_details/${course.id}`}>
                            <button className="btn" style={{ 
                                backgroundColor: 'transparent', 
                                border: '2px solid #A35401', 
                                padding: '10px 20px', 
                                borderRadius: '5px', 
                                color: '#A35401', 
                                fontWeight: 'bold' 
                                }}>
                                Learn More
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </>
        
    );
}
