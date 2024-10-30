import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const ListaTasaPIT = () => {
  const [tasas, setTasas] = useState([
    { id: 1, producto: "Producto 1", segmento: "Segmento A", tasaPIT: 5.0 },
    { id: 2, producto: "Producto 2", segmento: "Segmento B", tasaPIT: 6.5 },
    { id: 3, producto: "Producto 3", segmento: "Segmento C", tasaPIT: 4.75 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTasa, setNewTasa] = useState({
    producto: "Producto 1",
    segmento: "Segmento A",
    tasaPIT: "",
  });
  const [editingTasa, setEditingTasa] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tasaToDelete, setTasaToDelete] = useState(null);

  const productosOptions = ["Producto 1", "Producto 2", "Producto 3"];
  const segmentosOptions = ["Segmento A", "Segmento B", "Segmento C"];

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTasa({ producto: "Producto 1", segmento: "Segmento A", tasaPIT: "" });
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
        prevTasas.map((tasa) =>
          tasa.id === editingTasa.id ? { ...tasa, ...newTasa } : tasa
        )
      );
    } else {
      const newId = tasas.length ? tasas[tasas.length - 1].id + 1 : 1;
      setTasas([...tasas, { id: newId, ...newTasa }]);
    }
    handleCloseModal();
  };

  const handleEdit = (tasa) => {
    setNewTasa({
      producto: tasa.producto,
      segmento: tasa.segmento,
      tasaPIT: tasa.tasaPIT,
    });
    setEditingTasa(tasa);
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
    setTasas(tasas.filter((tasa) => tasa.id !== tasaToDelete));
    handleCloseConfirmModal();
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-md shadow-md">
      <div className="flex justify-between mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleShowModal}
        >
          + Agregar Tasa PIT
        </button>
        <h2 className="text-2xl font-bold">Listado de Tasas PIT</h2>
        <input
          type="text"
          placeholder="Buscar"
          className="p-2 border rounded"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white rounded-md">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2">Código</th>
            <th className="px-4 py-2">Producto</th>
            <th className="px-4 py-2">Segmento</th>
            <th className="px-4 py-2">Tasa PIT (%)</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasas
            .filter(
              (tasa) =>
                tasa.producto
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                tasa.segmento.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((tasa) => (
              <tr key={tasa.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{tasa.id}</td>
                <td className="px-4 py-2">{tasa.producto}</td>
                <td className="px-4 py-2">{tasa.segmento}</td>
                <td className="px-4 py-2">{tasa.tasaPIT}%</td>
                <td className="px-4 py-2">
                  <button
                    className="text-yellow-500 mr-3"
                    onClick={() => handleEdit(tasa)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleShowConfirmModal(tasa.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal para agregar/editar tasa PIT */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingTasa ? "Editar Tasa PIT" : "Agregar Nueva Tasa PIT"}
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="block text-gray-700">Producto</label>
              <select
                name="producto"
                value={newTasa.producto}
                onChange={handleChange}
                className="block w-full p-2 border rounded mb-3"
                required
              >
                {productosOptions.map((producto) => (
                  <option key={producto} value={producto}>
                    {producto}
                  </option>
                ))}
              </select>

              <label className="block text-gray-700">Segmento</label>
              <select
                name="segmento"
                value={newTasa.segmento}
                onChange={handleChange}
                className="block w-full p-2 border rounded mb-3"
                required
              >
                {segmentosOptions.map((segmento) => (
                  <option key={segmento} value={segmento}>
                    {segmento}
                  </option>
                ))}
              </select>

              <label className="block text-gray-700">Tasa PIT</label>
              <input
                type="number"
                placeholder="Ingrese la tasa PIT"
                name="tasaPIT"
                value={newTasa.tasaPIT}
                onChange={handleChange}
                className="block w-full p-2 border rounded mb-3"
                required
              />

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              >
                {editingTasa ? "Guardar Cambios" : "Agregar Tasa PIT"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que quieres eliminar esta tasa PIT?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseConfirmModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
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
