import React, {useState, useEffect} from 'react'
import { useForm } from "react-hook-form";
import { useUserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../services/userServices.js';
import axios from 'axios';
const Register = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const { register, getValues, formState: { errors }, handleSubmit} = useForm();
  const { setUserAuth, setUser, setUserRole } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error al obtener los cursos:', error));
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const newUser = {
        ...data,
        role: "student", // por defecto
        enrollment_status: "active", // por defecto
      };
      const response = await userRegister(newUser);
      localStorage.setItem('token', response.token);
      setUserAuth(true);
      setUser(response.user_name);
      setUserRole(response.user_role);
      navigate('/login');
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input disabled={isLoading} type="text" placeholder="Nombre" {...register('name', { maxLength: 50 })} />
          {errors.name?.type === "maxLength" && <p>El nombre debe tener menos de 50 caracteres</p>}
        </div>

        <div>
          <input disabled={isLoading} type="text" placeholder="Apellido" {...register('lastname', { maxLength: 50 })} />
          {errors.lastname?.type === "maxLength" && <p>El apellido debe tener menos de 50 caracteres</p>}
        </div>

        <div>
          <input disabled={isLoading} type="email" placeholder="Email" {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} required />
          {errors.email && <p>El email es obligatorio y debe ser válido.</p>}
        </div>

        <div>
          <input disabled={isLoading} type="password" placeholder="Contraseña"
            {...register('password', { required: true, pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,50}$/ })} required />
          {errors.password?.type === "pattern" && <p>La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.</p>}
        </div>

        <div>
          <label htmlFor="course">Selecciona un curso:</label>
          <select id="course" disabled={isLoading} {...register('course')}>
            <option value="">-- Selecciona un curso --</option>
            {courses.length === 0 ? (
              // Cursos predeterminados si no se cargan desde el backend
              ["Pintura", "Escultura", "Historia del Arte"].map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))
            ) : (
              courses.map(course => (
                <option key={course.id} value={course.name}>{course.name}</option>
              ))
            )}
          </select>
        </div>

        <button disabled={isLoading} type="submit">Enviar</button>
        <button type="button" onClick={() => navigate('/')}>Cancelar</button>
      </form>
    </div>
  )
}

export default Register