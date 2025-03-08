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
                console.log('Datos del usuario:', data);
                setUserData(data);
                setUser(data);
                setUserRole(data.role);
                setLoading(false);
                setCoursesData(data.courses || []);
                setBooksData(data.books || []);
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
          console.log('Cursos obtenidos:', data);
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
          console.log('Libros:', data);
          setBooksData(data);
        } catch (error) {
          setError("Error al obtener los libros");
        }
      };fetchBooksData();
    }, []);
    const handleEnroll = async (courseId) => {
        
        console.log('Libros:', userData.books);

        try {
            await enrollInCourse(user.id, courseId);
            const updatedUserData = await getUserById(user.id);
            setUserData(updatedUserData);
            setCoursesData(updatedUserData.courses);
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
                                        {userData.courses && userData.courses.length > 0 ? (
                                                userData.courses.map(course => (
                                            <tr key={course.id}>
                                                <td>{course.name}</td>
                                                <td>{course.date}</td>
                                                <td>{course.status}</td>
                                                <td>
                                                    <button className="unenroll-button" onClick={() => handleUnenroll(course.id)}>Anular Inscripción</button>
                                                    <button className="submit-task-button">Enviar Tarea</button>
                                                </td>
                                            </tr>
                                        ))) : (
                                            <tr><td colSpan="4">No tienes cursos inscritos.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                                <button className="enroll-button" onClick={() => handleEnroll(course.id)}>Inscribirme a un Curso</button>
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
                                        {userData.student_books && userData.student_books.map(book => (
                                            <tr key={book.id}>
                                                <td>{book.book.title}</td>
                                                <td>{book.borrow_date}</td>
                                                <td>{book.due_date}</td>
                                                <td>{book.status}</td>
                                                <td>{book.mandatory ? 'Sí' : 'No'}</td>
                                                <td>
                                                    <button className="return-book-button" onClick={() => handleReturnBook(book.book.id)}>Devolver</button>
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