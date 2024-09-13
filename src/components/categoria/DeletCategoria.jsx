import React from "react";
import { Button } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const DeleteModal = ({ item, onClose, refreshData }) => {
  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/categoria_elemento/${item.id}/`);
      GlobalAlert.success("Categoría eliminada correctamente.");
      refreshData();
      onClose();
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      GlobalAlert.error("Hubo un error al eliminar la categoría. " + (error.response?.data?.message || "Error interno del servidor."));
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Eliminar Categoría"
      children={
        <div>
          <p>¿Estás seguro de que deseas eliminar la categoría <strong>{item.nombre_categoria}</strong>? Esta acción no se puede deshacer.</p>
        </div>
      }
      footer={() => (
        <div className="flex justify-end gap-2">
          <Button color="danger" onClick={handleDelete}>
            Eliminar
          </Button>
          <Button color="default" variant="light" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      )}
    />
  );
};

export default DeleteModal;
