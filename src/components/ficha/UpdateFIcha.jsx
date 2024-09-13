import React, { useState, useEffect } from "react";
import { Button, Select, SelectItem, Input } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const UpdateFicha = ({ item, onClose, refreshData }) => {


    

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Actualizar Sede"
    //   children={
        
    //   }
      footer={() => (
        <Button color="danger" variant="light" onClick={onClose}>
          Cerrar
        </Button>
      )}
    />
  );
};

export default UpdateFicha;
