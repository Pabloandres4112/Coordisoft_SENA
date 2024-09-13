import React, { useState, useEffect } from 'react';
import logo from "../assets/inventarioslogo.png";
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axiosClient from '../configs/axiosClient';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Si hay un token, redirige a la página de inicio
      navigate("/home");
    }
  }, [navigate]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
        const data = { username, password };
        const response = await axiosClient.post('auth/login/', data);

        // Acceder correctamente al token
        const token = response.data.access;

        if (token) {
            // Guardar el token en localStorage
            localStorage.setItem('token', token);
            // Redirigir a la página de inicio
            navigate("/home");
        } else {
            alert("Error: Token no recibido");
        }
    } catch (error) {
        console.error('Error durante el login:', error);
        alert("Error al iniciar sesión");
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-50">
      <div className='bg-gradient-to-b from-orange-500 to-red-500 w-[45%] h-auto flex justify-center items-center'>
        <img className='w-[85%] pt-32' src="carrito.svg" alt="Carrito" />
      </div>
      <div className="flex flex-col justify-center w-full px-6 py-12 sm:py-24">
        <div className="relative w-full max-w-md mx-auto bg-white shadow-lg rounded-3xl p-8">
          <div className="text-center flex flex-col items-center">
            <img className="w-32 mb-6" src={logo} alt="logo" />
            <h4 className="mb-4 text-2xl font-semibold">Coordisoft SENA</h4>
            <p className="mb-6 text-gray-600">Por favor, ingrese a su cuenta</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  className="peer w-full rounded border border-gray-300 bg-white px-3 py-2 placeholder-transparent focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label
                  htmlFor="username"
                  className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all"
                >
                  Username
                </label>
              </div>
            </div>
            <div className="mb-6">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="peer w-full rounded border border-gray-300 bg-white px-3 py-2 placeholder-transparent focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <label
                  htmlFor="password"
                  className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all"
                >
                  Password
                </label>
              </div>
            </div>
            <div className="mb-6">
              <button
                className="w-full px-6 py-2.5 rounded bg-orange-500 text-white text-sm font-medium leading-normal shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Log in'}
              </button>
            </div>
            <div className="flex justify-between items-center mb-6">
              <a href="#!" className="text-sm text-orange-500 hover:underline">¿Has olvidado tu contraseña?</a>
              <a href="#!" className="text-sm text-orange-500 hover:underline">¿No tienes una cuenta?</a>
            </div>
            <div className="flex justify-center">
              <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#4285F4" d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" />
                  <path fill="#34A853" d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" />
                  <path fill="#FBBC05" d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" />
                  <path fill="#EB4335" d="M23.7136364,10.1333333 C27.025,10.1333333 30.0284091,11.3202667 32.3157727,13.5269333 L39.1354545,6.70773333 C34.9215909,2.7472 29.4429545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" />
                </svg>
                Inicia sesión con Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
