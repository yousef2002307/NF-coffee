import React, { useState, useEffect } from "react";
import { Host } from "../../../Api/Api";

const EditModal = ({ product, categoryId, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    namear: "",
    price: "",
    image: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        namear: product.namear || "",
        price: product.price || "",
        image: null, 
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("namear", formData.namear);
    payload.append("price", formData.price);
    if (formData.image) {
      payload.append("image", formData.image);
    }
    payload.append("category_id", categoryId);

    try {
      const response = await fetch(`${Host}/api/v1/menushop/${product.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        onUpdateSuccess(updatedProduct.data); 
        onClose(); 
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update product.");
      }
    } catch (error) {
      setError("An error occurred while updating the product.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg sm:max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nameAr" className="block text-gray-700">Product Name (Arabic)</label>
            <input
              type="text"
              id="namear"
              name="namear"
              value={formData.namear}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">Product Image (Optional)</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose} // Executes the onClose function passed as a prop
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
