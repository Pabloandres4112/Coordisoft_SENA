import React from "react";
import { Button } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const DeleteTipoSitio = ({ item, onClose, refreshData }) => {

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/tipo_sitio/${item.id}/`); // Updated endpoint
      GlobalAlert.success("Tipo de sitio eliminado correctamente.");
      refreshData(); // Refrescar datos de la tabla
      onClose(); // Cierra el modal después de eliminar
    } catch (error) {
      console.error("Error al eliminar el tipo de sitio:", error);
      GlobalAlert.error("Hubo un error al eliminar el tipo de sitio. " + (error.response?.data?.message || "Error interno del servidor."));
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Eliminar Tipo de Sitio"
      children={
        <div>
          <p>¿Estás seguro de que deseas eliminar este tipo de sitio?</p>
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

export default DeleteTipoSitio;
