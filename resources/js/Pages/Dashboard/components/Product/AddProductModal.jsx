import React, { useState } from "react";
import { saveProduct } from "../../../Api/Api"; // Import the saveProduct function

const AddProductModal = ({ isOpen, closeModal, addProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    name_ar: "",
    desc_ar: "",
    description: "",
    stock: 0,
    price: 0,
    image: null,
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      name_ar:formData.name_ar,
      desc_ar:formData.desc_ar,
      description:formData.description,
      stock: formData.stock,
      price: formData.price,
      image: formData.image,
    };

    try {
      const newProduct = await saveProduct(productData, token);
      console.log("New product added:", newProduct);

      addProduct();
      closeModal();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50  flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Product Name"
            />
           <input
              type="text"
              name="name_ar"
              value={formData.name_ar}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="اسم المنتج (عربي)"
            />
             <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Product Description (English)"
            />
   <textarea
  name="desc_ar"
  value={formData.desc_ar}
  onChange={handleChange}
  className="w-full p-2 border border-gray-300 rounded mb-4"
  placeholder="وصف المنتج (عربي)"
/>


            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Stock Quantity"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Price"
            />
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="mr-2 px-4 py-2 text-orange-600 bg-white rounded"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddProductModal;
