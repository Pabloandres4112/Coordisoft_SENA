import React, { useState, useEffect } from 'react';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import axiosClient from '../../configs/axiosClient';
import GlobalAlert from '../componets_globals/GlobalAlert';
import GlobalModal from '../componets_globals/GlobalModal';
import { useDisclosure } from '@nextui-org/react';

const RegistroSitio = ({ onRegisterSuccess }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [formData, setFormData] = useState({
    persona_encargada: "", // Ensure this is a valid ID
    nombre_sitio: "",
    tipo_sitio: "", // Ensure this is a valid ID
    ubicacion: "",
   FichaTecnica: ""
  });
    
  const [tiposSitioOptions, setTiposSitioOptions] = useState([]);
  const [personasOptions, setPersonasOptions] = useState([]);
  const [error, setError] = useState("");

  // Cargar opciones de personas y tipos de sitio
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [personasResponse, tiposResponse] = await Promise.all([
          axiosClient.get('/auth/users/'),
          axiosClient.get('/tipo_sitio/')
        ]);

        setPersonasOptions(personasResponse.data);
        setTiposSitioOptions(tiposResponse.data);
      }catch (error) {
        console.error('Error al registrar el sitio:', error.response ? error.response.data : error.message);
        GlobalAlert.error('Hubo un error al registrar el sitio.');
      }
      
    };

    fetchOptions();
  }, []);

// const handleSelectChange = (name, event) => {
//   const selectedValue = event.target.value; // Obtener el valor seleccionado del evento
//   console.log(`ID seleccionado para ${name}:`, selectedValue); // Mostrar el ID seleccionado en la consola

//   setFormData((prevData) => ({
//     ...prevData,
//     [name]: Number(selectedValue) 
//   }));
// };
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

  // Resetear el formulario
  const resetForm = () => {
    setFormData({
      persona_encargada: "",
      nombre_sitio: "",
      tipo_sitio: "",
      ubicacion: "",
      ficha_tecnica: ""
    });
    setError("");
  };

  // Enviar formulario
  const handleSubmit = async () => {
    // Validar que todos los campos requeridos estén llenos y no sean solo espacios
    if (
      !formData.persona_encargada ||
      !formData.nombre_sitio.trim() ||
      !formData.tipo_sitio ||
      !formData.ubicacion.trim() ||
      !formData.FichaTecnica.trim()
    ) {
      setError('Por favor, completa todos los campos correctamente. No se permiten solo espacios en blanco.');
      return;
    }
  
    // Verificar que Ficha Técnica sea un número
    if (isNaN(formData.FichaTecnica)) {
      setError('La ficha técnica debe ser un número.');
      return;
    }
  
    try {
      const formattedData = {
        persona_encargada: formData.persona_encargada,
        nombre_sitio: formData.nombre_sitio.trim(), // Eliminar espacios en blanco
        tipo_sitio: formData.tipo_sitio,
        ubicacion: formData.ubicacion.trim(), // Eliminar espacios en blanco
        FichaTecnica: formData.FichaTecnica.trim(), // Eliminar espacios en blanco
      };
  
      await axiosClient.post('/sitio/', formattedData);
      GlobalAlert.success('Sitio registrado exitosamente');
      resetForm();
      onRegisterSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error al registrar el sitio:', error);
      GlobalAlert.error('Hubo un error al registrar el sitio.');
    }
  };
  
  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen} className="max-w-fit">Registrar Sitio</Button>
      <GlobalModal
        isOpen={isOpen}
        onOpenChange={onClose}
        title="Formulario de Registro de Sitio"
        footer={() => (
          <>
            <Button color="danger" variant="light" onClick={onClose}>Cerrar</Button>
            <Button color="success" variant="solid" onClick={handleSubmit}>Registrar</Button>
          </>
        )}
      >
        <div className="flex flex-col gap-4">
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
              {persona.first_name}
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
        </div>
      </GlobalModal>
    </div>
  );
};

export default RegistroSitio;
