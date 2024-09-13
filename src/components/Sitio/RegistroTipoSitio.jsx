import React, { useState } from "react";
import { Button, useDisclosure, Input } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

export const RegisTipoSitio = ({ onRegisterSuccess }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tipoSitio, setTipoSitio] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setTipoSitio(e.target.value);
    if (e.target.value) {
      setError("");
    }
  };

  const handleSubmit = async (event, onClose) => {
    event.preventDefault();
    if (!tipoSitio) {
      setError("Campo obligatorio");
      return;
    }

    try {
      const response = await axiosClient.post("/tipo_sitio/", {
        nombre_tipoSitio: tipoSitio, // Correct field name here
      });
      console.log("Respuesta del servidor:", response.data);
      GlobalAlert.success("Tipo de sitio registrado correctamente.");
      setTipoSitio(""); // Limpiar el input
      onClose(); // Cierra el modal después de enviar la petición

      // Llamar al callback después del registro exitoso
      if (onRegisterSuccess) {
        onRegisterSuccess();
      }

    } catch (error) {
      console.error("Error al enviar la petición:", error);
      GlobalAlert.error("Hubo un error al registrar el tipo de sitio. " + (error.response?.data?.message || "Error interno del servidor."));
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen} className="max-w-fit">Registrar Tipo de Sitio</Button>
      <GlobalModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Formulario de Tipo de Sitio"
        children={
          <form onSubmit={(e) => handleSubmit(e, onOpenChange)}>
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
          <Button color="danger" variant="light" onPress={onOpenChange}>
            Cerrar
          </Button>
        )}
      />
    </div>
  );
};

export default RegisTipoSitio;