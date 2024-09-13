import React, { useState } from 'react';
import GlobalTable from '../components/componets_globals/GlobalTable';
import UpdateArea from '../components/areas/UpdateArea';
import DeleteArea from '../components/areas/DeleteArea'; // Asegúrate de importar correctamente el componente DeleteArea
import CardComponent from '../components/CardComponent';
import RegisTipoSitio from '../components/Sitio/RegistroTipoSitio';
import DeleteTipoSitio from '../components/Sitio/TipoSitioDelet';
import UpdateTipoSitio from '../components/Sitio/ActualizarTipoSitio';

export const Tipo_Sitio = () => {
  const columns = [
    'id',
    'nombre_tipoSitio',
    'date_created',
    'date_modified'
  ];
  const [refreshTable, setRefreshTable] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(''); 

  const columnNames = { 
    'id': 'ID',
    'nombre_tipoSitio': 'area',
    'date_created': 'Creado',
    'date_modified': 'Modificado',
  };
 
  const handleRefresh = () => {
    setRefreshTable(prev => !prev); 
  };

  return (
    <>
      <main className='w-full p-3 h-screen'>
        <div className='my-5 flex flex-col py-5'>
          <CardComponent title="Modulo Areas" />
          <RegisTipoSitio onRegisterSuccess={handleRefresh} />
          <GlobalTable 
            columns={columns} 
            dataEndpoint="tipo_sitio/" 
            updateComponent={UpdateTipoSitio} 
            deleteComponent={DeleteTipoSitio} 
            columnNames={columnNames}
            refreshTrigger={refreshTable} 
            searchTerm={searchTerm} 
          />
        </div>
      </main>
    </>
  );
};

export default Tipo_Sitio;