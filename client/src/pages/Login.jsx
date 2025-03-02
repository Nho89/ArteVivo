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
    try {
      setIsLoading(true);
      setLoginError('');
      const response = await login(data);
      if (response) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.user_role);
        setUserAuth(true);
        setUser(response.user_name);
        setUserRole(response.user_role);
        navigate('/dashboard');
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
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
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
