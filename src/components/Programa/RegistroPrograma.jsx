import React, { useState, useEffect } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";
import { useDisclosure } from "@nextui-org/react";

export const RegistroPrograma = ({ onRegisterSuccess }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nombrePrograma, setNombrePrograma] = useState("");
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axiosClient.get("/area/");
        setAreas(response.data);
      } catch (error) {
        console.error("Error al obtener las áreas:", error);
        GlobalAlert.error("Hubo un error al obtener las áreas.");
      }
    };

    fetchAreas();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!nombrePrograma || !selectedArea) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const data = {
      nombre_programa: nombrePrograma,
      area_programa: parseInt(selectedArea), // Solo enviar el ID del área
    };

    console.log("Datos enviados:", data);

    try {
      const response = await axiosClient.post("/programa/", data);
      console.log("Respuesta del servidor:", response.data);
      GlobalAlert.success("Programa registrado correctamente.");
      setNombrePrograma("");
      setSelectedArea("");
      onClose();
      if (onRegisterSuccess) onRegisterSuccess(); // Llamar la función de éxito de registro
    } catch (error) {
      console.error("Error al registrar el programa:", error.response?.data || error);
      GlobalAlert.error("Hubo un error al registrar el programa.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen} className="max-w-fit">Registrar Programa</Button>
      <GlobalModal
        isOpen={isOpen}
        onOpenChange={onClose}
        title="Formulario de Registro de Programa"
        children={
          <form onSubmit={handleSubmit}>
            <Input
              label="Nombre del Programa"
              placeholder="Ingresa el nombre del programa"
              value={nombrePrograma}
              onChange={(e) => setNombrePrograma(e.target.value)}
              required
            />
            <Select
              label="Selecciona un área"
              placeholder="Seleccione un área"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              required
            >
              {areas.map((area) => (
                <SelectItem key={area.id} value={area.id}>
                  {area.nombre_area}
                </SelectItem>
              ))}
            </Select>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit">Registrar</Button>
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

export default RegistroPrograma;
