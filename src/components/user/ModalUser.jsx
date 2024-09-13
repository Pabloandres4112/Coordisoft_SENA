import React from 'react';
import GlobalModal from '../componets_globals/GlobalModal';

const ViewUserModal = ({ item, isOpen, onClose }) => {
  return (
    <GlobalModal
      isOpen={isOpen}
      onOpenChange={onClose}
      title="Detalles del Usuario"
      footer={() => (
        <button
          className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out"
          onClick={onClose}
        >
          Cerrar
        </button>
      )}
    >
      <p><strong>Nombre:</strong> {item.first_name} {item.last_name}</p>
      <p><strong>Nombre de Usuario:</strong> {item.username}</p>
      <p><strong>Cédula:</strong> {item.Cedula_persona}</p>
      <p><strong>Email:</strong> {item.email}</p>
      <p><strong>Teléfono:</strong> {item.Telefono_persona}</p>
      <p><strong>Edad:</strong> {item.Edad_persona}</p>
      {/* Add other fields as needed */}
    </GlobalModal>
  );
};

export default ViewUserModal;
