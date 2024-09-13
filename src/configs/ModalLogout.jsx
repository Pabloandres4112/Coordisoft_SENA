import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom'


export const ModalLogout = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const navigate = useNavigate()


    const handleSubmit = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nombre');
        localStorage.removeItem('rol');
        onOpenChange();

        navigate('/');

    };


    return (
        <>
            <div className='absolute left-2 w-14 h-7 rounded-full' onClick={onOpen}>

            </div>
            <div className="flex flex-col gap-2 relative">



                <button color="" className='flex justify-start -mt-[2px] pl-0 items-center gap-x-4 text-black text-opacity-80 2xl:text-lg' onClick={onOpen}>
                    Logout
                </button>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <form
                                >

                                    <ModalHeader className="flex flex-col gap-1">Cerrar Session</ModalHeader>
                                    <ModalBody>
                                        <h2>Estas Seguro  de Cerrar Session</h2>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>Atras</Button>
                                        <Button color="primary" onClick={handleSubmit} onPress={onClose}>Cerrar</Button>
                                    </ModalFooter>

                                </form>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </>
    )
}
