import React, { useEffect, useState } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Pagination,
    Button,
} from '@nextui-org/react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa'; // Importa el ícono de editar

const TableCoordiSoft = ({ refreshData, searchTerm }) => {
    const [movimientos, setMovimientos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Número de elementos por página

    const columnsHeader = [
        { nombre: 'Código' },
        { nombre: 'Usuario' },
        { nombre: 'Tipo' },
        { nombre: 'Fecha Creación' },
        { nombre: 'Fecha Modificación' },
        // { nombre: 'Acciones' },
    ];

    // Función para listar movimientos
    const ListarMovimientos = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/movimiento');
            setMovimientos(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error al obtener los movimientos:", error);
        }
    };

    useEffect(() => {
        ListarMovimientos();
    }, [refreshData]);

    // Filtrar movimientos basados en el término de búsqueda
    const filteredMovimientos = movimientos.filter((movimiento) =>
        movimiento?.id?.toString().includes(searchTerm.toLowerCase()) ||
        movimiento?.persona_movimiento?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movimiento?.tipo_movimiento?.tipo_movimiento?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calcular los elementos a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredMovimientos.slice(indexOfFirstItem, indexOfLastItem);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Formatear la fecha usando JavaScript nativo
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <>
            <Table aria-label="Tabla de Movimientos">
                <TableHeader>
                    {columnsHeader.map((column, index) => (
                        <TableColumn key={index}>{column.nombre}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {currentItems.map((movimiento, index) => (
                        <TableRow key={index}>
                            <TableCell>{movimiento?.id}</TableCell>
                            <TableCell>{movimiento?.persona_movimiento?.username}</TableCell>
                            <TableCell>{movimiento?.tipo_movimiento?.tipo_movimiento}</TableCell>
                            <TableCell>{formatDate(movimiento?.fecha_creacion)}</TableCell>
                            <TableCell>{formatDate(movimiento?.fecha_modificacion)}</TableCell>
                            {/* <TableCell>
                                <Button
                                    color='warning'
                                    auto
                                    onClick={() => alert('Editar')}
                                    aria-label="Editar"
                                    css={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} // Asegúrate de que el botón esté bien estilizado
                                >
                                    <FaEdit />
                                </Button>
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="py-2 px-2 flex justify-between my-2 items-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={currentPage}
                    total={Math.ceil(filteredMovimientos.length / itemsPerPage)}
                    onChange={paginate}
                />
            </div>
        </>
    );
};

export default TableCoordiSoft;
