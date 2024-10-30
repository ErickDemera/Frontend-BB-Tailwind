import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const ListadoProvision = () => {
  const [provisions, setProvisions] = useState([
    { id: 1, product: "Producto 1", segment: "Segmento A", mis: "MIS 001", provision: 2.5 },
    { id: 2, product: "Producto 2", segment: "Segmento B", mis: "MIS 002", provision: 1.5 },
    { id: 3, product: "Producto 3", segment: "Segmento C", mis: "MIS 003", provision: 3.0 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newProvision, setNewProvision] = useState({
    product: "",
    segment: "",
    mis: "",
    provision: "",
  });
  const [editingProvision, setEditingProvision] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [provisionToDelete, setProvisionToDelete] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewProvision({ product: "", segment: "", mis: "", provision: "" });
    setEditingProvision(null);
  };

  const handleShowModal = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProvision({ ...newProvision, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProvision) {
      setProvisions((prevProvisions) =>
        prevProvisions.map((provision) =>
          provision.id === editingProvision.id
            ? { ...provision, ...newProvision }
            : provision
        )
      );
    } else {
      const newId = provisions.length ? provisions[provisions.length - 1].id + 1 : 1;
      setProvisions([...provisions, { id: newId, ...newProvision }]);
    }
    handleCloseModal();
  };

  const handleEdit = (provision) => {
    setNewProvision({
      product: provision.product,
      segment: provision.segment,
      mis: provision.mis,
      provision: provision.provision,
    });
    setEditingProvision(provision);
    handleShowModal();
  };

  const handleShowConfirmModal = (id) => {
    setProvisionToDelete(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setProvisionToDelete(null);
  };

  const handleDelete = () => {
    setProvisions(provisions.filter((provision) => provision.id !== provisionToDelete));
    handleCloseConfirmModal();
  };

  return (
    <div className="container mx-auto bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          onClick={handleShowModal}
        >
          + Agregar Provisión
        </button>
        <h2 className="text-xl font-semibold">Listado de Provisión</h2>
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
            <th className="px-4 py-2 border-b">Producto</th>
            <th className="px-4 py-2 border-b">Segmento</th>
            <th className="px-4 py-2 border-b">MIS</th>
            <th className="px-4 py-2 border-b">Provisión (%)</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {provisions
            .filter((provision) =>
              provision.product.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((provision) => (
              <tr key={provision.id}>
                <td className="px-4 py-2 border-b">{provision.product}</td>
                <td className="px-4 py-2 border-b">{provision.segment}</td>
                <td className="px-4 py-2 border-b">{provision.mis}</td>
                <td className="px-4 py-2 border-b">{provision.provision}%</td>
                <td className="px-4 py-2 border-b flex space-x-2">
                  <button
                    className="text-yellow-500 hover:text-yellow-700"
                    onClick={() => handleEdit(provision)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleShowConfirmModal(provision.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal para agregar/editar provisión */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">
              {editingProvision ? "Editar Provisión" : "Agregar Provisión"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-gray-700">Producto</label>
                <select
                  name="product"
                  value={newProvision.product}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Selecciona un producto</option>
                  <option value="Producto 1">Producto 1</option>
                  <option value="Producto 2">Producto 2</option>
                  <option value="Producto 3">Producto 3</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-gray-700">Segmento</label>
                <select
                  name="segment"
                  value={newProvision.segment}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Selecciona un segmento</option>
                  <option value="Segmento A">Segmento A</option>
                  <option value="Segmento B">Segmento B</option>
                  <option value="Segmento C">Segmento C</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block text-gray-700">MIS</label>
                <input
                  type="text"
                  name="mis"
                  placeholder="Ingrese el MIS"
                  value={newProvision.mis}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700">Provisión (%)</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    name="provision"
                    placeholder="Ingrese la provisión"
                    value={newProvision.provision}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <span className="ml-2">%</span>
                </div>
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
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editingProvision ? "Guardar Cambios" : "Agregar Provisión"}
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
              ¿Estás seguro de que quieres eliminar esta provisión?
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
