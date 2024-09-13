import React from "react";
import { Button } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const DeleteCentro = ({ item, onClose, refreshData }) => {
  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/centro/${item.id}/`);
      GlobalAlert.success("Centro eliminado correctamente.");
      refreshData();
      onClose();
    } catch (error) {
      console.error("Error al eliminar el centro:", error);
      GlobalAlert.error("Hubo un error al eliminar el centro.");
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Eliminar Centro"
      children={
        <p>¿Estás seguro de que deseas eliminar el centro "{item.nombre}"?</p>
      }
      footer={(onClose) => (
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

export default DeleteCentro;
