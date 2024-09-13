import React, { useState, useEffect } from "react";
import { Button, useDisclosure, Input } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const UpdateTipoSitio = ({ item, onClose, refreshData }) => {
  const [tipoSitio, setTipoSitio] = useState(item.nombre_tipoSitio || ""); // Updated state name
  const [error, setError] = useState("");

  useEffect(() => {
    if (item) {
      setTipoSitio(item.nombre_tipoSitio);
    }
  }, [item]);

  const handleInputChange = (e) => {
    setTipoSitio(e.target.value);
    if (e.target.value) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!tipoSitio) {
      setError("Campo obligatorio");
      return;
    }

    try {
      const response = await axiosClient.put(`/tipo_sitio/${item.id}/`, { // Updated endpoint
        nombre_tipoSitio: tipoSitio, // Updated field name
      });
      console.log("Respuesta del servidor:", response.data);
      GlobalAlert.success("Tipo de sitio actualizado correctamente.");
      refreshData(); // Refrescar datos de la tabla
      onClose(); // Cierra el modal después de enviar la petición
    } catch (error) {
      console.error("Error al enviar la petición:", error);
      GlobalAlert.error("Hubo un error al actualizar el tipo de sitio. " + (error.response?.data?.message || "Error interno del servidor."));
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Actualizar Tipo de Sitio"
      children={
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Input
              id="tipo_sitio"
              type="text"
              label="Nombre del Tipo de Sitio"
              placeholder="Ingrese el nombre del tipo de sitio"
              value={tipoSitio}
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

export default UpdateTipoSitio;
