import React, { useState, useEffect } from "react";
import { Button, Select, SelectItem, Input } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const UpdateSede = ({ item, onClose, refreshData }) => {
  const [nombreSede, setNombreSede] = useState(item.nombre_sede || "");
  const [direccionSede, setDireccionSede] = useState(item.direccion_sede || "");
  const [centros, setCentros] = useState([]);
  const [selectedCentro, setSelectedCentro] = useState(item.centro_sede?.id || null); // Aquí debe ser el ID del centro
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCentros = async () => {
      try {
        const response = await axiosClient.get("/centro/");
        setCentros(response.data);
      } catch (error) {
        console.error("Error al obtener los centros:", error);
        GlobalAlert.error("Hubo un error al obtener los centros.");
      }
    };

    fetchCentros();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!nombreSede || !selectedCentro || !direccionSede) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await axiosClient.put(`/sede/${item.id}/`, {
        nombre_sede: nombreSede,
        centro_sede: selectedCentro,  // Enviar el ID del centro seleccionado
        direccion_sede: direccionSede
      });
      console.log("Respuesta del servidor:", response.data);
      GlobalAlert.success("Sede actualizada correctamente.");
      refreshData();
      onClose();
    } catch (error) {
      console.error("Error al enviar la petición:", error);
      GlobalAlert.error("Hubo un error al actualizar la sede. " + (error.response?.data?.message || "Error interno del servidor."));
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Actualizar Sede"
      children={
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              label="Nombre de la Sede"
              placeholder="Ingrese el nombre de la sede"
              value={nombreSede}
              onChange={(e) => setNombreSede(e.target.value)}
              required
            />
            <Select
              label="Selecciona un centro"
              placeholder="Seleccione un centro"
              value={selectedCentro}
              onChange={(e) => setSelectedCentro(Number(e.target.value))}  // Convertir a número
              required
            >
              {centros.map((centro) => (
                <SelectItem key={centro.id} value={centro.id}>
                  {centro.nombre}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="text"
              label="Dirección de la Sede"
              placeholder="Ingrese la dirección de la sede"
              value={direccionSede}
              onChange={(e) => setDireccionSede(e.target.value)}
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

export default UpdateSede;
