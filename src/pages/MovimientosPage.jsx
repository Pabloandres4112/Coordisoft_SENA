import React, { useEffect, useState } from 'react';
import TableCoordiSoft from '../components/Table/TableCoordiSoft';
import { Card, CardHeader, CardBody, Divider, Button, Select, SelectItem } from "@nextui-org/react";
import GlobalModal from '../components/componets_globals/GlobalModal';
import axiosClient from '../configs/axiosClient';
import GlobalAlert from '../components/componets_globals/GlobalAlert';

function MovimientosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    tipo_movimiento: '',
    persona_movimiento: '',
  });
  const [tiposMovimiento, setTiposMovimiento] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Función para actualizar los datos
  const fetchData = async () => {
    try {
      const tiposResponse = await axiosClient.get('/tipo_movimiento/');
      setTiposMovimiento(tiposResponse.data);
      
      const usuariosResponse = await axiosClient.get('/auth/users/');
      setUsuarios(usuariosResponse.data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
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

      const data = {
        tipo_movimiento: formData.tipo_movimiento,
        persona_movimiento: formData.persona_movimiento,
      };

      const response = await axiosClient.post('/movimiento/', data, config);
      console.log(response.data);
      setIsModalOpen(false);
      GlobalAlert.success("Movimiento registrado con éxito.");
      fetchData(); // Actualiza los datos después de guardar el movimiento
    } catch (error) {
      console.error("Error al registrar movimiento:", error);
      if (error.response && error.response.status === 401) {
        console.error("No autorizado: Verifica el token de autenticación.");
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          try {
            const refreshResponse = await axiosClient.post('/refresh-token/', { refresh: refreshToken });
            localStorage.setItem('token', refreshResponse.data.access);
            return handleSubmit();
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
            <p className='text-[30px]'>Movimientos</p>
            <p className='text-xs'>Subtítulo</p>
          </CardHeader>
          <Divider className='mx-[2%] max-w-[96%]' />
          <CardBody>
            <div className='flex w-full px-6'>
              <div className='w-1/2 flex justify-center items-center'>
              <input 
                  type="text" 
                  placeholder='Buscar movimientos...' 
                  className='h-[40px] border-gray-400 border p-3 rounded-lg w-4/5' 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
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
                  + Movimiento
                </Button>
                <Button className='h-[60px] w-[120px]' radius='lg' color='warning' variant="shadow">Button</Button>
              </div>
            </div>
          </CardBody>
        </Card>
        <TableCoordiSoft refreshData={fetchData} searchTerm={searchTerm} />
        <GlobalModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          title="Crear Movimiento"
          footer={(onClose) => (
            <>
              <Button auto onClick={handleSubmit}>Guardar</Button>
              <Button auto color="error" onClick={() => onClose()}>Cancelar</Button>
            </>
          )}
        >
          <div className='flex flex-col gap-4'>
            <Select
              name="tipo_movimiento"
              label="Tipo de Movimiento"
              placeholder="Selecciona un tipo de movimiento"
              className="max-w-xs"
              onChange={(e) => handleSelectChange('tipo_movimiento', e.target.value)}
              value={formData.tipo_movimiento}
            >
              {tiposMovimiento.map((tipo) => (
                <SelectItem key={tipo.id} value={tipo.id.toString()}>
                  {tipo.tipo_movimiento}
                </SelectItem>
              ))}
            </Select>

            <Select
              name="persona_movimiento"
              label="Usuario"
              placeholder="Selecciona un Usuario"
              className="max-w-xs"
              onChange={(e) => handleSelectChange('persona_movimiento', e.target.value)}
              value={formData.persona_movimiento}
            >
              {usuarios.map((usuario) => (
                <SelectItem key={usuario.id} value={usuario.id.toString()}>
                  {usuario.username}
                </SelectItem>
              ))}
            </Select>
          </div>
        </GlobalModal>
      </main>
    </>
  );
}

export default MovimientosPage;
  