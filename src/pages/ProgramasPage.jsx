import React, { useState } from 'react';
import { RegisterSede } from '../components/sedes/RegisterSede';
import GlobalTable from '../components/componets_globals/GlobalTable';
import UpdateSede from '../components/sedes/UpdateSede';
import DeleteSede from '../components/sedes/DeleteSede';
import CardComponent from '../components/CardComponent';
import RegistroPrograma from '../components/Programa/RegistroPrograma';
import DeletePrograma from '../components/Programa/DelectPrograma';
import ActualizarPrograma from '../components/Programa/UpdatePrograma';
import UpdatePrograma from '../components/Programa/UpdatePrograma';

export const ProgramaPage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for searchTerm
  const [refreshTable, setRefreshTable] = useState(false);

  // Update the columns to match the API response
  const columns = [
    'id',
    'nombre_programa',
    'date_created',
    'date_modified',
  ];

  const handleRefresh = () => {
    setRefreshTable(prev => !prev); // Toggle the refresh state
  };

  return (
    <main className='w-full p-3 h-screen'>
      <div className='my-5 flex flex-col py-5'>
        <CardComponent title="Modulo Programa"/>
        <RegistroPrograma onRegisterSuccess={handleRefresh} /> {/* Pass the refresh function */}
        <div className='w-full flex mt-5'>
            <input 
              type="text" 
              placeholder='Buscar programas...' 
              className='h-[40px] border-gray-400 border p-3 w-56 rounded-lg text-lg ' 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
        </div>
        <GlobalTable 
          columns={columns} 
          dataEndpoint="programa/" 
          searchTerm={searchTerm} // Pass the search term
          updateComponent={UpdatePrograma}
          deleteComponent={DeletePrograma}
          refreshTrigger={refreshTable} // Pass the refresh trigger
        />
      </div>
    </main>
  );
};

export default ProgramaPage;
