import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const ListaTerms = () => {
  const [terms, setTerms] = useState([
    { id: 1, producto: "Producto A", plazo: "1 - 29" },
    { id: 2, producto: "Producto B", plazo: "30 - 60" },
    { id: 3, producto: "Producto C", plazo: "61 - 90" },
    { id: 4, producto: "Producto D", plazo: "91 - 120" },
    { id: 5, producto: "Producto E", plazo: "121 - 180" },
    { id: 6, producto: "Producto F", plazo: "181 - 360" },
    { id: 7, producto: "Producto G", plazo: "> 361" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTerm, setNewTerm] = useState({ producto: "", plazo: "" });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [termToDelete, setTermToDelete] = useState(null);
  const [editingTerm, setEditingTerm] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTerm({ producto: "", plazo: "" });
    setEditingTerm(null);
  };

  const handleShowModal = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTerm({ ...newTerm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTerm) {
      setTerms((prevTerms) =>
        prevTerms.map((term) =>
          term.id === editingTerm.id ? { ...term, ...newTerm } : term
        )
      );
    } else {
      const newId = terms.length ? terms[terms.length - 1].id + 1 : 1;
      setTerms([...terms, { id: newId, ...newTerm }]);
    }
    handleCloseModal();
  };

  const handleEdit = (term) => {
    setNewTerm({ producto: term.producto, plazo: term.plazo });
    setEditingTerm(term);
    handleShowModal();
  };

  const handleShowConfirmModal = (id) => {
    setTermToDelete(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setTermToDelete(null);
  };

  const handleDelete = () => {
    setTerms(terms.filter((term) => term.id !== termToDelete));
    handleCloseConfirmModal();
  };

  return (

    
    <div className="container mx-auto p-4 bg-gray-200">
      <div className="flex justify-between mb-4">
        <div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
            onClick={handleShowModal}
          >
            + Agregar Plazo
          </button>
        </div>
        <h2 className="text-xl font-bold">Listado de Plazos</h2>
        <div></div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-hidden border border-gray-300 rounded">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Código</th>
              <th className="px-4 py-2">Producto</th>
              <th className="px-4 py-2">Plazo</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {terms
              .filter((term) =>
                term.producto.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((term) => (
                <tr key={term.id} className="border-b">
                  <td className="px-4 py-2">{term.id}</td>
                  <td className="px-4 py-2">{term.producto}</td>
                  <td className="px-4 py-2">{term.plazo}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded shadow hover:bg-yellow-600 mr-2"
                      onClick={() => handleEdit(term)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded shadow hover:bg-red-600"
                      onClick={() => handleShowConfirmModal(term.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <div className="overflow-auto bg-white border border-gray-300 rounded max-h-96 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {terms
              .filter((term) =>
                term.producto.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((term) => (
                <div key={term.id} className="border border-gray-300 rounded p-4">
                  <h3 className="font-bold">{term.producto}</h3>
                  <p>Plazo: {term.plazo}</p>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded shadow hover:bg-yellow-600 mr-2"
                    onClick={() => handleEdit(term)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded shadow hover:bg-red-600"
                    onClick={() => handleShowConfirmModal(term.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Modal para agregar/editar term */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded shadow-lg p-6">
            <h2 className="text-lg font-bold">
              {editingTerm ? "Editar Plazo" : "Detalles del Nuevo Plazo"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Producto</label>
                <select
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  name="producto"
                  value={newTerm.producto}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un producto</option>
                  <option value="Producto A">Producto A</option>
                  <option value="Producto B">Producto B</option>
                  <option value="Producto C">Producto C</option>
                  <option value="Producto D">Producto D</option>
                  <option value="Producto E">Producto E</option>
                  <option value="Producto F">Producto F</option>
                  <option value="Producto G">Producto G</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Plazo</label>
                <select
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  name="plazo"
                  value={newTerm.plazo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un plazo</option>
                  <option value="1 - 29">1 - 29</option>
                  <option value="30 - 60">30 - 60</option>
                  <option value="61 - 90">61 - 90</option>
                  <option value="91 - 120">91 - 120</option>
                  <option value="121 - 180">121 - 180</option>
                  <option value="181 - 360">181 - 360</option>
                  <option value="> 361">> 361</option>
                </select>
              </div>

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                type="submit"
              >
                {editingTerm ? "Guardar Cambios" : "¡Plazo Agregado!"}
              </button>
            </form>
            <button
              className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-400"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded shadow-lg p-6">
            <h2 className="text-lg font-bold">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que quieres eliminar este plazo?</p>
            <div className="mt-4">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-400 mr-2"
                onClick={handleCloseConfirmModal}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
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
