import React, { useState, useEffect } from "react";
import { Button, Select, SelectItem, Input } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const UpdateCentro = ({ isOpen, onOpenChange, item, onUpdate }) => {
  if (!item) {
    return null; // O manejar el caso de forma diferente
  }

  const [nombre, setNombre] = useState(item.nombre || "");
  const [municipios, setMunicipios] = useState([]);
  const [selectedMunicipio, setSelectedMunicipio] = useState(item.municipio?.id || "");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const response = await axiosClient.get("municipios/");
        setMunicipios(response.data);
      } catch (error) {
        console.error("Error al obtener los municipios:", error);
        GlobalAlert.error("Hubo un error al obtener los municipios.");
      }
    };

    fetchMunicipios();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!nombre || !selectedMunicipio) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await axiosClient.put(`/centro/${item.id}/`, {
        nombre,
        municipio: selectedMunicipio,
      });
      console.log("Respuesta del servidor:", response.data);
      GlobalAlert.success("Centro actualizado correctamente.");
      onUpdate(); // Actualiza la tabla en la página principal
      onOpenChange(false); // Cierra el modal
    } catch (error) {
      console.error("Error al actualizar el centro:", error);
      GlobalAlert.error("Hubo un error al actualizar el centro.");
    }
  };

  return (
    <GlobalModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Actualizar Centro"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            label="Nombre del Centro"
            placeholder="Ingrese el nombre del centro"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <Select
            label="Selecciona un municipio"
            placeholder="Seleccione un municipio"
            value={selectedMunicipio}
            onChange={(e) => setSelectedMunicipio(e.target.value)}
            required
          >
            {municipios.map((municipio) => (
              <SelectItem key={municipio.id} value={municipio.id}>
                {municipio.nombre}
              </SelectItem>
            ))}
          </Select>
          {error && <p className="text-red-500">{error}</p>}
          <Button color="primary" type="submit">
            Enviar
          </Button>
        </div>
      </form>
      <footer>
        <Button color="danger" variant="light" onClick={() => onOpenChange(false)}>
          Cerrar
        </Button>
      </footer>
    </GlobalModal>
  );
};

export default UpdateCentro;