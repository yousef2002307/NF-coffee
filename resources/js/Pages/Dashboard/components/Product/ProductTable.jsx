import React, { useState, useEffect } from "react";
import { Host, fetchProducts, saveProduct, deleteProduct } from "../../../Api/Api";
import EditProductModal from "./EditProductModal";
import AddProductModal from "./AddProductModal"; // Add new import for AddProductModal

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false); // For Edit Modal
  const [addModalOpen, setAddModalOpen] = useState(false); // For Add Modal
  const [productId, setProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const { products: fetchedProducts, currentPage: fetchedCurrentPage, totalPages: fetchedTotalPages } = await fetchProducts(page, token);
      setProducts(fetchedProducts || []);
      setCurrentPage(fetchedCurrentPage || 1);
      setTotalPages(fetchedTotalPages || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const openEditModal = (id) => {
    setProductId(id);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete, token);
      setProducts(products.filter(({ id }) => id !== productToDelete));
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const filteredProducts = products.filter(({ name, description }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase()) || description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5  bg-[#F3ECE6] w-full">
      {/* Header */}
      <div className="flex justify-between w-full flex-col md:flex-row gap-2 items-center mb-6">
        <input
          type="text"
          placeholder="Search here"
          className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-orange-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          onClick={openAddModal} // Open Add Product Modal
        >
          + New Product
        </button>
      </div>

      <div className="flex justify-center items-center w-full bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Code</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Name</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Image</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Stock</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(({ id, name, image, stock, price }) => (
              <tr key={id} className="border-b hover:bg-gray-50 relative">
                <td className="py-3 px-4 text-center">{id}</td>
                <td className="py-3 px-4 text-center">{name}</td>
                <td className="py-3 px-4 text-center">
                  <img width={55} src={image} alt="product" />
                </td>
                <td className="py-3 px-4 text-center">{stock}</td>
                <td className="py-3 px-4 text-center">${price}</td>
                <td className="py-3 px-4 text-center">
                  <button onClick={() => setDropdownOpen(dropdownOpen === id ? null : id)}>...</button>
                  {dropdownOpen === id && (
                    <div className="absolute bg-white right-10 shadow-lg mt-2 z-50 w-40 rounded border border-gray-300">
                       <button onClick={() => openEditModal(id)}  className="w-full text-left px-4 py-2 bg-orange-600 text-white">
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setProductToDelete(id);
                      setDeleteModalOpen(true);
                    }}
                   className="w-full text-left px-4 py-2 text-orange-600 bg--white"
                  >
                    Delete
                  </button>
                    </div>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                 
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600 text-sm">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-gray-400 hover:text-gray-600"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>
          {Array.from(
            { length: Math.min(5, totalPages) },
            (_, index) => {
              const page = Math.max(1, currentPage - 2) + index;
              return (
                <button
                  key={page}
                  className={`p-2 rounded ${
                    currentPage === page
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            }
          )}
          <button
            className="p-2 text-gray-400 hover:text-gray-600"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={editModalOpen}
        closeModal={closeEditModal}
        productId={productId}
        updateProduct={() => fetchData(currentPage)}
      />

      {/* Add New Product Modal */}
      <AddProductModal
        isOpen={addModalOpen}
        closeModal={closeAddModal}
        addProduct={() => fetchData(currentPage)} // Pass the update function for refreshing
      />

      {/* Delete Product Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Delete Product</h2>
            <p>Are you sure you want to delete product {productToDelete}?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
