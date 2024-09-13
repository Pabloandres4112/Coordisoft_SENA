import React, { useState } from 'react';
import { RegisterCentro } from '../components/areas/RegisterCentro';
import UpdateCentro from '../components/areas/UpdateCentro';
import DeleteCentro from '../components/areas/DeleteCentro';
import CardComponent from '../components/CardComponent';
import GlobalTable from '../components/componets_globals/GlobalTable';

export const CentrosPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshTable, setRefreshTable] = useState(false); // Estado para refrescar la tabla
  const [selectedCentro, setSelectedCentro] = useState(null); // Centro seleccionado para actualizar
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Estado para abrir/cerrar modal de actualización

  const columns = [
    'id',
    'nombre',
    'municipio_nombre',
    'date_created',
    'date_modified',
  ];
  const columnNames = {
    'id': 'ID',
    'nombre': 'Nombre Centro',
    'municipio_nombre': 'Municipio',
    'date_created': 'Fecha de Creación',
    'date_modified': 'Fecha de Modificación',
  };

  const handleRefresh = () => {
    setRefreshTable(prev => !prev); // Cambiar el estado para refrescar la tabla
  };

  // Función para manejar la apertura del modal de actualización
  const handleUpdate = (centro) => {
    setSelectedCentro(centro); // Seleccionar el centro a actualizar
    setIsUpdateModalOpen(true); // Abrir el modal
  };

  const handleCloseModal = () => {
    setIsUpdateModalOpen(false); // Cerrar el modal
    setSelectedCentro(null); // Limpiar el centro seleccionado
  };

  return (
    <>
      <main className='w-full p-3 h-screen'>
        <div className='my-5 flex flex-col py-5'>
          <CardComponent title="Modulo Centros" />
          <RegisterCentro onSuccess={handleRefresh} /> {/* Pasar función de refresco */}
          <div className='w-full flex mt-5'>
            <input 
              type="text" 
              placeholder='Buscar centros...' 
              className='h-[40px] border-gray-400 border p-3 w-56 rounded-lg text-lg' 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
            />
          </div>
          <GlobalTable 
            columns={columns} 
            columnNames={columnNames}
            dataEndpoint="centro/" 
            searchTerm={searchTerm}
            updateComponent={({ item, onClose }) => {
              setSelectedCentro(item); // Setea el ítem seleccionado
              setIsUpdateModalOpen(true); // Abre el modal de actualización
              onClose(); // Cierra el modal de la tabla si es necesario
            }} // Abrir el modal de actualización
            deleteComponent={DeleteCentro}
            refreshTrigger={refreshTable} // Pasar estado de refresco
          />
        </div>
      </main>

      {/* Modal de actualización */}
      {selectedCentro && (
        <UpdateCentro
          isOpen={isUpdateModalOpen}
          item={selectedCentro}
          onOpenChange={setIsUpdateModalOpen}
          onUpdate={handleRefresh}
        />
      )}
    </>
  );
};

export default CentrosPage;
