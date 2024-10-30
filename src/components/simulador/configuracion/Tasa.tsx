import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const ListaTasas = () => {
  const [tasas, setTasas] = useState([
    { id: 1, producto: "Producto A", segmento: "Segmento 1", tasa: "3%" },
    { id: 2, producto: "Producto B", segmento: "Segmento 2", tasa: "5%" },
    { id: 3, producto: "Producto C", segmento: "Segmento 3", tasa: "2.5%" },
  ]);

  const [searchBuscar, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTasa, setNewTasa] = useState({
    producto: "",
    segmento: "",
    tasa: "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tasaToDelete, setTasaToDelete] = useState(null);
  const [editingTasa, setEditingTasa] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTasa({ producto: "", segmento: "", tasa: "" });
    setEditingTasa(null);
  };

  const handleShowModal = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTasa({ ...newTasa, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTasa) {
      setTasas((prevTasas) =>
        prevTasas.map((tasaItem) =>
          tasaItem.id === editingTasa.id
            ? { ...tasaItem, ...newTasa }
            : tasaItem
        )
      );
    } else {
      const newId = tasas.length ? tasas[tasas.length - 1].id + 1 : 1;
      setTasas([...tasas, { id: newId, ...newTasa }]);
    }
    handleCloseModal();
  };

  const handleEdit = (tasaItem) => {
    setNewTasa({
      producto: tasaItem.producto,
      segmento: tasaItem.segmento,
      tasa: tasaItem.tasa.replace("%", ""),
    });
    setEditingTasa(tasaItem);
    handleShowModal();
  };

  const handleShowConfirmModal = (id) => {
    setTasaToDelete(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setTasaToDelete(null);
  };

  const handleDelete = () => {
    setTasas(tasas.filter((tasaItem) => tasaItem.id !== tasaToDelete));
    handleCloseConfirmModal();
  };

  return (
    <div className="container mx-auto bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          onClick={handleShowModal}
        >
          + Agregar Tasa
        </button>
        <h2 className="text-xl font-semibold">Listado de Tasas</h2>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Código</th>
            <th className="px-4 py-2 border-b">Producto</th>
            <th className="px-4 py-2 border-b">Segmento</th>
            <th className="px-4 py-2 border-b">Tasa (%)</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasas
            .filter((tasaItem) =>
              tasaItem.producto.toLowerCase().includes(searchBuscar.toLowerCase())
            )
            .map((tasaItem) => (
              <tr key={tasaItem.id}>
                <td className="px-4 py-2 border-b">{tasaItem.id}</td>
                <td className="px-4 py-2 border-b">{tasaItem.producto}</td>
                <td className="px-4 py-2 border-b">{tasaItem.segmento}</td>
                <td className="px-4 py-2 border-b">{tasaItem.tasa}</td>
                <td className="px-4 py-2 border-b flex space-x-2">
                  <button
                    className="text-yellow-500 hover:text-yellow-700"
                    onClick={() => handleEdit(tasaItem)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleShowConfirmModal(tasaItem.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal para agregar/editar tasa */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">
              {editingTasa ? "Editar Tasa" : "Detalles de Nueva Tasa"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-gray-700">Producto</label>
                <select
                  name="producto"
                  value={newTasa.producto}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Seleccione un producto</option>
                  <option value="Producto A">Producto A</option>
                  <option value="Producto B">Producto B</option>
                  <option value="Producto C">Producto C</option>
                  <option value="Producto D">Producto D</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-gray-700">Segmento</label>
                <select
                  name="segmento"
                  value={newTasa.segmento}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Seleccione un segmento</option>
                  <option value="Segmento 1">Segmento 1</option>
                  <option value="Segmento 2">Segmento 2</option>
                  <option value="Segmento 3">Segmento 3</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-gray-700">Tasa (%)</label>
                <input
                  type="number"
                  placeholder="Ingrese la tasa en %"
                  name="tasa"
                  value={newTasa.tasa}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-500"
                >
                  {editingTasa ? "Guardar Cambios" : "¡Tasa Agregada!"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Confirmar Eliminación</h2>
            <p className="text-gray-700 mb-4">
              ¿Estás seguro de que quieres eliminar esta tasa?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseConfirmModal}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
