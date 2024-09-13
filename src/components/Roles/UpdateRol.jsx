import React, { useState, useEffect } from 'react';
import { Button, Input, Checkbox } from '@nextui-org/react';
import axiosClient from '../../configs/axiosClient';
import GlobalModal from '../componets_globals/GlobalModal';
import GlobalAlert from '../componets_globals/GlobalAlert';// Verifica la ruta correcta

const ActualizarRol = ({ item, onClose, refreshData }) => {
  const [formData, setFormData] = useState({
    name_rol: '',
    slug: '',
    description: '',
    state_rol: false,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name_rol: item.name_rol || '',
        slug: item.slug || '',
        description: item.description || '',
        state_rol: item.state_rol || false,
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(`/rol/${item.id}/`, formData);
      GlobalAlert.success('Rol actualizado exitosamente!');
      setFormData({
        name_rol: '',
        slug: '',
        description: '',
        state_rol: false,
      });
      onClose(); // Cierra el modal
      refreshData(); // Refresca los datos
    } catch (error) {
      GlobalAlert.error('Error al actualizar el rol. Por favor, intente de nuevo.');
    }
  };

  return (
    <GlobalModal
      isOpen={true} // Asegúrate de que el modal esté abierto
      onOpenChange={onClose}
      title="Actualizar Rol"
      footer={() => (
        <Button color="danger" variant="light" onClick={onClose}>
          Cerrar
        </Button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Input
            label="Nombre del Rol"
            name="name_rol"
            value={formData.name_rol}
            onChange={handleChange}
            placeholder="Ingrese el nombre del rol"
            fullWidth
            required
          />
          <Input
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Ingrese el slug"
            fullWidth
            helperText="Debe contener solo letras, números, guiones y guiones bajos"
            required
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
            required
          />
          <Checkbox
            name="state_rol"
            isSelected={formData.state_rol}
            onChange={handleChange}
          >
            Activo
          </Checkbox>
          <Button color="primary" type="submit">
            Actualizar
          </Button>
        </div>
      </form>
    </GlobalModal>
  );
};

export default ActualizarRol;
