import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContext'
import { getUserById } from '../services/userServices';
import { getCourses, enrollInCourse } from '../services/courseServices';
import { getAllBooks } from '../services/booksServices';
import './ProfilePage.css';
const ProfilePage = () => {
    const { id } = useParams();
    const { user, setUser, userRole, setUserRole } = useUserContext(); 
    const [userData, setUserData] = useState(null);
    const [coursesData, setCoursesData] = useState([]);
    const [booksData, setBooksData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserById(id);
                setUserData(data);
                setUser(data);
                setUserRole(data.role);
                setLoading(false);
            } catch (error) {
                setError("Error al obtener los datos del usuario");
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
      };fetchCoursesData();
    }, []);
    useEffect(() => {
      const fetchBooksData = async () => {
        try {
          const data = await getAllBooks();
          setBooksData(data);
        } catch (error) {
          setError("Error al obtener los libros");
        }
      };fetchBooksData();
    }, []);
    const handleEnroll = async (courseId) => {
        try {
            await enrollInCourse(user.id, courseId);
            const updatedUserData = await getUserById(user.id);
            setUserData(updatedUserData);
        } catch (error) {
            setError("Error al inscribirse en el curso");
        }
    };
    const handleUnenroll = async (courseId) =>{};

    const handleReturnBook = async (bookId) => {};
    if (loading) return <p>Cargando datos...</p>
    if (error) return <p>{error}</p>
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
                                            <th>Fecha</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userData.enrollments && userData.enrollments.map(enrollment => (
                                            <tr key={enrollment.id}>
                                                <td>{enrollment.course.name}</td>
                                                <td>{enrollment.date}</td>
                                                <td>{enrollment.status}</td>
                                                <td>
                                                    <button className="unenroll-button" onClick={() => handleUnenroll(enrollment.course.id)}>Anular Inscripción</button>
                                                    <button className="submit-task-button">Enviar Tarea</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button className="enroll-button" onClick={() => handleEnroll()}>Inscribirme a un Curso</button>
                            </div>

                            <div className='student-profile'>
                                <h3>Mis libros</h3>
                                <table className="data-table">
                                    <thead>
                                        <tr className='books-table th'>
                                            <th>Libro</th>
                                            <th>Fecha de Préstamo</th>
                                            <th>Fecha Límite de Entrega</th>
                                            <th>Estado</th>
                                            <th>Obligatorio</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userData.student_books && userData.student_books.map(studentBook => (
                                            <tr key={studentBook.id}>
                                                <td>{studentBook.book.title}</td>
                                                <td>{studentBook.borrow_date}</td>
                                                <td>{studentBook.due_date}</td>
                                                <td>{studentBook.status}</td>
                                                <td>{studentBook.mandatory ? 'Sí' : 'No'}</td>
                                                <td>
                                                    <button className="return-book-button" onClick={() => handleReturnBook(studentBook.book.id)}>Devolver</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button className="request-book-button">Pedir un libro</button>
                            </div>
                        </>
                    )}
                    {userRole === 2 && userData && coursesData && (
                        <>
                            <h3>Cursos Impartidos</h3>
                            <ul>
                                {coursesData.filter(course => course.professor?.id === userData.id).map(course => (
                                    <li key={course.id}>{course.name}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            ) : (
                <p>No hay información disponible.</p>
            )}
        </div>
  )
}

export default ProfilePage