import React, { useState } from 'react';
import { RegisterSede } from '../components/sedes/RegisterSede';
import GlobalTable from '../components/componets_globals/GlobalTable';
import UpdateSede from '../components/sedes/UpdateSede';
import DeleteSede from '../components/sedes/DeleteSede';
import CardComponent from '../components/CardComponent';

export const SedesPage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Agregar estado para searchTerm
  const [refreshTable, setRefreshTable] = useState(false);

  const columns = [
    'id',
    'nombre_sede',
    'centro_sede_nombre',
    'direccion_sede',
    'date_created',
    'date_modified',
  ];

  const handleRefresh = () => {
    setRefreshTable(prev => !prev); // Cambiar el estado para refrescar la tabla
  };

  return (
    <main className='w-full p-3 h-screen'>
      <div className='my-5 flex flex-col py-5'>
        <CardComponent title="Modulo Sedes"/>
        <RegisterSede onRegisterSuccess={handleRefresh} /> {/* Pasar la función para refrescar */}
        <div className='w-full flex  mt-5'>
            <input 
              type="text" 
              placeholder='Buscar movimientos...' 
              className='h-[40px] border-gray-400 border p-3 w-56 rounded-lg text-lg ' 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
            />
        </div>
        <GlobalTable 
          columns={columns} 
          dataEndpoint="sede/" 
          searchTerm={searchTerm} // Pasar el término de búsqueda
          updateComponent={UpdateSede}
          deleteComponent={DeleteSede}
          refreshTrigger={refreshTable} // Pasar el trigger de refresco
        />
      </div>
    </main>
  );
};

export default SedesPage;
