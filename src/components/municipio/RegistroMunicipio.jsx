import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert"; // Asegúrate de que la ruta sea correcta
import GlobalModal from "../componets_globals/GlobalModal"; // Asegúrate de que la ruta sea correcta
import { useDisclosure } from "@nextui-org/react";

export const RegistroMunicipio = ({ onRegisterSuccess }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nombre, setNombre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/municipios/", { nombre });
      GlobalAlert.success("Municipio registrado exitosamente!");
      setNombre("");
      onRegisterSuccess();
    } catch (error) {
      GlobalAlert.error("Error al registrar el municipio. Por favor, intente de nuevo.");
    }
  };

  return (
    <div className="">
      <Button onClick={onOpen} className="max-w-fit">
        Registrar Municipio
      </Button>
      <GlobalModal
        isOpen={isOpen}
        onOpenChange={onClose}
        title="Formulario de Registro de Municipio"
        children={
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                label="Nombre del Municipio"
                placeholder="Ingrese el nombre del municipio"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
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
    </div>
  );
};

export default RegistroMunicipio;
