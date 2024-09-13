import React from 'react';
import { Button } from '@nextui-org/react';
import axiosClient from '../../configs/axiosClient';
import GlobalAlert from '../componets_globals/GlobalAlert';
import GlobalModal from '../componets_globals/GlobalModal';

const DeletePrograma = ({ item, onClose, refreshData }) => {
  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/programa/${item.id}/`); // Asegúrate de que la URL de la API sea correcta
      GlobalAlert.success('Programa eliminado correctamente.');
      refreshData();
      onClose();
    } catch (error) {
      console.error('Error al eliminar el programa:', error);
      GlobalAlert.error('Hubo un error al eliminar el programa.');
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Eliminar Programa"
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
      <p>¿Estás seguro de que deseas eliminar el programa "{item.nombre_programa}"?</p>
    </GlobalModal>
  );
};

export default DeletePrograma;
