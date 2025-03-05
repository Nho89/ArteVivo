import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/UserContext'
import { getUserById } from '../services/userServices';

const ProfilePage = () => {
    const { user, userRole } = useUserContext(); 
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserById(user);
                setUserData(data);
            } catch (error) {
                setError("Error al obtener los datos del usuario");
            }
        };
        if (user) {
            fetchUserData();
        }
    }, [user]);
    if (loading) return <p>Cargando datos...</p>
    if (error) return <p>{error}</p>
  return (
    <div>
      <h2>Perfil de {role === 1 ? 'Estudiante' : role === 2 ? 'Profesor' : 'Administrador'}</h2>
      {userData ? (
        <div>
          <p><strong>Nombre:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          {role === 1 && <p><strong>Cursos inscritos:</strong> {userData.courses?.join(', ')}</p>}
          {role === 2 && <p><strong>Asignaturas impartidas:</strong> {userData.subjects?.join(', ')}</p>}
        </div>
      ) : (
        <p>No hay información disponible.</p>
      )}
    </div>
  )
}

export default ProfilePage