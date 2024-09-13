import React from 'react';
import { Button } from '@nextui-org/react';
import axiosClient from '../../configs/axiosClient';
import GlobalAlert from '../componets_globals/GlobalAlert';
import GlobalModal from '../componets_globals/GlobalModal';


const DeleteRol = ({ item, onClose, refreshData }) => {
  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/rol/${item.id}/`); // Asegúrate de que la URL de la API sea correcta
      GlobalAlert.success('Rol eliminado correctamente.');
      refreshData();
      onClose();
    } catch (error) {
      console.error('Error al eliminar el rol:', error);
      GlobalAlert.error('Hubo un error al eliminar el rol.');
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Eliminar rol"
      footer={() => (
        <>
          <Button color="error"  onClick={handleDelete}>
            Eliminar
          </Button>
          <Button variant="light" onClick={onClose}>
            Cancelar
          </Button>
        </>
      )}
    >
      <p>¿Estás seguro de que deseas eliminar el rol "{item.nombre}"?</p>
    </GlobalModal>
  );
};

export default DeleteRol;
