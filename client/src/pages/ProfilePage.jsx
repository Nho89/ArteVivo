import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { getUserById } from '../services/userServices';
import { getCourses, enrollInCourse } from '../services/courseServices';
import { getAllBooks } from '../services/booksServices';
import './ProfilePage.css';

const ProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, setUser, userAuth, setUserAuth, userRole, setUserRole } = useUserContext();
    const [userData, setUserData] = useState(null);
    const [coursesData, setCoursesData] = useState([]);
    const [booksData, setBooksData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showEnrollDropdown, setShowEnrollDropdown] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserById(id);
                setUserData(data);
                setUser(data);
                setUserRole(data.role);
                setBooksData(data.books || []);
            } catch (error) {
                setError("Error al obtener los datos del usuario");
            } finally {
                setLoading(false);
            }
        };
        
        if (id) {
            fetchUserData();
        }
    }, [id, setUser, setUserRole]);

    useEffect(() => {
        const fetchCoursesData = async () => {
            try {
                const data = await getCourses();
                setCoursesData(data);
            } catch (error) {
                setError("Error al obtener los cursos");
            }
        };
        
        fetchCoursesData();
    }, []);

    useEffect(() => {
        const fetchBooksData = async () => {
            try {
                const data = await getAllBooks();
                setBooksData(data);
            } catch (error) {
                setError("Error al obtener los libros");
            }
        };
        
        fetchBooksData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user_id');
        setUserAuth(false);
        setUser(null);
        setUserRole(null);
        navigate('/');
    };

    const handleEnroll = async () => {
        if (!selectedCourse) return;
        try {
            await enrollInCourse(user.id, selectedCourse);
            const updatedUserData = await getUserById(user.id);
            setUserData(updatedUserData);
            setShowEnrollDropdown(false);
        } catch (error) {
            setError("Error al inscribirse en el curso");
        }
    };

    const handleReturnBook = async (bookId) => {};

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="profile-page">
            <h2 className="greeting">¡Hola {userData?.first_name}!</h2>
            {userData ? (
                <div>
                    {userRole === 1 && (
                        <>
                            <div className='student-profile'>
                                <h3>Mi aprendizaje</h3>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Curso</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userData.courses && userData.courses.length > 0 ? (
                                            userData.courses.map(course => (
                                                <tr key={course.id}>
                                                    <td>{course.course_title}</td>
                                                    <td>{course.status}</td>
                                                    <td className='actions-table'>
                                                        <button className="action-button-unenroll-button" onClick={() => handleUnenroll(course.id)}>Anular Inscripción</button>
                                                        <button className="action-button submit-task-button">Enviar Tarea</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="4">No tienes cursos inscritos.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                                <button className="action-button enroll-button" onClick={() => setShowEnrollDropdown(!showEnrollDropdown)}>Inscribirme a un Curso</button>
                                {showEnrollDropdown && (
                                    <div className="enroll-dropdown">
                                        <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
                                            <option value="">Selecciona un curso</option>
                                            {coursesData.map(course => (
                                                <option key={course.id} value={course.id}>{course.course_title}</option>
                                            ))}
                                        </select>
                                        <button className="action-button enroll-button" onClick={handleEnroll}>Inscribirse</button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    {userAuth && (
                        
                        <button className="action-button logout-button" onClick={handleLogout}>Cerrar Sesión</button>
                    )}
                </div>
            ) : (
                <p>No hay información disponible.</p>
            )}
        </div>
    );
};

export default ProfilePage;
