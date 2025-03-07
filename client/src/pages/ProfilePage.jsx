import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { getUserById } from "../services/userServices";
import { getCourses, enrollInCourse } from "../services/courseServices";
import { getBookByStudentId } from "../services/booksServices";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { id } = useParams();
  const { user, setUser, userRole, setUserRole } = useUserContext();
  const [userData, setUserData] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Obtener datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserById(id);
        if (data) {
          setUserData(data);
          setUser(data);
          setUserRole(data.role);
        } else {
          setError("No se encontraron datos del usuario");
        }
      } catch (error) {
        setError("Error al obtener los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserData();
  }, [id, setUser, setUserRole]);

  // Obtener lista de cursos
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

  // Obtener libros del usuario (solo si user está definido)
  useEffect(() => {
    const fetchBooksData = async () => {
      if (!user || !user.id) return;
      try {
        const data = await getBookByStudentId(user.id);
        setBooksData(data);
      } catch (error) {
        console.error("Error al obtener los libros", error);
      }
    };

    if (user) fetchBooksData();
  }, [user]);

  // Función para inscribirse en un curso
  const handleEnroll = async (courseId) => {
    try {
      await enrollInCourse(user.id, courseId);
      const updatedUserData = await getUserById(user.id);
      setUserData(updatedUserData);
    } catch (error) {
      setError("Error al inscribirse en el curso");
    }
  };

  // Función para desinscribirse de un curso (pendiente de implementación)
  const handleUnenroll = async (courseId) => {
    console.log("Anular inscripción en curso", courseId);
  };

  // Función para devolver un libro (pendiente de implementación)
  const handleReturnBook = async (bookId) => {
    console.log("Devolver libro", bookId);
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-page">
      <h2 className="greeting">¡Hola {userData?.first_name}!</h2>
      {userData ? (
        <div>
          {/* Vista para estudiantes */}
          {userRole === 1 && (
            <>
              <div className="student-profile">
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
                    {userData.enrollments?.map((enrollment) => (
                      <tr key={enrollment.id}>
                        <td>{enrollment.course.name}</td>
                        <td>{enrollment.date}</td>
                        <td>{enrollment.status}</td>
                        <td>
                          <button
                            className="unenroll-button"
                            onClick={() => handleUnenroll(enrollment.course.id)}
                          >
                            Anular Inscripción
                          </button>
                          <button className="submit-task-button">
                            Enviar Tarea
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="student-profile">
                <h3>Mis libros</h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Libro</th>
                      <th>Fecha de Préstamo</th>
                      <th>Fecha Límite</th>
                      <th>Estado</th>
                      <th>Obligatorio</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booksData?.map((studentBook) => (
                      <tr key={studentBook.id}>
                        <td>{studentBook.book.title}</td>
                        <td>{studentBook.borrow_date}</td>
                        <td>{studentBook.due_date}</td>
                        <td>{studentBook.status}</td>
                        <td>{studentBook.mandatory ? "Sí" : "No"}</td>
                        <td>
                          <button
                            className="return-book-button"
                            onClick={() => handleReturnBook(studentBook.book.id)}
                          >
                            Devolver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {/* Vista para profesores */}
          {userRole === 2 && (
            <>
              <h3>Cursos Impartidos</h3>
              <ul>
                {coursesData
                  .filter((course) => course.professor?.id === userData.id)
                  .map((course) => (
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
  );
};

export default ProfilePage;
