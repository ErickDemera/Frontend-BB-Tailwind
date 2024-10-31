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
          product.id === editingProduct.id ? { ...product, ...newProduct } : product
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
    <div className="bg-gray-200 p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleShowModal}>
          + Agregar Producto
        </button>
        <h2 className="text-lg font-semibold">Listado de Productos</h2>
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
              <th className="p-2 border-b text-left">Código</th>
              <th className="p-2 border-b text-left">Producto</th>
              <th className="p-2 border-b text-left">Validación</th>
              <th className="p-2 border-b text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((product) => (
                <tr key={product.id} className="text-center">
                  <td className="p-2 border-b">{product.id}</td>
                  <td className="p-2 border-b">{product.name}</td>
                  <td className="p-2 border-b">{product.validation}</td>
                  <td className="p-2 border-b flex justify-center items-center">
                    <button
                      className="text-yellow-500 hover:text-yellow-700 mr-2"
                      onClick={() => handleEdit(product)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleShowConfirmModal(product.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar/editar producto */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">
              {editingProduct ? "Editar Producto" : "Nuevo Producto"}
            </h3>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2 font-semibold">Producto</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                placeholder="Ingrese el nombre del producto"
                value={newProduct.name}
                onChange={handleChange}
                required
              />
              <label className="block mb-2 font-semibold">Validación</label>
              <select
                name="validation"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                value={newProduct.validation}
                onChange={handleChange}
                required
              >
                <option value="Positivo">Positivo</option>
                <option value="Negativo">Negativo</option>
              </select>
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
                {editingProduct ? "Guardar Cambios" : "Agregar Producto"}
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
            <p>¿Estás seguro de que quieres eliminar este producto?</p>
            <div className="flex justify-end mt-4 space-x-4">
              <button className="bg-gray-300 text-gray-700 p-2 rounded-md" onClick={handleCloseConfirmModal}>
                Cancelar
              </button>
              <button className="bg-red-500 text-white p-2 rounded-md" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
