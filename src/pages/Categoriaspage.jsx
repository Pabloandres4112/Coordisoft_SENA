import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Divider, Button, Input } from "@nextui-org/react";
import axiosClient from '../configs/axiosClient';
import GlobalModal from '../components/componets_globals/GlobalModal';
import GlobalAlert from '../components/componets_globals/GlobalAlert';
import UpdateModal from '../components/categoria/UpdateCategoria';
import GlobalTable from '../components/componets_globals/GlobalTable';
import DeleteModal from '../components/categoria/DeletCategoria';

function CategoriasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    CodigoUNPSC_Material: '',
    nombre_categoria: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get('/categoria_elemento/');
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No se encontró el token en el localStorage.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      };

      await axiosClient.post('/categoria_elemento/', formData, config);
      setIsModalOpen(false);
      GlobalAlert.success("Categoría registrada con éxito.");
      setRefreshTrigger(prev => !prev);
    } catch (error) {
      console.error("Error al registrar categoría:", error);
      if (error.response && error.response.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          try {
            const refreshResponse = await axiosClient.post('/refresh-token/', { refresh: refreshToken });
            localStorage.setItem('token', refreshResponse.data.access);
            await handleSubmit(); 
          } catch (refreshError) {
            console.error("Error al obtener nuevo token:", refreshError);
          }
        }
      }
    }
  };

  return (
    <>
      <main className='w-full px-7'>
        <Card className='my-4' shadow='none'>
          <CardHeader className='flex flex-col items-start'>
            <p className='text-[30px]'>Categorías</p>
            <p className='text-xs'>Subtítulo</p>
          </CardHeader>
          <Divider className='mx-[2%] max-w-[96%]' />
          <CardBody>
            <div className='flex w-full px-6'>
              <div className='w-1/2 flex justify-center items-center'>
                <Input
                  clearable
                  underlined
                  placeholder='Buscar categorías...'
                  className='h-[40px]'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className='flex gap-3 w-1/2 justify-end'>
                <Button
                  className='h-[60px] w-[120px]'
                  radius='lg'
                  color="success"
                  variant="shadow"
                  onClick={() => setIsModalOpen(true)}
                >
                  + Categoría
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
        <GlobalTable
          columns={["id", "CodigoUNPSC_Material", "nombre_categoria", "date_created", "date_modified"]}
          dataEndpoint="/categoria_elemento/"
          searchTerm={searchTerm}
          updateComponent={UpdateModal}
          deleteComponent={DeleteModal}
          refreshTrigger={refreshTrigger}
        />
        <GlobalModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          title="Crear Categoría"
          footer={(onClose) => (
            <>
              <Button auto onClick={handleSubmit}>Guardar</Button>
              <Button auto color="error" onClick={() => onClose()}>Cancelar</Button>
            </>
          )}
        >
          <div className='flex flex-col gap-4'>
            <Input
              name="CodigoUNPSC_Material"
              label="Código UNPSC Material"
              placeholder="Introduce el código UNPSC"
              value={formData.CodigoUNPSC_Material}
              onChange={handleInputChange}
            />
            <Input
              name="nombre_categoria"
              label="Nombre Categoría"
              placeholder="Introduce el nombre de la categoría"
              value={formData.nombre_categoria}
              onChange={handleInputChange}
            />
          </div>
        </GlobalModal>
      </main>
    </>
  );
}

export default CategoriasPage;
