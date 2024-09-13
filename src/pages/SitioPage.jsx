import React, { useState } from 'react';
import CardComponent from '../components/CardComponent';
import UpdateSitio from '../components/Sitio/SitioUpdate';
import GlobalTable from '../components/componets_globals/GlobalTable';
import RegistroSitio from '../components/Sitio/RegistroSites';

const SitioPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshTable, setRefreshTable] = useState(false);
  const [selectedSitio, setSelectedSitio] = useState(null);

  const columns = [
    'id',
    'persona_encargada.username',
    'nombre_sitio',
    'ubicacion',
    'ficha_tecnica',
    'date_created',
    'date_modified',
  ];

  const columnNames = {
    id: 'ID',
    'persona_encargada.username': 'Persona Encargada (Username)',
    nombre_sitio: 'Nombre Sitio',
    ubicacion: 'Ubicación',
    ficha_tecnica: 'Ficha Técnica',
    date_created: 'Fecha de Creación',
    date_modified: 'Fecha de Modificación',
  };

  const handleUpdate = (sitio) => setSelectedSitio(sitio);

  const handleCloseModal = () => setSelectedSitio(null);

  const handleRefresh = () => setRefreshTable(prev => !prev);

  return (
    <>
      <main className="w-full p-3 h-screen">
        <div className="my-5 flex flex-col py-5">
          <CardComponent title="Módulo Sitios" />
          <RegistroSitio onRegisterSuccess={handleRefresh} />
          <div className="w-full flex mt-5">
            <input
              type="text"
              placeholder="Buscar sitios..."
              className="h-10 border-gray-400 border p-3 w-56 rounded-lg text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <GlobalTable
            columns={columns}
            dataEndpoint="sitio/"
            searchTerm={searchTerm}
            updateComponent={({ item, onClose }) => {
              handleUpdate(item);
              onClose();
            }}
            viewComponent={null}
            refreshTrigger={refreshTable}
            columnNames={columnNames}
          />
        </div>
      </main>

      {selectedSitio && (
        <UpdateSitio
          isOpen={!!selectedSitio}
          item={selectedSitio}
          onOpenChange={handleCloseModal}
          onUpdate={handleRefresh}
        />
      )}
    </>
  );
};

export default SitioPage;
