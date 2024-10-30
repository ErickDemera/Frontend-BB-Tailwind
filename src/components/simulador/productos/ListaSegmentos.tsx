import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const ListaSegmentos = () => {
  const [segments, setSegments] = useState([
    { id: 1, name: "Corporativo", description: "Corporativo" },
    { id: 2, name: "Empresarial", description: "Empresarial" },
    { id: 3, name: "Pymes", description: "Pymes" },
    { id: 4, name: "Alto", description: "Alto" },
    { id: 5, name: "Medio alto", description: "Medio alto" },
    { id: 6, name: "Medio", description: "Medio" },
    { id: 7, name: "Monetarios", description: "Monetarios" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newSegment, setNewSegment] = useState({ name: "", description: "" });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [segmentToDelete, setSegmentToDelete] = useState(null);
  const [editingSegment, setEditingSegment] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewSegment({ name: "", description: "" });
    setEditingSegment(null);
  };

  const handleShowModal = () => setShowModal(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSegment({ ...newSegment, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSegment) {
      setSegments((prevSegments) =>
        prevSegments.map((segment) =>
          segment.id === editingSegment.id ? { ...segment, ...newSegment } : segment
        )
      );
    } else {
      const newId = segments.length ? segments[segments.length - 1].id + 1 : 1;
      setSegments([...segments, { id: newId, ...newSegment }]);
    }
    handleCloseModal();
  };

  const handleEdit = (segment: { id: number; name: string; description: string }) => {
    setNewSegment({ name: segment.name, description: segment.description });
    setEditingSegment(segment);
    handleShowModal();
  };

  const handleShowConfirmModal = (id: number) => {
    setSegmentToDelete(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setSegmentToDelete(null);
  };

  const handleDelete = () => {
    setSegments(segments.filter((segment) => segment.id !== segmentToDelete));
    handleCloseConfirmModal();
  };

  return (
    <div className="bg-gray-200 p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={handleShowModal}
        >
          + Agregar Segmento
        </button>
        <h2 className="text-lg font-semibold">Listado de Segmentos</h2>
      </div>

      <input
        type="text"
        placeholder="Buscar"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="hidden lg:block">
        <table className="w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border-b">Código</th>
              <th className="p-2 border-b">Producto</th>
              <th className="p-2 border-b">Segmento</th>
              <th className="p-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {segments
              .filter((segment) =>
                segment.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((segment) => (
                <tr key={segment.id} className="text-center">
                  <td className="p-2 border-b">{segment.id}</td>
                  <td className="p-2 border-b">{segment.name}</td>
                  <td className="p-2 border-b">{segment.description}</td>
                  <td className="p-2 border-b">
                    <button
                      className="text-yellow-500 hover:text-yellow-700 mr-2"
                      onClick={() => handleEdit(segment)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleShowConfirmModal(segment.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="lg:hidden grid gap-4 mt-4">
        {segments
          .filter((segment) =>
            segment.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((segment) => (
            <div
              key={segment.id}
              className="bg-white p-4 rounded-md shadow-md border border-gray-300"
            >
              <h3 className="font-semibold text-lg">{segment.name}</h3>
              <p>ID: {segment.id}</p>
              <p>Descripción: {segment.description}</p>
              <div className="flex mt-3 space-x-4">
                <button
                  className="text-yellow-500 hover:text-yellow-700"
                  onClick={() => handleEdit(segment)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleShowConfirmModal(segment.id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Modal para agregar/editar segmento */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">
              {editingSegment ? "Editar Segmento" : "Nuevo Segmento"}
            </h3>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2 font-semibold">Producto</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Ingrese el nombre del segmento"
                value={newSegment.name}
                onChange={handleChange}
                required
              />
              <label className="block mb-2 font-semibold">Segmento</label>
              <select
                name="description"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                value={newSegment.description}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione</option>
                <option value="Corporativo">Corporativo</option>
                <option value="Empresarial">Empresarial</option>
                <option value="Pymes">Pymes</option>
                <option value="Alto">Alto</option>
                <option value="Medio alto">Medio alto</option>
                <option value="Medio">Medio</option>
                <option value="Monetarios">Monetarios</option>
              </select>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md"
              >
                {editingSegment ? "Guardar Cambios" : "Agregar Segmento"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirmar Eliminación</h3>
            <p>¿Estás seguro de que quieres eliminar este segmento?</p>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="bg-gray-300 text-gray-700 p-2 rounded-md"
                onClick={handleCloseConfirmModal}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded-md"
                onClick={handleDelete}
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
