import React from "react";
import { Button } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const DeleteArea = ({ item, onClose, refreshData }) => {

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/area/${item.id}/`);
      GlobalAlert.success("Área eliminada correctamente.");
      refreshData(); // Refrescar datos de la tabla
      onClose(); // Cierra el modal después de eliminar
    } catch (error) {
      console.error("Error al eliminar el área:", error);
      GlobalAlert.error("Hubo un error al eliminar el área. " + (error.response?.data?.message || "Error interno del servidor."));
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Eliminar Área"
      children={
        <div>
          <p>¿Estás seguro de que deseas eliminar esta área?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button color="primary" variant="light" onClick={onClose}>
              Cancelar
            </Button>
            <Button color="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default DeleteArea;
