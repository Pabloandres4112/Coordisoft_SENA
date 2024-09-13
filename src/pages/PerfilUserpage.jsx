import React, { useEffect, useState } from 'react';
import axiosClient from '../configs/axiosClient';
import UpdateUser from '../components/user/UpdateUser';

const ProfileView = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data...');
        const response = await axiosClient.get('/auth/me'); 
        console.log('User data fetched successfully:', response.data);
        setUser(response.data); // Guarda los datos del usuario en el estado
        setError(null); // Resetea el error si la solicitud es exitosa
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        if (error.response) {
          console.error('Response error:', error.response);
          setError('No se pudo cargar los datos del usuario. ' + (error.response.data?.message || 'Error del servidor.'));
        } else {
          setError('Error de red o de servidor.');
        }
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/'; // Redirigir al login si no está autenticado
        }
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Cargando perfil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-20">
     
        <div className="mb-4 ">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.first_name} {user.last_name}</h2>
          <p className="text-sm text-gray-500">{user.name_rol || 'Usuario'}</p> {/* Verifica que 'Rol_persona' esté presente sino pues lo deja como Usuario*/}
        </div>

        <div className="grid grid-cols-2 gap-4"> 
          <div>
            <p className="text-gray-600 font-semibold">Username:</p>
            <p className="text-gray-800">{user.username}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Email:</p>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Cédula:</p>
            <p className="text-gray-800">{user.Cedula_persona}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Edad:</p>
            <p className="text-gray-800">{user.Edad_persona}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Teléfono:</p>
            <p className="text-gray-800">{user.Telefono_persona}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Rol:</p>
            <p className="text-gray-800">{user.name_rol}</p>
          </div>
        </div>

  
          <UpdateUser className="mt-6 w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75" />
      
    </div>
  );
};

export default ProfileView;
