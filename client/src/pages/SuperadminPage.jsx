import React, { useState, useEffect } from 'react';
import { getUsersByRole, deleteUser, updateUser } from '../services/userServices';
import { getCourses } from '../services/courseServices';
import { getAllBooks } from '../services/booksServices';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './SuperadminPage.css';
const SuperadminPage = () => {
    const { user, setUser, userAuth, setUserAuth, userRole, setUserRole } = useUserContext();
    const navigate = useNavigate(); 
    const [selectedRole, setSelectedRole] = useState(null);
    const [userData, setUserData] = useState([]);
    const [coursesData, setCoursesData] = useState([]);
    const [booksData, setBooksData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingUserId, setEditingUserId] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: ''
    });
    const fetchData = async (role) => {
        setLoading(true);
        setError('');
        try {
            if (role === 1 || role === 2 || role === 3) {
                const users = await getUsersByRole(role);
                setUserData(users.filter(user => user.role === role));
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
    
    const handleEditUser = (user) => {
        setEditingUserId(user.id);
        setFormData({
            username: user.username,
            email: user.email,
            role: user.role
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await updateUser(editingUserId, formData);
            setUserData(userData.map(user => (user.id === editingUserId ? { ...user, ...formData } : user)));
            setEditingUserId(null);
        } catch (err) {
            console.error('Error actualizando usuario', err);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user_id');
        setUserAuth(false);
        setUser(null);
        setUserRole(null);
        navigate('/');
    };
    return (
        <div className='panel_admin'>
            <div className='list_panel'><ul>
                <li onClick={() => handleRoleClick(1)}>Alumnos</li>
                <li onClick={() => handleRoleClick(2)}>Profesores</li>
                <li onClick={() => handleRoleClick(3)}>Administradores</li>
                <li onClick={() => handleRoleClick('books')}>Libros</li>
                <li onClick={() => handleRoleClick('courses')}>Cursos</li>
            </ul></div>
            
            <div className='panel_main'>

                <h2>Panel de <br />Administración</h2>
                <p>Administradores</p>
                {loading && <p>Cargando...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button onClick={handleLogout}>Cerrar Sesión</button>
                {selectedRole && [1, 2, 3].includes(selectedRole) && (
                    <table border="1" className='data_table'>
                        <thead>
                            <tr>
                                <th>Rol</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.role === 1 ? 'Estudiante' : 
                                        user.role === 2 ? 'Profesor' : 
                                        user.role === 3 ? 'Administrador' : 'Rol desconocido'}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {editingUserId === user.id ? (
                                            <form onSubmit={handleUpdateUser}>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                                <select
                                                    name="role"
                                                    value={formData.role}
                                                    onChange={handleChange}
                                                >
                                                    <option value="1">Estudiante</option>
                                                    <option value="2">Profesor</option>
                                                    <option value="3">Administrador</option>
                                                </select>
                                                <button type="submit" className='button-panel'>Guardar</button>
                                                <button type="button" className='button-panel' onClick={() => setEditingUserId(null)}>Cancelar</button>
                                            </form>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEditUser(user)}>Actualizar</button>
                                                <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {selectedRole === 'books' && (
                    <table border="1" className='data_table'>
                        <thead>
                            <tr>
                                
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {booksData.map(book => (
                                <tr key={book.id}>
                                    
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>
                                        <button>Actualizar</button>
                                        <button >Eliminar</button>
                                    </td>
                                </tr>
                                
                            ))}
                        </tbody>
                    </table>
                )}

                {selectedRole === 'courses' && (
                    <table border="1" className='data_table'>
                        <thead>
                            <tr>
                                
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coursesData.map(course => (
                                <tr key={course.id}>
                                    
                                    <td>{course.name}</td>
                                    <td>{course.description}</td>
                                    <td>
                                        <button>Actualizar</button>
                                        <button >Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default SuperadminPage;
