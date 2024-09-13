import React, { useState } from 'react';
import GlobalTable from '../components/componets_globals/GlobalTable';
import CardComponent from '../components/CardComponent';
import RegistroFicha from '../components/ficha/RegistroFicha';
import DeleteFicha from '../components/ficha/DelectFicha';

export const FichaPage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for searchTerm
  const [refreshTable, setRefreshTable] = useState(false); // State for triggering table refresh

  // Define the columns to match the API response
  const columns = [
    'id',
    'persona_ficha.username',
    'programa.nombre_programa',
    'programa.area_programa.nombre_area',
    'date_created',
    'date_modified',
  ];

  // Map column keys to human-readable names
  const columnNames = {
    'id': 'ID de Ficha',
    'persona_ficha.username': 'Nombre de Usuario',
    'persona_ficha.email': 'Correo Electrónico',
    'persona_ficha.Cedula_persona': 'Cédula',
    'persona_ficha.Edad_persona': 'Edad',
    'persona_ficha.Telefono_persona': 'Teléfono',
    'persona_ficha.first_name': 'Nombre',
    'persona_ficha.last_name': 'Apellido',
    'programa.nombre_programa': 'Nombre del Programa',
    'programa.area_programa.nombre_area': 'Área del Programa',
    'date_created': 'Fecha de Creación',
    'date_modified': 'Fecha de Modificación',
  };

  const handleRefresh = () => {
    setRefreshTable(prev => !prev); // Toggle the refresh state
  };

  return (
    <main className='w-full p-3 h-screen'>
      <div className='my-5 flex flex-col py-5'>
        <CardComponent title="Módulo Fichas" />
        <RegistroFicha onRegisterSuccess={handleRefresh} /> {/* Pass the refresh function */}
        <div className='w-full flex mt-5'>
          <input 
            type="text" 
            placeholder='Buscar fichas...' 
            className='h-[40px] border-gray-400 border p-3 w-56 rounded-lg text-lg' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
        </div>
        <GlobalTable 
          columns={columns} 
          dataEndpoint="ficha/" 
          searchTerm={searchTerm} // Pass the search term
          updateComponent={null} // Update component (if needed)
          deleteComponent={DeleteFicha} // Delete component (if needed)
          columnNames={columnNames} // Pass the column names
          refreshTrigger={refreshTable} // Pass the refresh trigger
        />
      </div>
    </main>
  );
};

export default FichaPage;

