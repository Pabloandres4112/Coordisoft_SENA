import React, { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const UpdateModal = ({ item, onClose, refreshData }) => {
  const [CodigoUNPSC_Material, setCodigoUNPSC_Material] = useState(item.CodigoUNPSC_Material || "");
  const [nombreCategoria, setNombreCategoria] = useState(item.nombre_categoria || "");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!CodigoUNPSC_Material || !nombreCategoria) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await axiosClient.put(`/categoria_elemento/${item.id}/`, {
        CodigoUNPSC_Material,
        nombre_categoria: nombreCategoria,
      });
      GlobalAlert.success("Categoría actualizada correctamente.");
      refreshData();
      onClose();
    } catch (error) {
      console.error("Error al enviar la petición:", error);
      GlobalAlert.error("Hubo un error al actualizar la categoría. " + (error.response?.data?.message || "Error interno del servidor."));
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Actualizar Categoría"
      children={
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              label="Código UNPSC Material"
              placeholder="Ingrese el código UNPSC"
              value={CodigoUNPSC_Material}
              onChange={(e) => setCodigoUNPSC_Material(e.target.value)}
              required
            />
            <Input
              type="text"
              label="Nombre de la Categoría"
              placeholder="Ingrese el nombre de la categoría"
              value={nombreCategoria}
              onChange={(e) => setNombreCategoria(e.target.value)}
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button color="primary" type="submit">
              Enviar
            </Button>
          </div>
        </form>
      }
      footer={() => (
        <Button color="danger" variant="light" onClick={onClose}>
          Cerrar
        </Button>
      )}
    />
  );
};

export default UpdateModal;
