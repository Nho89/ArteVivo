import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from'react-router-dom';
import {login} from '../services/userServices';
import { useUserContext } from '../context/UserContext';

const Login = () => {
  const[isLoading, setIsLoading] = useState(false);
  const {handleSubmit, register, errors} = useForm();
  const [loginError, setLoginError] = useState('');
  const { setUserAuth, setUser, setUserRole } = useUserContext();
  const navigate = useNavigate();

const handleLogin = async (data) => {
  try {
    setIsLoading(true);
    setLoginError();
    const response = await login(data);
    if (response) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.user_role)
      setUserAuth(true);
      setUser(response.user_name);
      setUserRole(response.user_role);
      navigate('/dashboard');
    }
  } catch (error) {
    setLoginError(error.response.data.error);
    setIsLoading(false);
  }
}


  return (
    <>
    <div>
      <h2>Iniciar Sesión:</h2>
      <form action="" onSubmit={handleSubmit(handleLogin)}>
        <input disabled={isLoading} {...register("email", { required: true })} type="email" id="email" placeholder="Email" required className="" />

          <div className="relative">
            <input disabled={isLoading} {...register("password", { required: true })} id="password" placeholder="Contraseña" required className="" />
            
          </div>
          
          <button disabled={isLoading} type="submit" className="">
            Acceder
          </button>
      </form>
    </div>
    
    
    </>
  )
}

export default Login