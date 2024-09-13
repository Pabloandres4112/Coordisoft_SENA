import React, { useState, useEffect } from "react";
import { Button, Select, SelectItem } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const UpdateAreaSede = ({ item, onClose, refreshData }) => {
  const [sedes, setSedes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [administradores, setAdministradores] = useState([]);
  const [selectedSede, setSelectedSede] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await axiosClient.get("sede/");
        setSedes(response.data);
      } catch (error) {
        console.error("Error al obtener las sedes:", error);
        GlobalAlert.error("Hubo un error al obtener las sedes.");
      }
    };

    const fetchAreas = async () => {
      try {
        const response = await axiosClient.get("/area/");
        setAreas(response.data);
      } catch (error) {
        console.error("Error al obtener las áreas:", error);
        GlobalAlert.error("Hubo un error al obtener las áreas.");
      }
    };

    const fetchAdministradores = async () => {
      try {
        const response = await axiosClient.get("/auth/users/");
        setAdministradores(response.data);
      } catch (error) {
        console.error("Error al obtener los administradores:", error);
        GlobalAlert.error("Hubo un error al obtener los administradores.");
      }
    };

    fetchSedes();
    fetchAreas();
    fetchAdministradores();
  }, []);

  // Set the initial values of the selected items when the modal opens
  useEffect(() => {
    if (item) {
      setSelectedSede(item.sede_area || "");
      setSelectedArea(item.area_AreaSede || "");
      setSelectedAdmin(item.persona_administra || "");
    }
  }, [item]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedSede || !selectedArea || !selectedAdmin) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const payload = {
        sede_area: selectedSede,
        area_AreaSede: selectedArea,
        persona_administra: selectedAdmin,
      };

      console.log("Enviando payload:", payload);

      if (!item.id) {
        setError("El ID del área sede no está definido.");
        return;
      }

      const response = await axiosClient.put(`/areaSede/${item.id}/`, payload);
      console.log("Respuesta del servidor:", response.data);
      GlobalAlert.success("Área-Sede actualizada correctamente.");
      refreshData();
      onClose(); // Cierra el modal después de enviar la petición
    } catch (error) {
      console.error("Error al actualizar el área sede:", error);
      GlobalAlert.error("Hubo un error al actualizar el Área-Sede.");
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Actualizar Área-Sede"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Select
          label="Selecciona una sede"
          placeholder="Seleccione una sede"
          value={selectedSede}
          onChange={(e) => setSelectedSede(e.target.value)}
          className="w-full"
          required
        >
          {sedes.map((sede) => (
            <SelectItem key={sede.id} value={sede.id}>
              {sede.nombre_sede}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Selecciona un área"
          placeholder="Seleccione un área"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="w-full"
          required
        >
          {areas.map((area) => (
            <SelectItem key={area.id} value={area.id}>
              {area.nombre_area}
            </SelectItem>
          ))}
        </Select>

        <Select
            label="Selecciona un administrador"
            placeholder="Selecciona un administrador"
            value={selectedAdmin}
            onChange={(e) => setSelectedAdmin(e.target.value)}
            className="w-full"
            required
          >
            {administradores.map((admin) => (
              <SelectItem key={admin.id} value={admin.id.toString()}>
                {admin.username}
              </SelectItem>
            ))}
          </Select>

        {error && <p className="text-red-500">{error}</p>}

        <Button color="primary" type="submit">
          Actualizar
        </Button>
      </form>
      <Button color="danger" variant="light" onPress={onClose}>
        Cerrar
      </Button>
    </GlobalModal>
  );
};

export default UpdateAreaSede;
