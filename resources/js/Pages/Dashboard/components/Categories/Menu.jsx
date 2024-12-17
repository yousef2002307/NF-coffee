import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Host } from "../../../Api/Api";
import AddProductModal from "./AddMenu"; // Import the modal component
import EdittModal from "./Editmenu";

const Menuca = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false); // State for Add Product Modal

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      filterProductsByCategory(id);
    }
  }, [id, products]);
  const handleDeleteProduct = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${Host}/api/v1/menushop/${productToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        // Remove the product from state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productToDelete)
        );
        setFilteredProducts((prevFiltered) =>
          prevFiltered.filter((product) => product.id !== productToDelete)
        );
        setDeleteModalOpen(false);
        setProductToDelete(null);
      } else {
        console.error("Failed to delete product", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };
  
  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${Host}/api/v1/menushop`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json", 
         
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.data);
      } else {
        console.error("Failed to fetch products", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const filterProductsByCategory = (categoryId) => {
    const filtered = products.filter(
      (product) => product.category_id === parseInt(categoryId)
    );
    setFilteredProducts(filtered);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAndSearchedProducts = filteredProducts.filter(({ name }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProductSuccess = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  
    if (parseInt(newProduct.category_id) === parseInt(id)) {
      setFilteredProducts((prevFiltered) => [...prevFiltered, newProduct]);
    }
    fetchProducts();
    setAddProductModalOpen(false);
  };
  

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setEditProductModalOpen(true);
  };
  

  return (
    <div className="flex flex-col w-full gap-5 bg-[#F3ECE6] px-6 py-4">
      {/* Header */}
      <div className="flex justify-between flex-col gap-2 md:flex-row w-full items-center mb-6">
        <input
          type="text"
          placeholder="Search Products"
          className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-orange-300"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          onClick={() => setAddProductModalOpen(true)} // Open Add Product Modal
        >
          + New Product
        </button>
      </div>

      {/* Table */}
      <div className="flex justify-center items-center w-full bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr>
            <th className="py-3 px-4 text-center font-medium text-gray-600">Image</th>

              <th className="py-3 px-4 text-center font-medium text-gray-600">Name</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Price</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
           {filteredAndSearchedProducts.map(({ id, name, price ,image }) => (
  <tr key={`${id}-${name}`}> 
 <td className="py-3 px-4 text-center flex justify-center items-center">
                  <img width={60} src={image} alt="product" />
                </td>    <td className="py-3 px-4 text-center">{name}</td>
    <td className="py-3 px-4 text-center">L.E{price}</td>
   
    <td className="py-3 px-4 text-center relative">
      <button
        onClick={() => setDropdownOpen(dropdownOpen === id ? null : id)}
        className="text-gray-500"
      >
        ...
      </button>
      {dropdownOpen === id && (
        <div className="absolute bg-white right-10 shadow-lg mt-2 z-50 w-40 rounded border border-gray-300">
          <button
            onClick={() => handleEditProduct({ id, name, price })}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => {
              setDeleteModalOpen(true);
              setProductToDelete(id);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </td>
  </tr>
))}

          </tbody>
        </table>
      </div>
   
      {/* Add Product Modal */}
      {addProductModalOpen && (
        <AddProductModal
          categoryId={id}
          onClose={() => setAddProductModalOpen(false)}
          onSuccess={handleAddProductSuccess}
        />
      )}
        {editProductModalOpen && (
        <EdittModal
          product={currentProduct}
          categoryId={id}
          onClose={() => setEditProductModalOpen(false)}
          onUpdateSuccess={handleAddProductSuccess}
        />
      )}
   {deleteModalOpen && (
  <DeleteModal
    onConfirm={handleDeleteProduct} 
    onCancel={() => {
      setDeleteModalOpen(false);
      setProductToDelete(null);
    }}
  />
)}

    </div>

  );
};
const DeleteModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg sm:max-w-md">
      <h3 className="text-xl mb-4">Are you sure you want to delete this product?</h3>
      <div className="flex justify-end gap-4">
        <button onClick={onCancel} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
        <button onClick={onConfirm} className="bg-red-500 text-white py-2 px-4 rounded">Delete</button>
      </div>
    </div>
  </div>
);
export default Menuca;
