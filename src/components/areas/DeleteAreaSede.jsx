import React from "react";
import { Button } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const DeleteAreaSede = ({ item, onClose, refreshData }) => {

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/areaSede/${item.id}/`);
      GlobalAlert.success("Sede eliminada correctamente.");
      refreshData(); // Refrescar datos de la tabla
      onClose(); // Cierra el modal después de eliminar
    } catch (error) {
      console.error("Error al eliminar la sede:", error);
      GlobalAlert.error("Hubo un error al eliminar la sede. " + (error.response?.data?.message || "Error interno del servidor."));
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Eliminar Sede"
      children={
        <div>
          <p>¿Estás seguro de que deseas eliminar esta sede?</p>
        </div>
      }
      footer={(onClose) => (
        <div className="flex justify-end gap-2">
          <Button color="primary" variant="light" onClick={onClose}>
            Cancelar
          </Button>
          <Button color="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </div>
      )}
    />
  );
};

export default DeleteAreaSede;
