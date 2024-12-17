
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Host } from '../../Api/Api';
import { toast } from 'react-toastify';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${Host}/api/v1/produucts`);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
          console.log(response.data);
        } else {
          throw new Error("Products not found in response");
        }
      } catch (error) {
        setError(error.message); // Handle the error
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  


  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};
