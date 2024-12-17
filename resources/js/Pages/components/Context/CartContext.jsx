import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Host } from '../../Api/Api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [cartItemCount, setCartItemCount] = useState(0);
  const [loading, setLoading] = useState(true); 
  const token = localStorage.getItem('token');
  const UserId = localStorage.getItem('UserId');


  useEffect(() => {
    if (token) {
      setLoading(true); 

      axios
        .get(`${Host}/api/v1/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          setCartItems(response.data);
          setCartItemCount(response.data.length); 

         
          const productIds = response.data.map(item => item.product_id);

        
          const fetchProductDetails = productIds.map(productId =>
            axios.get(`${Host}/api/v1/products/${productId}`)
          );

          Promise.all(fetchProductDetails)
            .then(responses => {
              const newProductDetails = responses.reduce((acc, response, index) => {
                acc[productIds[index]] = response.data;
                return acc;
              }, {});
              setProductDetails(newProductDetails);
            })
            .catch(error => {
              console.error('Error fetching product details:', error);
              toast.error('Failed to load product details.');
            })
            .finally(() => setLoading(false)); 
        })
        .catch(error => {
          toast.error('Failed to load cart items.');
          setLoading(false); 
        });
    }
  }, [token]);

  const addToCart = async (product) => {
    if (!token) {
      toast.error('Please login to add items to the cart.');
      return;
    }
  
    if (product.stock === 0) {
      toast.error(`${product.name} is out of stock!`);
      return;
    }
  
    // Ensure quantity defaults to 1 if not provided
    const quantityToAdd = product.quantity || 1;
  
    try {
      const existingItem = cartItems.find(item => item.product_id === product.id);
  
      if (existingItem) {
        // Update quantity for an existing item
        const updatedQuantity = existingItem.quantity + quantityToAdd;
        await axios.put(
          `${Host}/api/v1/cart/${existingItem.id}`,
          { quantity: updatedQuantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        const updatedCartItems = cartItems.map(item =>
          item.product_id === product.id
            ? { ...item, quantity: updatedQuantity }
            : item
        );
  
        setCartItems(updatedCartItems);
        setCartItemCount(cartItemCount + quantityToAdd);
        toast.success(`${product.name} quantity updated in the cart!`);
      } else {
        // Add a new item to the cart
        const requestBody = {
          user_id: UserId,
          product_id: product.id,
          quantity: quantityToAdd,
          price: product.price,
        };
  
        await axios.post(`${Host}/api/v1/cart`, requestBody, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const response = await axios.get(`${Host}/api/v1/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setCartItems(response.data);
        setCartItemCount(response.data.length);
        toast.success(`${product.name} has been added to the cart!`);
      }
    } catch (error) {
      console.error('Error handling cart operation:', error);
  
      if (error.response) {
        // Server-side error
        toast.error(error.response.data.message || 'An error occurred while updating the cart.');
      } else {
        // Client-side or network error
        toast.error('Unable to connect to the server. Please try again later.');
      }
    }
  };
  
  
  

  const removeFromCart = (itemId) => {
    if (!token) return;

    axios
      .delete(`${Host}/api/v1/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
        setCartItemCount(cartItemCount - 1);
        toast.info('Item has been removed from the cart.');
      })
      .catch(error => {
     
      });
  };

  const increaseQuantity = (itemId) => {
    const itemToUpdate = cartItems.find(item => item.id === itemId);

    if (itemToUpdate) {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );

      axios
        .put(`${Host}/api/v1/cart/${itemToUpdate.id}`, {
          quantity: itemToUpdate.quantity + 1,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          toast.success('Quantity updated!');
        })
        .catch(error => {
         
        });
    }
  };

  const decreaseQuantity = (itemId) => {
    const itemToUpdate = cartItems.find(item => item.id === itemId);

    if (itemToUpdate && itemToUpdate.quantity > 1) {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
      );

      axios
        .put(`${Host}/api/v1/cart/${itemToUpdate.id}`, {
          quantity: itemToUpdate.quantity - 1,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          toast.success('Quantity decreased!');
        })
        .catch(error => {
        
        });
    }
  };

  const clearCart = () => {
    if (!token) return;

    axios
      .delete(`${Host}/api/v1/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setCartItems([]);
        setCartItemCount(0);
        toast.info('Cart has been cleared.');
      })
      .catch(error => {
        console.error('Error clearing the cart:', error);
        toast.error('Failed to clear the cart.');
      });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemCount,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart, 
        productDetails,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
