import React from 'react';
import { Button } from '@nextui-org/react';
import axiosClient from '../../configs/axiosClient';
import GlobalAlert from '../componets_globals/GlobalAlert';
import GlobalModal from '../componets_globals/GlobalModal';

const DeleteMunicipio = ({ item, onClose, refreshData }) => {
  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/municipios/${item.id}/`); // Asegúrate de que la URL de la API sea correcta
      GlobalAlert.success('Municipio eliminado correctamente.');
      refreshData();
      onClose();
    } catch (error) {
      console.error('Error al eliminar el municipio:', error);
      GlobalAlert.error('Hubo un error al eliminar el municipio.');
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Eliminar Municipio"
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
      <p>¿Estás seguro de que deseas eliminar el municipio "{item.nombre}"?</p>
    </GlobalModal>
  );
};

export default DeleteMunicipio;
