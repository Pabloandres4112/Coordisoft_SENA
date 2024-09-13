    import React, { useState, useEffect } from "react";
    import { Button, Input } from "@nextui-org/react";
    import axiosClient from "../../configs/axiosClient";
    import GlobalAlert from "../componets_globals/GlobalAlert";
    import GlobalModal from "../componets_globals/GlobalModal";

    export const UpdateUser = () => {
    const [isOpen, setIsOpen] = useState(false); // Manejo del estado del modal
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        Cedula_persona: "",
        Edad_persona: "",
        Telefono_persona: "",
    });
    const [error, setError] = useState("");

    // Función para manejar los cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        if (value) {
        setError("");
        }
    };

    // Función para abrir el modal y cargar datos actuales del usuario
    const handleOpenModal = async () => {
        try {
        const response = await axiosClient.get('/auth/me');
        setUserData(response.data);
        setIsOpen(true);
        } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        GlobalAlert.error('No se pudieron cargar los datos del usuario. ' + (error.response?.data?.message || 'Error del servidor.'));
        }
    };

    // Función para manejar la actualización de los datos del usuario
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verificar si algún campo requerido está vacío
        if (!userData.username || !userData.email ) {
        setError("Todos los campos son obligatorios.");
        return;
        }

        try {
        const response = await axiosClient.put("/auth/me", userData);
        console.log("Respuesta del servidor:", response.data);
        GlobalAlert.success("Perfil actualizado correctamente.");
        setIsOpen(false); // Cierra el modal después de enviar la petición
        window.location.reload();
        } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        GlobalAlert.error("Hubo un error al actualizar el perfil. " + (error.response?.data?.message || "Error interno del servidor."));
        }
    };

    return (
        <div className="flex flex-col gap-2">
        <Button onPress={handleOpenModal} className="max-w-fit">
            Actualizar Perfil
        </Button>
        <GlobalModal
            isOpen={isOpen}
            onOpenChange={() => setIsOpen(!isOpen)}
            title="Actualizar Perfil de Usuario"
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
                    label="Email"
                    placeholder="Ingrese el email"
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
                />
                <Input
                    id="Edad_persona"
                    name="Edad_persona"
                    type="number"
                    label="Edad"
                    placeholder="Ingrese la edad"
                    value={userData.Edad_persona}
                    onChange={handleInputChange}
                />
                <Input
                    id="Telefono_persona"
                    name="Telefono_persona"
                    type="text"
                    label="Teléfono"
                    placeholder="Ingrese el teléfono"
                    value={userData.Telefono_persona}
                    onChange={handleInputChange}
                />
                {error && <p className="text-red-500">{error}</p>}
                <Button color="primary" type="submit">
                    Actualizar
                </Button>
                </div>
            </form>
            }
            footer={() => (
            <Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
                Cerrar
            </Button>
            )}
        />
        </div>
    );
    };

    export default UpdateUser;
