import React, { useState, useEffect } from "react";
import { Button, Select, SelectItem, Input } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

export const RegisterCentro = ({ onSuccess }) => { // Recibir prop onSuccess
  const [isOpen, setIsOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [municipios, setMunicipios] = useState([]);
  const [selectedMunicipio, setSelectedMunicipio] = useState("");
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
      const response = await axiosClient.post("centro/", {
        nombre,
        municipio: selectedMunicipio,
      });
      console.log("Respuesta del servidor:", response.data);
      GlobalAlert.success("Centro registrado correctamente.");
      setNombre("");
      setSelectedMunicipio("");
      setIsOpen(false);
      if (onSuccess) onSuccess(); // Llamar a la función de éxito
    } catch (error) {
      console.error("Error al registrar el centro:", error);
      GlobalAlert.error("Hubo un error al registrar el centro.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={() => setIsOpen(true)} className="max-w-fit">Registrar Centro</Button>
      <GlobalModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Formulario de Registro de Centro"
        children={
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
        }
        footer={(onClose) => (
          <Button color="danger" variant="light" onClick={onClose}>
            Cerrar
          </Button>
        )}
      />
    </div>
  );
};
