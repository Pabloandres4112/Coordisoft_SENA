import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination } from "@nextui-org/react";
import axiosClient from '../../configs/axiosClient';
import { FaEye } from 'react-icons/fa';

const GlobalTable = ({
  columns,
  dataEndpoint,
  searchTerm,
  updateComponent: UpdateComponent,
  deleteComponent: DeleteComponent,
  viewComponent: ViewComponent,  // Prop for view modal
  refreshTrigger,
  columnNames = {}  // Add this prop to accept column names mapping
}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // State for view modal
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get(dataEndpoint);
      console.log('Data fetched:', response.data); // Log data for debugging
      setData(response.data);
      setTotalPages(Math.ceil(response.data.length / rowsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dataEndpoint, refreshTrigger]);

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / rowsPerPage));
  }, [data, rowsPerPage]);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedData = data.slice(start, end);

  const handleUpdateClick = (item) => {
    setSelectedItem(item);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleViewClick = (item) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  const renderCell = (item, column) => {
    const propertyMappings = {
      'sede_area': item.sede_area?.nombre_sede || 'Sin nombre',
      'area_AreaSede': item.area_AreaSede?.nombre_area || 'Sin nombre',
      'persona_administra': item.persona_administra?.username || 'Sin nombre',
      'persona_ficha.username': item.persona_ficha?.username || 'N/A',
      'persona_ficha.email': item.persona_ficha?.email || 'N/A',
      'persona_ficha.Cedula_persona': item.persona_ficha?.Cedula_persona || 'N/A',
      'persona_ficha.Edad_persona': item.persona_ficha?.Edad_persona || 'N/A',
      'persona_ficha.Telefono_persona': item.persona_ficha?.Telefono_persona || 'N/A',
      'persona_ficha.first_name': item.persona_ficha?.first_name || 'N/A',
      'persona_ficha.last_name': item.persona_ficha?.last_name || 'N/A',
      'programa.nombre_programa': item.programa?.nombre_programa || 'N/A',
      'programa.area_programa.nombre_area': item.programa?.area_programa?.nombre_area || 'N/A',
      'persona_encargada.username': item.persona_encargada?.username || 'N/A',
      'tipo_sitio.nombre_tipoSitio': item.tipo_sitio?.nombre_tipoSitio || 'N/A',
    };

    if (column in propertyMappings) {
      return propertyMappings[column];
    }

    if (column === 'date_created' || column === 'date_modified') {
      const date = new Date(item[column]);
      return !isNaN(date) ? date.toLocaleDateString() : 'Fecha no disponible';
    }
    

    return item[column] !== undefined && item[column] !== null ? item[column] : 'N/A';
  };

  // Filtrar datos por término de búsqueda
  const filteredData = paginatedData.filter((item) => {
    const searchTermLower = searchTerm ? searchTerm.toLowerCase() : '';
    return columns.some(column => {
      const cellValue = renderCell(item, column).toString().toLowerCase();
      return cellValue.includes(searchTermLower);
    });
  });

  return (
    <div>
      <div className="flex flex-col justify-between items-end mb-4 my-2">
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small ml-2"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Table aria-label="Example table with pagination">
            <TableHeader>
              {columns.map((column, index) => (
                <TableColumn key={index}>
                  {columnNames[column] || column} {/* Use the column name mapping */}
                </TableColumn>
              ))}
              <TableColumn>Acciones</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>{renderCell(item, column)}</TableCell>
                  ))}
                  <TableCell>
                    {ViewComponent && (
                      <button
                        className="bg-transparent hover:bg-gray-300 text-gray-600 font-normal py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out mr-2"
                        onClick={() => handleViewClick(item)}
                      >
                        <FaEye />
                      </button>
                    )}
                    {UpdateComponent && (
                      <button
                        className="bg-transparent hover:bg-gray-300 text-gray-600 font-normal py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out mr-2"
                        onClick={() => handleUpdateClick(item)}
                      >
                        Actualizar
                      </button>
                    )}
                    {DeleteComponent && (
                      <button
                        className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out"
                        onClick={() => handleDeleteClick(item)}
                      >
                        Eliminar
                      </button>
                    )}
                  </TableCell>
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
              page={page}
              total={totalPages}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}

      {isUpdateModalOpen && selectedItem && (
        <UpdateComponent item={selectedItem} onClose={() => setIsUpdateModalOpen(false)} refreshData={fetchData} />
      )}
      {isDeleteModalOpen && selectedItem && (
        <DeleteComponent item={selectedItem} onClose={() => setIsDeleteModalOpen(false)} refreshData={fetchData} />
      )}
      {isViewModalOpen && selectedItem && (
        <ViewComponent item={selectedItem} isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} />
      )}
    </div>
  );
};

export default GlobalTable;
