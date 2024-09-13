// RegisterUser.jsx
import React, { useState, useEffect } from "react";
import { Button, useDisclosure, Input, Select, SelectItem } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const RegisterUser = ({ onRegisterSuccess }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fieldErrors, setFieldErrors] = useState({});


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

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    if (value) {
      setError("");
    }
  };

  const handleRoleChange = (e) => {
    const roleValue = parseInt(e.target.value, 10); // Convertir el valor a número
    setUserData({ ...userData, Rol_persona: roleValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
 
    if (!userData.username || !userData.email || !userData.Cedula_persona || !userData.Edad_persona || !userData.Telefono_persona || !userData.Rol_persona || !userData.first_name || !userData.last_name || !userData.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    
    if (!isValidEmail(userData.email)) {
      setError("El formato del correo electrónico es inválido.");
      return;
    }

    if (!isValidPhone(userData.Telefono_persona)) {
      setError("El formato del teléfono es invalido, o supera los 10 digitos.");
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
    }catch (error) {
      console.error("Error al enviar la petición:", error);
    
      if (error.response) {
        console.error("Error de respuesta del servidor:", error.response.data);
    
        // Si el backend devuelve errores de validación en forma de objeto
        if (error.response.data) {
          const serverErrors = error.response.data;
          
          // Convertimos el formato de los errores en uno manejable para el formulario
          let formattedErrors = {};
          for (const key in serverErrors) {
            if (serverErrors[key] instanceof Array) {
              formattedErrors[key] = serverErrors[key][0]; // Tomamos el primer mensaje del array
            }
          }
          setFieldErrors(formattedErrors);
        } else {
          GlobalAlert.error("Hubo un error al registrar el usuario.");
        }
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
        GlobalAlert.error("No se pudo conectar con el servidor. Intente nuevamente.");
      } else {
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
                {fieldErrors.username && <div className="text-red-500">{fieldErrors.username}</div>}
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
               {fieldErrors.email && <div className="text-red-500">{fieldErrors.email}</div>}
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
               {fieldErrors.Cedula_persona && <div className="text-red-500">{fieldErrors.Cedula_persona}</div>}
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
                {fieldErrors.Telefono_persona && <div className="text-red-500">{fieldErrors.Telefono_persona}</div>}
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