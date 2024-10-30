import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const ListaProductos = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "ATC", description: "ATC", validation: "Positivo" },
    { id: 2, name: "Cartera Comercial", description: "Cartera Comercial", validation: "Positivo" },
    { id: 3, name: "Cartera Consumo", description: "Cartera Consumo", validation: "Positivo" },
    { id: 4, name: "Cartera Educativa", description: "Cartera Educativa", validation: "Positivo" },
    { id: 5, name: "Cartera Vivienda", description: "Cartera Vivienda", validation: "Positivo" },
    { id: 6, name: "Tarjeta de Crédito", description: "Tarjeta de Crédito", validation: "Positivo" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", validation: "Positivo" });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setNewProduct({ name: "", validation: "Positivo" });
    setEditingProduct(null);
  };

  const handleShowModal = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...newProduct }
            : product
        )
      );
    } else {
      const newId = products.length ? products[products.length - 1].id + 1 : 1;
      setProducts([...products, { id: newId, ...newProduct }]);
    }
    handleCloseModal();
  };

  const handleEdit = (product) => {
    setNewProduct({ name: product.name, validation: product.validation });
    setEditingProduct(product);
    handleShowModal();
  };

  const handleShowConfirmModal = (id) => {
    setProductToDelete(id);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setProductToDelete(null);
  };

  const handleDelete = () => {
    setProducts(products.filter((product) => product.id !== productToDelete));
    handleCloseConfirmModal();
  };

  return (
    <div className="container mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300"
          onClick={handleShowModal}
        >
          + Agregar Producto
        </button>
        <h2 className="text-2xl font-semibold text-gray-800"></h2> 
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500"
          placeholder="Buscar"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
        <thead>
          <tr>
            <th className="py-3 px-4 border-b font-semibold text-gray-600">Código</th>
            <th className="py-3 px-4 border-b font-semibold text-gray-600">Producto</th>
            <th className="py-3 px-4 border-b font-semibold text-gray-600">Validación</th>
            <th className="py-3 px-4 border-b font-semibold text-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition duration-150">
                <td className="py-2 px-4 border-b text-gray-700">{product.id}</td>
                <td className="py-2 px-4 border-b text-gray-700">{product.name}</td>
                <td className="py-2 px-4 border-b text-gray-700">{product.validation}</td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md transition duration-300"
                    onClick={() => handleEdit(product)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition duration-300"
                    onClick={() => handleShowConfirmModal(product.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal para agregar/editar producto */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              {editingProduct ? "Editar Producto" : "Detalles del Nuevo Producto"}
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2 text-gray-700">Producto</label>
              <input
                type="text"
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Ingrese el nombre del producto"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                required
              />
              <label className="block mb-2 text-gray-700">Validación</label>
              <select
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                name="validation"
                value={newProduct.validation}
                onChange={handleChange}
                required
              >
                <option value="Positivo">Positivo</option>
                <option value="Negativo">Negativo</option>
              </select>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-lg transition duration-300"
              >
                {editingProduct ? "Guardar Cambios" : "Agregar Producto"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
