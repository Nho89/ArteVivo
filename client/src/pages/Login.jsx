import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/userServices';
import { useUserContext } from '../context/UserContext';
import '../pages/Login.css';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register } = useForm();
  const [loginError, setLoginError] = useState('');
  const { setUserAuth, setUser, setUserRole } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    console.log("Datos enviados:", data); 
    try {
      setIsLoading(true);
      setLoginError('');

      const response = await login(data);
      console.log('se pasa la data',response);

      if (response) {
        localStorage.setItem('token', response.access);//guardar el token
        localStorage.setItem('role', response.role_id);
        localStorage.setItem('user_id', response.user_id);

        setUserAuth(true);
        setUser(response.user_id);
        setUserRole(response.role_id);

        console.log("Rol recibido:", response.role_id);
        setIsLoading(false);

        if (response.role_id === 1 || response.role_id === 2){
          navigate(`/dashboard/profilePage/${response.user_id}`);
        } else if (response.role_id === 3){
          console.log("Redirigiendo a Superadmin...");
          navigate('/dashboard/superadminPage');
        }
      }
    } catch (error) {
      setLoginError(error.response?.data?.error || 'Error al iniciar sesión');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
        <h2>Iniciar Sesión</h2>
        {loginError && <p className="error-message">{loginError}</p>}
        <input
          disabled={isLoading}
          {...register("username", { required: true })}
          type="username"
          placeholder="Nombre de usuario"
          className="login-input"
        />
        <input
          disabled={isLoading}
          {...register("password", { required: true })}
          type="password"
          placeholder="Contraseña"
          className="login-input"
        />
        <button disabled={isLoading} type="submit" className="login-button">
          {isLoading ? 'Cargando...' : 'Acceder'}
        </button>
      </form>
    </div>
  );
};

export default Login;
