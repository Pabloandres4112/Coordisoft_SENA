import React, { useState, useEffect } from 'react';
import { User } from "@nextui-org/user";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input } from "@nextui-org/react";
import { SearchIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../configs/axiosClient'; // Asegúrate de que el path es correcto

export const Navbar2 = ({ title }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Inicializar el hook de navegación
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosClient.get('/auth/me');
        setUser(response.data); // Guarda los datos del usuario en el estado
        setError(null); // Resetea el error si la solicitud es exitosa
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        setError('No se pudo cargar los datos del usuario.');
        if (error.response && error.response.status === 401) {
          // Token inválido o ha expirado
          localStorage.removeItem('token');
          window.location.href = '/'; // Redirigir al login
        }
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchUserData();
  }, []);

  // Determinar si el enlace es activo
  const getLinkClasses = (path) =>
    location.pathname === path 
      ? "text-orange-500 border-b-2 border-orange-500" 
      : "text-gray-600 dark:text-gray-300";

  const handleUserClik = () =>{
    navigate('/profile');
  }
  return (
    <nav className="sticky top-0 z-20 w-full bg-white shadow-md dark:bg-neutral-800">
      <Navbar className="bg-white dark:bg-neutral-800 rounded-md">
        <NavbarContent justify="start" className="px-4">
          <NavbarBrand className="mr-4 flex items-center">
            <p className="hidden sm:block font-bold text-xl text-gray-800 dark:text-white">
              Coordisoft
            </p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4">
            <NavbarItem>
              <Link href="/home/" className={getLinkClasses('/home')}>
                Dashboard
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/movimientos" aria-current="page" className={getLinkClasses('/movimientos')}>
                Movimientos
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/usuarios" className={getLinkClasses('/usuarios')}>
                Usuarios
              </Link>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center px-4" justify="end">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[12rem] h-10",
              mainWrapper: "h-full",
              input: "text-sm text-gray-600 dark:text-gray-300",
              inputWrapper: "h-full bg-gray-100 dark:bg-gray-700",
            }}
            placeholder="Buscar en Coordisoft"
            size="sm"
            startContent={<SearchIcon size={18} className="text-gray-600 dark:text-gray-300" />}
            type="search"
          />
          <div className="ml-4">
            {loading ? (
              <div>Cargando usuario...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div> // Muestra el error si hay
            ) : (
              <User
                name={user.username} 
                description={user.name_rol || 'Usuario'} 
                avatarSrc={user.avatar || "https://via.placeholder.com/150"} 
                bordered
                as="button"
                size="sm"
                color="primary"
                onClick={handleUserClik}
              />
            )}
          </div>
        </NavbarContent>
      </Navbar>
    </nav>
  );
};

export default Navbar2;
