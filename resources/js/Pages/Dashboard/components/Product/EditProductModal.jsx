import React, { useState, useEffect } from "react";
import { Host } from "../../../Api/Api";

const EditProductModal = ({ isOpen, closeModal, productId, updateProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    name_ar: "",
    desc_ar: "",
    stock: 0,
    price: 0,
    image: null,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (productId) {
      const fetchProductDetails = async () => {
        const response = await fetch(`${Host}/api/v1/adproduct/${productId}`);
        const product = await response.json();
        setFormData({
          name: product.name,
          description: product.description,
          stock: product.stock,
          name_ar:formData.name_ar,
          desc_ar:formData.desc_ar,
          price: product.price,
          image: null, 
        });
      };
      fetchProductDetails();
    }
  }, [productId, isOpen]);

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
    
    const updateProductDetails = {
      name: formData.name,
      description: formData.description,
      stock: formData.stock,
      name_ar: formData.name_ar,
      desc_ar: formData.desc_ar,
      price: formData.price,
    };
  
    try {
      const response = await fetch(`${Host}/api/v1/adproduct/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(updateProductDetails),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text(); 
        throw new Error(`Failed to update product: ${errorMessage}`);
      }
  
      // Parse the JSON response directly
      const result = await response.json();
      console.log("Product update response:", result);  
  
      if (formData.image) {
        const formDataForImage = new FormData();
        formDataForImage.append("image", formData.image);
  
        const imageResponse = await fetch(`${Host}/api/v1/updproduct2/${productId}`, {
          method: "POST",
          body: formDataForImage,
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
  
        if (!imageResponse.ok) {
          const imageErrorMessage = await imageResponse.text(); // Get error message as text
          throw new Error(`Failed to upload image: ${imageErrorMessage}`);
        }
  
        const imageResult = await imageResponse.text(); 
  
        try {
          const parsedImageResult = JSON.parse(imageResult); 
          console.log("Image upload response:", parsedImageResult);
        } catch (error) {
          console.error("Failed to parse image upload response:", imageResult);
        }
      }
  
      updateProduct(); // Refresh product list
      closeModal(); // Close modal after update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  
  
  
  

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">Edit Product</h2>
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
              placeholder="Product Description"
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditProductModal;