import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa"; 
import { fetchBestsell } from "../../../Api/Api";

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const productData = await fetchBestsell();
      setProducts(productData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const stars = Array.from({ length: maxStars }, (_, i) =>
      i < fullStars ? (
        <FaStar key={i} className="text-orange-500" />
      ) : (
        <FaRegStar key={i} className="text-gray-400" />
      )
    );
    return <div className="flex justify-center">{stars}</div>;
  };

  return (
    <div className="flex flex-col  gap-5 bg-[#F3ECE6] px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search here"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 w-full sm:w-72"
        />
      </div>

      {/* Table */}
      <div className="flex justify-center items-center w-full bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-white">
              <th className="py-3 px-4 text-center font-medium text-gray-600">Code</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Product Image</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Product Name</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Product Price</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-center text-gray-800">{product.id}</td>
                <td className="py-3 px-4 justify-center items-center flex">
                  <img
                    src={product.image_url || "https://via.placeholder.com/50"}
                    alt={product.name}
                    className="h-10 w-10 object-cover rounded"
                  />
                </td>
                <td   className="py-3 px-4 text-center font-medium text-gray-600 truncate" 
  style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
>{product.name}</td>
                <td className="py-3 px-4 text-center text-gray-500">{product.price} USD</td>
                <td className="py-3 px-4 text-center">
                  {product.ratings?.length
                    ? renderStars(product.ratings[0].rating) // Render stars
                    : "No Reviews"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BestSeller;
