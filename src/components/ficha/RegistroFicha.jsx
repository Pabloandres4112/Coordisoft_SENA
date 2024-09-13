import React, { useState, useEffect } from "react";
import { Button, Input, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

export const RegistroFicha = ({ onRegisterSuccess }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idFicha, setIdFicha] = useState("");
  const [personaFichaId, setPersonaFichaId] = useState("");
  const [programaId, setProgramaId] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axiosClient.get("/auth/users/");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        GlobalAlert.error("Error al obtener los usuarios.");
      }
    };

    const fetchProgramas = async () => {
      try {
        const response = await axiosClient.get("/programa/");
        setProgramas(response.data);
      } catch (error) {
        console.error("Error al obtener los programas:", error);
        GlobalAlert.error("Error al obtener los programas.");
      }
    };

    fetchUsuarios();
    fetchProgramas();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!idFicha || !personaFichaId || !programaId || !slug) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const personaId = parseInt(personaFichaId, 10);
    const programaIdNumber = parseInt(programaId, 10);

    if (isNaN(personaId) || isNaN(programaIdNumber)) {
      setError("Seleccione valores válidos para Persona Ficha y Programa.");
      return;
    }

    try {
      await axiosClient.post("/ficha/", {
        id_ficha: idFicha,
        persona_ficha: personaId,
        programa: programaIdNumber,
        slug,
      });

      GlobalAlert.success("Ficha registrada correctamente.");
      setIdFicha("");
      setPersonaFichaId("");
      setProgramaId("");
      setSlug("");
      onClose();
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (error) {
      console.error("Error al registrar la ficha:", error);
      const errorMsg =
        error.response?.data?.detail || "Hubo un error al registrar la ficha.";
      setError(errorMsg);
      GlobalAlert.error(errorMsg);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen} className="max-w-fit">
        Registrar Ficha
      </Button>
      <GlobalModal
        isOpen={isOpen}
        onOpenChange={onClose}
        title="Formulario de Registro de Ficha"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              label="ID de la Ficha"
              placeholder="Ingrese el ID de la ficha"
              value={idFicha}
              onChange={(e) => setIdFicha(e.target.value)}
              required
            />
            <Select
              label="Seleccione la Persona Ficha"
              placeholder="Seleccione un usuario"
              value={personaFichaId}
              onChange={(e) => setPersonaFichaId(e.target.value)}
              required
            >
              {usuarios.map((usuario) => (
                <SelectItem key={usuario.id} value={usuario.id.toString()}>
                  {usuario.username}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Seleccione el Programa"
              placeholder="Seleccione un programa"
              value={programaId}
              onChange={(e) => setProgramaId(e.target.value)}
              required
            >
              {programas.map((programa) => (
                <SelectItem key={programa.id} value={programa.id.toString()}>
                  {programa.nombre_programa}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="text"
              label="Slug"
              placeholder="Ingrese un slug único"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button color="primary" type="submit">
              Enviar
            </Button>
          </div>
        </form>
        <Button color="danger" variant="light" onClick={onClose}>
          Cerrar
        </Button>
      </GlobalModal>
    </div>
  );
};

export default RegistroFicha;
