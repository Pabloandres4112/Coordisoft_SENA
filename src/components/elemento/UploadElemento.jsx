import React, { useState } from 'react';
import { Button, Input, Select, SelectItem, Checkbox } from '@nextui-org/react';
import GlobalModal from '../componets_globals/GlobalModal';

const UpdateElementModal = ({ isOpen, onOpenChange, item, onUpdate, categorias = [], tiposMaterial = [], sites = [] }) => {
  const [updatedData, setUpdatedData] = useState({ ...item });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdate = () => {
    onUpdate(updatedData);
    onOpenChange(); // Cierra el modal después de actualizar
  };

  return (
    <GlobalModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Actualizar Elemento"
      footer={() => (
        <Button onClick={handleUpdate} color="primary">
          Actualizar
        </Button>
      )}
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Fecha de Vencimiento"
          type="date"
          name="FechaDevencimiento"
          value={updatedData.FechaDevencimiento}
          onChange={handleChange}
          fullWidth
        />
        <Input
          label="Código Sena Material"
          placeholder="Ingresa el código del material"
          name="CodigoSena_Material"
          value={updatedData.CodigoSena_Material}
          onChange={handleChange}
          fullWidth
        />
        <Select
          name="sitio"
          label="Sitio"
          placeholder="Selecciona un sitio"
          className="w-full"
          onChange={(e) => handleChange({ target: { name: 'sitio', value: e.target.value } })}
          value={updatedData.sitio}
        >
          {Array.isArray(sites) && sites.length > 0 ? (
            sites.map((site) => (
              <SelectItem key={site.id} value={site.id.toString()}>
                {site.nombre_sitio}
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled>No hay sitios disponibles</SelectItem>
          )}
        </Select>
        <Select
          name="Categoria_Material"
          label="Categoría Material"
          placeholder="Selecciona una categoría"
          onChange={(e) => handleChange({ target: { name: 'Categoria_Material', value: e.target.value } })}
          value={updatedData.Categoria_Material}
        >
          {Array.isArray(categorias) && categorias.length > 0 ? (
            categorias.map((categoria) => (
              <SelectItem key={categoria.id} value={categoria.id.toString()}>
                {categoria.nombre_categoria}
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled>No hay categorías disponibles</SelectItem>
          )}
        </Select>
        <Select
          name="Tipo_Material"
          label="Tipo Material"
          placeholder="Selecciona un tipo de material"
          onChange={(e) => handleChange({ target: { name: 'Tipo_Material', value: e.target.value } })}
          value={updatedData.Tipo_Material}
        >
          {Array.isArray(tiposMaterial) && tiposMaterial.length > 0 ? (
            tiposMaterial.map((tipo) => (
              <SelectItem key={tipo.id} value={tipo.id.toString()}>
                {tipo.tipo_elemento}
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled>No hay tipos de material disponibles</SelectItem>
          )}
        </Select>
        <Input
          label="Nombre Material"
          placeholder="Ingresa el nombre del material"
          name="Nombre_Material"
          value={updatedData.Nombre_Material}
          onChange={handleChange}
          fullWidth
        />
        <Input
          label="Descripción Material"
          placeholder="Ingresa una descripción del material"
          name="Descripcion_Material"
          value={updatedData.Descripcion_Material}
          onChange={handleChange}
          fullWidth
        />
        <Input
          label="Stock"
          type="number"
          placeholder="Ingresa el stock del material"
          name="stock"
          value={updatedData.stock}
          onChange={handleChange}
          fullWidth
        />
        <Select
          name="unidad_medida"
          label="Unidad de Medida"
          placeholder="Selecciona una unidad"
          onChange={(e) => handleChange({ target: { name: 'unidad_medida', value: e.target.value } })}
          value={updatedData.unidad_medida}
        >
          <SelectItem value="pieza">Pieza</SelectItem>
          <SelectItem value="litro">Litro</SelectItem>
          <SelectItem value="metro">Metro</SelectItem>
        </Select>
        <Checkbox
          name="producto_perecedero"
          checked={updatedData.producto_perecedero}
          onChange={handleChange}
        >
          Producto Perecedero
        </Checkbox>
      </div>
    </GlobalModal>
  );
};

export default UpdateElementModal;
