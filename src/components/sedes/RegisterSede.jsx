import React, { useState, useEffect } from "react";
import { Button, Select, SelectItem, Input } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";
import { useDisclosure } from "@nextui-org/react";

export const RegisterSede = ({ onRegisterSuccess }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nombreSede, setNombreSede] = useState("");
  const [direccionSede, setDireccionSede] = useState("");
  //holallslsls
  const [centros, setCentros] = useState([]);
  const [selectedCentro, setSelectedCentro] = useState("");
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

  const handleSelectChange = (value) => {
    setSelectedCentro(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!nombreSede || !selectedCentro || !direccionSede) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      await axiosClient.post("/sede/", {
        nombre_sede: nombreSede,
        centro_sede: selectedCentro,
        direccion_sede: direccionSede
      });
      GlobalAlert.success("Sede registrada correctamente.");
      setNombreSede("");
      setSelectedCentro("");
      setDireccionSede("");
      onClose();
      if (onRegisterSuccess) onRegisterSuccess(); // Llamar la función de éxito de registro
    } catch (error) {
      console.error("Error al registrar la sede:", error);
      GlobalAlert.error("Hubo un error al registrar la sede.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen} className="max-w-fit">Registrar Sede</Button>
      <GlobalModal
        isOpen={isOpen}
        onOpenChange={onClose}
        title="Formulario de Registro de Sede"
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
                onChange={(e) => handleSelectChange(e.target.value)}
                value={selectedCentro}
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
    </div>
  );
};

export default RegisterSede;
