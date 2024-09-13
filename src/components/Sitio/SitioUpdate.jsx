import React, { useState, useEffect } from 'react';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import axiosClient from '../../configs/axiosClient';
import GlobalAlert from '../componets_globals/GlobalAlert';
import GlobalModal from '../componets_globals/GlobalModal';

const UpdateSitio = ({ isOpen, onOpenChange, item, onUpdate }) => {
  if (!item) {
    return null; // O manejar el caso de forma diferente
  }

  const [formData, setFormData] = useState({
    nombre_sitio: item.nombre_sitio || "",
    ubicacion: item.ubicacion || "",
    FichaTecnica: item.FichaTecnica || "",
    tipo_sitio: item.tipo_sitio?.id || "",
    persona_encargada: item.persona_encargada?.id || "" // Agregar el campo de usuario encargado
  });

  const [tiposSitioOptions, setTiposSitioOptions] = useState([]);
  const [personasOptions, setPersonasOptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [tiposResponse, personasResponse] = await Promise.all([
          axiosClient.get('/tipo_sitio/'),
          axiosClient.get('/auth/users/')
        ]);

        setTiposSitioOptions(tiposResponse.data);
        setPersonasOptions(personasResponse.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        GlobalAlert.error("Hubo un error al obtener los datos.");
      }
    };

    fetchOptions();
  }, []);

  const handleSelectChange = (name, event) => {
    const selectedValue = event.target.value;
    console.log(`ID seleccionado para ${name}:`, selectedValue);
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'persona_encargada' || name === 'tipo_sitio' ? Number(selectedValue) : selectedValue
    }));
  };


const handleInputChange = (name, value) => {
  setFormData((prevData) => ({
    ...prevData,
    [name]: value
  }));
};


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { nombre_sitio, ubicacion, FichaTecnica, tipo_sitio, persona_encargada } = formData;
    
    // Agrega un log para ver los datos que estás enviando
    console.log("Datos que se están enviando:", {
      nombre_sitio,
      ubicacion,
      FichaTecnica,
      tipo_sitio: tipo_sitio ,
      persona_encargada: persona_encargada
    });
  
    try {
      // Enviar los datos, asegurándote de que persona_encargada y tipo_sitio no sean undefined
      await axiosClient.put(`/sitio/${item.id}/`, {
        nombre_sitio,
        ubicacion,
        FichaTecnica,
        tipo_sitio: tipo_sitio ,
        persona_encargada: persona_encargada 
      });
      GlobalAlert.success("Sitio actualizado correctamente.");
      onUpdate(); // Actualiza la tabla en la página principal
      onOpenChange(false); // Cierra el modal
    } catch (error) {
      console.error("Error al actualizar el sitio:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Error al actualizar el sitio.");
      } else {
        setError("Hubo un error al actualizar el sitio.");
      }
    }
  };
  
  
  
  
  
  return (
    <GlobalModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Actualizar Sitio"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          {/* Selector de Persona encargada */}
          <Select
          label="Persona Encargada"
          placeholder="Seleccione la persona encargada"
          onChange={(e) => handleSelectChange('persona_encargada', e)} // Pasar el evento completo
          value={formData.persona_encargada}
          required
        >
          {personasOptions.map((persona) => (
            <SelectItem key={persona.id} value={persona.id.toString()}>
              {persona.first_name} {persona.last_name}
            </SelectItem>
          ))}
        </Select>

          {/* Input de Nombre del sitio */}
          <Input
            label="Nombre del Sitio"
            placeholder="Escribe el nombre del sitio"
            value={formData.nombre_sitio}
            onChange={(e) => handleInputChange('nombre_sitio', e.target.value)}
            required
          />

          {/* Selector de Tipo de sitio */}
          <Select
            label="Tipo de Sitio"
            placeholder="Seleccione el tipo de sitio"
            onChange={(value) => handleSelectChange('tipo_sitio', value)}
            value={formData.tipo_sitio}
            required
          >
            {tiposSitioOptions.map((tipo) => (
              <SelectItem key={tipo.id} value={tipo.id.toString()}>
                {tipo.tipo_movimiento}
              </SelectItem>
            ))}
          </Select>

          {/* Input de Ubicación */}
          <Input
            label="Ubicación"
            placeholder="Escribe la ubicación"
            value={formData.ubicacion}
            onChange={(e) => handleInputChange('ubicacion', e.target.value)}
            required
          />

          {/* Input de Ficha técnica */}
          <Input
            label="Ficha Técnica"
            placeholder="Escribe la ficha técnica"
            value={formData.FichaTecnica}
            onChange={(e) => handleInputChange('FichaTecnica', e.target.value)}
            required
          />

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

export default UpdateSitio;
