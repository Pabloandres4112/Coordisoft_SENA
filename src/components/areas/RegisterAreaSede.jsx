import React, { useState, useEffect } from "react";
import { Button, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

export const RegisterAreaSede = ({ onRegisterSuccess }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedSede || !selectedArea || !selectedAdmin) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await axiosClient.post("areaSede/", {
        sede_area: selectedSede,
        area_AreaSede: selectedArea,
        persona_administra: selectedAdmin,
      });
      console.log("Respuesta del servidor:", response.data);
      GlobalAlert.success("Área-Sede registrada correctamente.");
      setSelectedSede("");
      setSelectedArea("");
      setSelectedAdmin("");
      onOpenChange(); // Cierra el modal después de enviar la petición
      if (onRegisterSuccess) {
        onRegisterSuccess(); // Refresca la tabla llamando a la función de éxito
      }
    } catch (error) {
      console.error("Error al enviar la petición:", error);
      GlobalAlert.error("Hubo un error al registrar el Área-Sede.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Button onPress={onOpen} className="max-w-fit">Registrar Área-Sede</Button>
      <GlobalModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Formulario de Área-Sede"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <Button color="primary" type="submit" className="w-full">
            Enviar
          </Button>
        </form>

        <div className="flex justify-end mt-4">
          <Button color="danger" variant="light" onPress={onOpenChange}>
            Cerrar
          </Button>
        </div>
      </GlobalModal>
    </div>
  );
};

export default RegisterAreaSede;
