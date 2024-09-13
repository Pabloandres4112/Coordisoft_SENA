import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import CardComponent from '../components/CardComponent';
import GlobalTable from '../components/componets_globals/GlobalTable';
import RegistroRol from '../components/Roles/ModalRole';
import ActualizarRol from '../components/Roles/UpdateRol';
import DeleteRol from '../components/Roles/DeletRol';

const Rol = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRefresh = () => {
    setRefreshTable(!refreshTable);
  };

  // Define the columns for the table
  const columns = ['id', 'name_rol', 'slug', 'description'];
  const columnNames = {
    id: 'ID',
    name_rol: 'Rol',
    slug: 'palabra clave',
    description: 'Descripción',
  };

  return (
    <main className='w-full px-7'>
      <div className='my-5 flex flex-col py-5'>
        <CardComponent title="Módulo Rol" /> {/* Corrección de "Modulo Rol" a "Módulo Rol" */}
        <div className='flex  my-3'>
          <Button auto onPress={handleOpenModal}>
            Registrar
          </Button>
        </div>
        <div className='w-full flex mt-5'>
          <input 
            type="text" 
            placeholder='Buscar roles...' 
            className='h-[40px] border-gray-400 border p-3 w-56 rounded-lg text-lg' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <GlobalTable 
          columns={columns} 
          dataEndpoint="rol/" 
          searchTerm={searchTerm} 
          updateComponent={ActualizarRol} 
          deleteComponent={DeleteRol} 
          refreshTrigger={refreshTable} 
          columnNames={columnNames}  // Pasar el mapeo de nombres de columnas
        />
        <RegistroRol 
          isOpen={isModalOpen} 
          onOpenChange={handleCloseModal} 
          onRegisterSuccess={handleRefresh} 
        />
      </div>
    </main>
  );
};

export default Rol;
