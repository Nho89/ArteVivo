import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useUserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../services/userServices.js';
import './Register.css'; 
import { getCourses } from '../services/courseServices.js';
import ImgForm from '../assets/img/ImgForm.png';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const { register, getValues, formState: { errors }, handleSubmit } = useForm();
  const { setUserAuth, setUser, setUserRole } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
  getCourses() 
    .then(response => {
      console.log(response);
      setCourses(response);
    })
    .catch(error => console.error('Error al obtener los cursos:', error));
}, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const newUser = {
        ...data,
        role: 1, 
        enrollment_status: "active",
        // course: 2,
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
  };

  return (
    <>
    <div className='titleForm'>
      <h2 className='title_form1'>REGISTRO</h2>
      <h2 className='title_form2'>ESTUDIANTES</h2>
    </div>
    
    <div className="register-container">
      
      <div className="register-content">
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          

          <div className="input-group">
            <label>Nombre de usuario</label>
            <input disabled={isLoading} type="text" placeholder="Nombre de usuario" {...register('username', { maxLength: 50 })} />
            {errors.username?.type === "maxLength" && <p>Máximo 50 caracteres</p>}
          </div>
          <div className="input-group">
          <label>Nombre</label>
          <input disabled={isLoading} type="text" placeholder="Nombre" {...register('first_name', { maxLength: 50 })} />
          {errors.lastname?.type === "maxLength" && <p>Máximo 50 caracteres</p>}
        </div>
          <div className="input-group">
          <label>Apellido</label>
          <input disabled={isLoading} type="text" placeholder="Apellido" {...register('last_name', { maxLength: 50 })} />
          {errors.lastname?.type === "maxLength" && <p>Máximo 50 caracteres</p>}
        </div>
          <div className="input-group">
            <label>Email</label>
            <input disabled={isLoading} type="email" placeholder="Email" {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} required />
            {errors.email && <p>Email inválido.</p>}
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input disabled={isLoading} type="password" placeholder="Contraseña"
              {...register('password', { required: true, pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,50}$/ })} required />
            {errors.password?.type === "pattern" && <p>Debe tener 8 caracteres, una mayúscula, un número y un símbolo.</p>}
          </div>
          <p className='text_form'>Ya tienes cuenta? <a href="./login">Inicia Sesión</a></p>
          <p className='text_form'><a href=""></a>Olvidé mi contraseña</p>
          <button className="register-button" disabled={isLoading} type="submit">Registrarme</button>
          <button className="cancel-button" type="button" onClick={() => navigate('/')}>Cancelar</button>
          
        </form>

        <img className='img_form' src={ImgForm} alt="Imagen decorativa" />
      </div>
    </div>
    
    </>
    
  );
};

export default Register;
