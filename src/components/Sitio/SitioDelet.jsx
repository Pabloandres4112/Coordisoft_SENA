import React from 'react';
import { Button } from '@nextui-org/react';
import axiosClient from '../../configs/axiosClient';
import GlobalAlert from '../componets_globals/GlobalAlert';
import GlobalModal from '../componets_globals/GlobalModal';

const SitioDelete = ({ item, onClose, refreshData }) => {
  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/sitio/${item.id}/`); // Asegúrate de que la URL de la API sea correcta
      GlobalAlert.success('Sitio eliminado correctamente.');
      refreshData();
      onClose();
    } catch (error) {
      console.error('Error al eliminar el sitio:', error);
      GlobalAlert.error('Hubo un error al eliminar el sitio.');
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Eliminar Sitio"
      footer={() => (
        <>
          <Button color="danger" onClick={handleDelete}>
            Eliminar
          </Button>
          <Button variant="light" onClick={onClose}>
            Cancelar
          </Button>
        </>
      )}
    >
      <p>¿Estás seguro de que deseas eliminar el sitio "{item.nombre_sitio}"?</p>
    </GlobalModal>
  );
};

export default SitioDelete;
