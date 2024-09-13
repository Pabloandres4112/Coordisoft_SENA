// UserPage.jsx
import React, { useState } from 'react';
import GlobalTable from '../components/componets_globals/GlobalTable';
import ViewUserModal from '../components/user/ModalUser';
import CardComponent from '../components/CardComponent';
import RegisterUser from '../components/user/registerUser';

const UserPage = () => {
  const columns = ["id", "username", "email"];  // Asegúrate de que estos nombres coincidan con las claves de respuesta de la API
  const [searchTerm, setSearchTerm] = useState(''); // Agregar estado para searchTerm
  const [refreshTable, setRefreshTable] = useState(false); // Estado para desencadenar la actualización de la tabla

  const dataEndpoint = "auth/users/";

  const handleRefresh = () => {
    setRefreshTable(prev => !prev); // Cambiar el estado para refrescar la tabla
  };

  return (
    <div>
      <CardComponent title="Módulo Usuarios" />
      <RegisterUser onRegisterSuccess={handleRefresh} /> {/* Pasa la función de actualización al componente */}
      <div className='w-full flex mt-5'>
        <input 
          type="text" 
          placeholder='Buscar usuarios...' 
          className='h-[40px] border-gray-400 border p-3 w-56 rounded-lg text-lg' 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
        />
      </div>
      <GlobalTable 
        searchTerm={searchTerm} // Pasar el término de búsqueda
        refreshTrigger={refreshTable} // Pasar el trigger de refresco
        columns={columns} 
        dataEndpoint={dataEndpoint} 
        viewComponent={ViewUserModal} 
      />
    </div>
  );
};

export default UserPage;
