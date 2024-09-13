import React, { useState, useEffect } from "react";
import { Button, useDisclosure, Input } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const UpdateArea = ({ item, onClose, refreshData }) => {
  const [nombreArea, setNombreArea] = useState(item.nombre_area || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (item) {
      setNombreArea(item.nombre_area);
    }
  }, [item]);

  const handleInputChange = (e) => {
    setNombreArea(e.target.value);
    if (e.target.value) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!nombreArea) {
      setError("Campo obligatorio");
      return;
    }

    try {
      const response = await axiosClient.put(`/area/${item.id}/`, {
        nombre_area: nombreArea,
      });
      console.log("Respuesta del servidor:", response.data);
      GlobalAlert.success("Área actualizada correctamente.");
      refreshData(); // Refrescar datos de la tabla
      onClose(); // Cierra el modal después de enviar la petición
    } catch (error) {
      console.error("Error al enviar la petición:", error);
      GlobalAlert.error("Hubo un error al actualizar el área. " + (error.response?.data?.message || "Error interno del servidor."));
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Actualizar Área"
      children={
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Input
              id="nombre_area"
              type="text"
              label="Nombre del Área"
              placeholder="Ingrese el nombre del área"
              value={nombreArea}
              onChange={handleInputChange}
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
        <Button color="danger" variant="light" onPress={onClose}>
          Cerrar
        </Button>
      )}
    />
  );
};

export default UpdateArea;
