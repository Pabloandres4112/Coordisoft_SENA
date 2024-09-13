import React, { useState, useEffect } from "react";
import { Button, Select, SelectItem, Input } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";
import { useDisclosure } from "@nextui-org/react";

const UpdatePrograma = ({ item, onClose, refreshData }) => {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();
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

  useEffect(() => {
    if (item) {
      setNombrePrograma(item.nombre_programa || "");
      setSelectedArea(item.area_programa?.id?.toString() || "");
      onOpen(); // Open the modal when item changes
    }
  }, [item, onOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!nombrePrograma || !selectedArea) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const data = {
      nombre_programa: nombrePrograma,
      area_programa: parseInt(selectedArea), // Enviar solo el ID
    };

    try {
      await axiosClient.put(`/programa/${item.id}/`, data);
      GlobalAlert.success("Programa actualizado correctamente.");
      setNombrePrograma(""); // Clear the input field
      setSelectedArea(""); // Clear the selected area
      closeModal(); // Close the modal
      if (refreshData) refreshData(); // Trigger a refresh if provided
    } catch (error) {
      console.error("Error al actualizar el programa:", error.response?.data || error);
      GlobalAlert.error(`Hubo un error al actualizar el programa: ${error.response?.data?.detail || "Error desconocido"}`);
    }
  };

  return (
    <GlobalModal
      isOpen={isOpen}
      onOpenChange={closeModal} // Use closeModal to toggle the visibility
      title="Actualizar Programa"
      children={
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              label="Nombre del Programa"
              placeholder="Ingrese el nombre del programa"
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
                <SelectItem key={area.id} value={area.id.toString()}>
                  {area.nombre_area}
                </SelectItem>
              ))}
            </Select>
            {error && <p className="text-red-500">{error}</p>}
            <Button color="primary" type="submit">
              Enviar
            </Button>
          </div>
        </form>
      }
      footer={() => (
        <Button color="danger" variant="light" onClick={closeModal}>
          Cerrar
        </Button>
      )}
    />
  );
};

export default UpdatePrograma;
