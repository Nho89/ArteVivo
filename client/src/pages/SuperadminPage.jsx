import React, { useState, useEffect } from 'react';
import { getUsersByRole, deleteUser } from '../services/userServices';
import { getCourses } from '../services/courseServices';
import { getAllBooks } from '../services/booksServices';
import { useUserContext } from '../context/UserContext';

const SuperadminPage = () => {
    const { user } = useUserContext(); 
    const [selectedRole, setSelectedRole] = useState(null);
    const [userData, setUserData] = useState([]);
    const [coursesData, setCoursesData] = useState([]);
    const [booksData, setBooksData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchData = async (role) => {
        setLoading(true);
        setError('');
        try {
            if (role === 1 || role === 2 || role === 3) {
                const users = await getUsersByRole(role);
                setUserData(users);
            } else if (role === 'books') {
                const books = await getAllBooks();
                setBooksData(books);
            } else if (role === 'courses') {
                const courses = await getCourses();
                setCoursesData(courses);
            }
        } catch (err) {
            console.error(err);
            setError('Error al cargar los datos.');
        } finally {
            setLoading(false);
        }
    };

    const handleRoleClick = (role) => {
        setSelectedRole(role);
        fetchData(role);
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            setUserData(userData.filter(user => user.id !== id));
        } catch (err) {
            console.error('Error eliminando usuario', err);
        }
    };

    return (
        <div>
            <ul>
                <li onClick={() => handleRoleClick(1)}>Alumnos</li>
                <li onClick={() => handleRoleClick(2)}>Profesores</li>
                <li onClick={() => handleRoleClick(3)}>Administradores</li>
                <li onClick={() => handleRoleClick('books')}>Libros</li>
                <li onClick={() => handleRoleClick('courses')}>Cursos</li>
            </ul>

            <h2>Panel de Administración</h2>
            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {selectedRole && [1, 2, 3].includes(selectedRole) && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Rol</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button>Actualizar</button>
                                    <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedRole === 'books' && (
                <ul>
                    {booksData.map(book => (
                        <li key={book.id}>{book.title}</li>
                    ))}
                </ul>
            )}

            {selectedRole === 'courses' && (
                <ul>
                    {coursesData.map(course => (
                        <li key={course.id}>{course.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SuperadminPage;
