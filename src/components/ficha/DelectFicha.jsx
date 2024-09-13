import React from 'react';
import { Button } from '@nextui-org/react';
import axiosClient from '../../configs/axiosClient';
import GlobalAlert from '../componets_globals/GlobalAlert';
import GlobalModal from '../componets_globals/GlobalModal';

const DeleteFicha = ({ item, onClose, refreshData }) => {
  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/ficha/${item.id}/`); // Asegúrate de que la URL de la API sea correcta
      GlobalAlert.success('Ficha eliminada correctamente.');
      refreshData();
      onClose();
    } catch (error) {
      console.error('Error al eliminar la ficha:', error);
      GlobalAlert.error('Hubo un error al eliminar la ficha.');
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Eliminar Ficha"
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
      <p>¿Estás seguro de que deseas eliminar la ficha "{item.nombre_ficha}"?</p>
    </GlobalModal>
  );
};

export default DeleteFicha;
