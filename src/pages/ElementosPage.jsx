  // ElementosPage.jsx
  import React, { useState, useEffect } from 'react';
  import GlobalTable from '../components/componets_globals/GlobalTable';
  import GlobalModal from '../components/componets_globals/GlobalModal';
  import GlobalAlert from '../components/componets_globals/GlobalAlert';
  import axiosClient from '../configs/axiosClient';
  import { Button, Card, CardBody, CardHeader, Divider, Select, SelectItem, Input, Checkbox } from '@nextui-org/react';
  import UpdateElementModal from '../components/elemento/UploadElemento';

const ElementosPage = () => {
  const [elementoData, setElementoData] = useState({
    FechaDevencimiento: '',
    date_created: '',
    date_modified: '',
    sitio: '',
    CodigoSena_Material: '',
    Categoria_Material: '',
    Tipo_Material: '',
    Nombre_Material: '',
    Descripcion_Material: '',
    stock: '',
    unidad_medida: '',
    producto_perecedero: false,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [sites, setSites] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tiposMaterial, setTiposMaterial] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Estado para el ítem seleccionado
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Estado para controlar el modal de actualización

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [siteRes, categoriaRes, tipoMaterialRes] = await Promise.all([
          axiosClient.get('/sitio/'),
          axiosClient.get('/categoria_elemento/'),
          axiosClient.get('/tipo_elemento/'),
        ]);

        setSites(siteRes.data);
        setCategorias(categoriaRes.data);
        setTiposMaterial(tipoMaterialRes.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (name, value) => {
    setElementoData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setElementoData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axiosClient.post('/elemento_material/', elementoData);
      GlobalAlert.success('Elemento registrado con éxito.');
      setRefreshTable((prev) => !prev);
      setIsOpen(false);
      resetForm(); // Limpia los campos después de enviar
    } catch (error) {
      console.error('Errores:', error.response.data);
      GlobalAlert.error('Error al registrar el elemento.');
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await axiosClient.put(`/elemento_material/${updatedData.id}/`, updatedData);
      GlobalAlert.success('Elemento actualizado con éxito.');
      setRefreshTable((prev) => !prev);
      setIsUpdateModalOpen(false); // Cierra el modal después de actualizar
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      GlobalAlert.error('Error al actualizar el elemento.');
    }
  };

  const handleDelete = async (item) => {
    try {
      await axiosClient.delete(`/elemento_material/${item.id}/`);
      GlobalAlert.success('Elemento eliminado con éxito.');
      setRefreshTable((prev) => !prev);
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
      GlobalAlert.error('Error al eliminar el elemento.');
    }
  };

  const resetForm = () => {
    setElementoData({
      FechaDevencimiento: '',
      date_created: '',
      date_modified: '',
      sitio: '',
      CodigoSena_Material: '',
      Categoria_Material: '',
      Tipo_Material: '',
      Nombre_Material: '',
      Descripcion_Material: '',
      stock: '',
      unidad_medida: '',
      producto_perecedero: false,
    });
  };

  const mapData = (data) => {
    return data.map((item) => ({
      id: item.id,
      Nombre_Material: item.Nombre_Material,
      date_created: new Date(item.date_created).toLocaleDateString(),
      date_modified: new Date(item.date_modified).toLocaleDateString(),
      Descripcion_Material: item.Descripcion_Material,
      CodigoSena_Material: item.CodigoSena_Material,
    }));
  };

  const columnNames = {
    id: 'ID',
    Nombre_Material: 'Nombre Material',
    date_created: 'Creado',
    date_modified: 'Modificado',
    Descripcion_Material: 'Descripción Material',
    CodigoSena_Material: 'Código Sena Material',
  };

  return (
    <main className="w-full px-7">
      <Card className="my-4" shadow="none">
        <CardHeader className="flex flex-col items-start">
          <h1 className="text-[30px]">Elementos</h1>
          <p className="text-xs">Administra tus elementos de manera efectiva</p>
        </CardHeader>
        <Divider className="mx-[2%] max-w-[96%]" />
        <CardBody>
          <div className="flex w-full px-6">
            <div className="w-1/2 flex justify-center items-center">
              <input
                type="text"
                placeholder="Buscar elementos..."
                className="h-[40px] border-gray-400 border p-3 rounded-lg w-4/5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3 w-1/2 justify-end">
              <Button
                className="h-[60px] w-[120px]"
                radius="md"
                color="success"
                variant="solid"
                onClick={() => setIsOpen(true)}
              >
                + Nuevo Elemento
              </Button>
            </div>
          </div>
          <GlobalTable
            columns={['id', 'Nombre_Material', 'date_created', 'date_modified', 'Descripcion_Material', 'CodigoSena_Material']}
            columnNames={columnNames}
            refreshTrigger={refreshTable}
            searchTerm={searchTerm}
            dataEndpoint="/elemento_material/"
            mapData={mapData}
            updateComponent={({ item, onClose }) => {
              setSelectedItem(item); // Setea el ítem seleccionado
              setIsUpdateModalOpen(true); // Abre el modal de actualización
              onClose(); // Cierra el modal de la tabla si es necesario
            }}
            deleteComponent={({ item, onClose }) => (
              <GlobalModal
                isOpen={true}
                onOpenChange={onClose}
                title="Eliminar Elemento"
                footer={() => (
                  <Button onClick={() => handleDelete(item)} color="error">
                    Eliminar
                  </Button>
                )}
              >
                <p>¿Estás seguro de que deseas eliminar el elemento: {item.Nombre_Material}?</p>
              </GlobalModal>
            )}
          />
          <GlobalModal
            isOpen={isOpen}
            onOpenChange={() => setIsOpen(!isOpen)}
            title="Registrar Nuevo Elemento"
            footer={() => (
              <Button onClick={handleSubmit} color="success">
                Registrar
              </Button>
            )}
          >
            <div className="flex flex-col gap-4">
              <Input
                label="Fecha de Vencimiento"
                type="date"
                name="FechaDevencimiento"
                value={elementoData.FechaDevencimiento}
                onChange={handleChange}
                fullWidth
              />
              <Input
                label="Hora Actual"
                type="time"
                name="horaActual"
                value={elementoData.horaActual}
                onChange={handleChange}
                fullWidth
              />
              <Select
                name="sitio"
                label="Sitio"
                placeholder="Selecciona un sitio"
                className="w-full"
                onChange={(e) => handleSelectChange('sitio', e.target.value)}
                value={elementoData.sitio}
              >
                {sites.map((site) => (
                  <SelectItem key={site.id} value={site.id.toString()}>
                    {site.nombre_sitio}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label="Código Sena Material"
                placeholder="Ingresa el código del material"
                name="CodigoSena_Material"
                value={elementoData.CodigoSena_Material}
                onChange={handleChange}
                className="w-full"
              />
              <Select
                name="Categoria_Material"
                label="Categoría Material"
                placeholder="Selecciona una categoría"
                className="w-full"
                onChange={(e) => handleSelectChange('Categoria_Material', e.target.value)}
                value={elementoData.Categoria_Material}
              >
                {categorias.map((categoria) => (
                  <SelectItem key={categoria.id} value={categoria.id.toString()}>
                    {categoria.nombre_categoria}
                  </SelectItem>
                ))}
              </Select>
              <Select
                name="Tipo_Material"
                label="Tipo Material"
                placeholder="Selecciona un tipo de material"
                className="w-full"
                onChange={(e) => handleSelectChange('Tipo_Material', e.target.value)}
                value={elementoData.Tipo_Material}
              >
                {tiposMaterial.map((tipo) => (
                  <SelectItem key={tipo.id} value={tipo.id.toString()}>
                    {tipo.nombre_tipo}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label="Nombre del Material"
                placeholder="Ingresa el nombre del material"
                name="Nombre_Material"
                value={elementoData.Nombre_Material}
                onChange={handleChange}
                className="w-full"
              />
              <Input
                label="Descripción del Material"
                placeholder="Ingresa una descripción del material"
                name="Descripcion_Material"
                value={elementoData.Descripcion_Material}
                onChange={handleChange}
                className="w-full"
              />
              <Input
                label="Stock"
                type="number"
                placeholder="Ingresa la cantidad en stock"
                name="stock"
                value={elementoData.stock}
                onChange={handleChange}
                className="w-full"
              />
              <Input
                label="Unidad de Medida"
                placeholder="Ingresa la unidad de medida"
                name="unidad_medida"
                value={elementoData.unidad_medida}
                onChange={handleChange}
                className="w-full"
              />
              <Checkbox
                name="producto_perecedero"
                checked={elementoData.producto_perecedero}
                onChange={handleChange}
                color="success"
              >
                Producto Perecedero
              </Checkbox>
            </div>
          </GlobalModal>
          <UpdateElementModal
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            item={selectedItem}
            onUpdate={handleUpdate}
          />
        </CardBody>
      </Card>
    </main>
  );
};

export default ElementosPage;
