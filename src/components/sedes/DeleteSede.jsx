import React from "react";
import { Button } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const DeleteSede = ({ item, onClose, refreshData }) => {
  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/sede/${item.id}/`);
      GlobalAlert.success("Sede eliminada correctamente.");
      refreshData();
      onClose();
    } catch (error) {
      console.error("Error al eliminar la sede:", error);
      GlobalAlert.error("Hubo un error al eliminar la sede.");
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Eliminar Sede"
      children={
        <p>¿Estás seguro de que deseas eliminar la sede "{item.nombre_sede}"?</p>
      }
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
    />
  );
};

export default DeleteSede;
