// RegisterUser.jsx
import React, { useState, useEffect } from "react";
import { Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const RegisterUser = ({ onRegisterSuccess }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Estado para todos los campos necesarios para registrar un usuario
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    Cedula_persona: "",
    Edad_persona: "",
    Telefono_persona: "",
    Rol_persona: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const [roles, setRoles] = useState([]); // Estado para almacenar los roles
  const [error, setError] = useState("");

  // Efecto para cargar los roles cuando el componente se monta
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosClient.get("/rol/"); // Ajusta el endpoint según sea necesario
        setRoles(response.data); 
      } catch (error) {
        console.error("Error al cargar los roles:", error);
        GlobalAlert.error("Hubo un error al obtener los roles.");
      }
    };

    fetchRoles();
  }, []);

  // Función para manejar los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    if (value) {
      setError("");
    }
  };

  // Función para manejar los cambios en el select de roles
  const handleRoleChange = (e) => {
    const roleValue = parseInt(e.target.value, 10); // Convertir el valor a número
    setUserData({ ...userData, Rol_persona: roleValue });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Verificar si algún campo requerido está vacío
    if (!userData.username || !userData.email || !userData.Cedula_persona || !userData.Edad_persona || !userData.Telefono_persona || !userData.Rol_persona || !userData.first_name || !userData.last_name || !userData.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      console.log("Datos enviados:", userData); // Imprimir los datos antes de enviar para debug

      const response = await axiosClient.post("/auth/register", userData); 
      console.log("Respuesta del servidor:", response.data);
      GlobalAlert.success("Usuario registrado correctamente.");
      setUserData({
        username: "",
        email: "",
        Cedula_persona: "",
        Edad_persona: "",
        Telefono_persona: "",
        Rol_persona: "",
        first_name: "",
        last_name: "",
        password: "",
      }); // Limpiar el formulario
      onRegisterSuccess(); // Llama a la función para refrescar la tabla
      onOpenChange(); // Cierra el modal después de enviar la petición
    } catch (error) {
      console.error("Error al enviar la petición:", error);

      if (error.response) {
        // El servidor respondió con un estado fuera del rango 2xx
        console.error("Error de respuesta del servidor:", error.response.data);
        GlobalAlert.error("Hubo un error al registrar el usuario. " + (error.response.data?.message || "Error interno del servidor."));
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta
        console.error("No se recibió respuesta del servidor:", error.request);
        GlobalAlert.error("No se pudo conectar con el servidor. Intente nuevamente.");
      } else {
        // Algo sucedió al configurar la solicitud
        console.error("Error al configurar la solicitud:", error.message);
        GlobalAlert.error("Ocurrió un error inesperado. " + error.message);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen} className="max-w-fit">Registrar Usuario</Button>
      <GlobalModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Formulario de Registro de Usuario"
        children={
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Input
                id="username"
                name="username"
                type="text"
                label="Username"
                placeholder="Ingrese el username"
                value={userData.username}
                onChange={handleInputChange}
                required
              />
              <Input
                id="email"
                name="email"
                type="email"
                label="Correo Electrónico"
                placeholder="Ingrese el correo electrónico"
                value={userData.email}
                onChange={handleInputChange}
                required
              />
              <Input
                id="Cedula_persona"
                name="Cedula_persona"
                type="text"
                label="Cédula"
                placeholder="Ingrese la cédula"
                value={userData.Cedula_persona}
                onChange={handleInputChange}
                required
              />
              <Input
                id="Edad_persona"
                name="Edad_persona"
                type="number"
                label="Edad"
                placeholder="Ingrese la edad"
                value={userData.Edad_persona}
                onChange={handleInputChange}
                required
              />
              <Input
                id="Telefono_persona"
                name="Telefono_persona"
                type="text"
                label="Teléfono"
                placeholder="Ingrese el teléfono"
                value={userData.Teléfono_persona}
                onChange={handleInputChange}
                required
              />
              <Select
                label="Selecciona un rol"
                placeholder="Seleccione un rol"
                value={userData.Rol_persona}
                onChange={handleRoleChange}
                className="w-full"
                required
              >
                {roles.map((rol) => (
                  <SelectItem key={rol.id} value={rol.id}>
                    {rol.name_rol}
                  </SelectItem>
                ))}
              </Select>
              <Input
                id="first_name"
                name="first_name"
                type="text"
                label="Nombre"
                placeholder="Ingrese el nombre"
                value={userData.first_name}
                onChange={handleInputChange}
                required
              />
              <Input
                id="last_name"
                name="last_name"
                type="text"
                label="Apellido"
                placeholder="Ingrese el apellido"
                value={userData.last_name}
                onChange={handleInputChange}
                required
              />
              <Input
                id="password"
                name="password"
                type="password"
                label="Contraseña"
                placeholder="Ingrese la contraseña"
                value={userData.password}
                onChange={handleInputChange}
                required
              />
              {error && <div className="text-red-500">{error}</div>}
              <Button type="submit">Registrar</Button>
            </div>
          </form>
        }
      />
    </div>
  );
};

export default RegisterUser;
