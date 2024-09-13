import React, { useState } from 'react';
import { Input, Button, Switch } from '@nextui-org/react';
import GlobalModal from '../componets_globals/GlobalModal';
import GlobalAlert from '../componets_globals/GlobalAlert';
import axiosClient from '../../configs/axiosClient';

const RegistroElementoMaterial = ({ isOpen, onOpenChange, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name_rol: '',
    slug: '',
    description: '',
    state_rol: false,
  });

  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [additionalOptions, setAdditionalOptions] = useState([false]); // Maneja múltiples switches

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSwitchChange = (index) => (e) => {
    const newSwitches = [...additionalOptions];
    newSwitches[index] = e.target.checked;
    setAdditionalOptions(newSwitches);
  };

  const handleAddSwitch = () => {
    if (additionalOptions.length < 4) {
      setAdditionalOptions([...additionalOptions, false]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axiosClient.post('/rol/', {
        ...formData,
        additionalOptions,
      });
      GlobalAlert.success('Elemento creado exitosamente');
      onRegisterSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error al crear el elemento:', error);
      GlobalAlert.error('Hubo un error al crear el elemento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Registrar Nuevo Elemento"
      footer={(onClose) => (
        <Button auto onClick={handleSubmit} loading={loading}>
          Registrar
        </Button>
      )}
    >
      <Input
        label="Nombre del Rol"
        name="name_rol"
        value={formData.name_rol}
        onChange={handleChange}
        placeholder="Ingrese el nombre del rol"
        fullWidth
      />
      <Input
        label="Slug"
        name="slug"
        value={formData.slug}
        onChange={handleChange}
        placeholder="Ingrese el slug"
        fullWidth
      />
      <Input
        label="Descripción"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Ingrese una descripción"
        fullWidth
        multiline
        rows={3}
      />
      <Switch
        checked={formData.state_rol}
        onChange={(e) => setFormData({ ...formData, state_rol: e.target.checked })}
      >
        Estado del Rol
      </Switch>
      <Button auto flat onClick={() => setIsExpanded(!isExpanded)} css={{ mt: '$4' }}>
        {isExpanded ? 'Ocultar Opciones Adicionales' : 'Mostrar Opciones Adicionales'}
      </Button>

      {isExpanded && (
        <div style={{ marginTop: '1rem' }}>
          <h4>Opciones Adicionales</h4>
          {additionalOptions.map((isChecked, index) => (
            <Switch
              key={index}
              checked={isChecked}
              onChange={handleSwitchChange(index)}
            >
              Opción Adicional {index + 1}
            </Switch>
          ))}
          {additionalOptions.length < 4 && (
            <Button auto flat css={{ mt: '$4' }} onClick={handleAddSwitch}>
              Agregar Opción Adicional
            </Button>
          )}
        </div>
      )}
    </GlobalModal>
  );
};

export default RegistroElementoMaterial;
