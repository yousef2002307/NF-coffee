
import axios from "axios";
import { toast } from "react-toastify";

export const Host='https://coffeepointegy.com';
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${Host}/api/v1/cat`);
    return response.data.data; 
  } catch (error) {
    toast.error("Error fetching categories:", error);
    throw error;
  }
};
export const fetchmnue = async () => {
  try {
    const response = await axios.get(`${Host}/api/v1/menushop`);
    return response.data.data; 
  } catch (error) {
    toast.error("Error fetching categories:", error);
    throw error;
  }
};
export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${Host}/api/v1/menutocat/${categoryId}`);
    return response.data; 
  } catch (error) {
    toast.error("Error fetching products by category:", error);
    throw error;
  }
};


export const sendEmail = async (emailData) => {
  try {
    const response = await axios.post(`${Host}/api/v1/email`, emailData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response && error.response.data) {
      toast.error('Error sending email: ' + JSON.stringify(error.response.data));
    } else {
      toast.error('Error sending email: ' + error.message);
    }
    throw new Error("Error sending email");
  }
};



export const loginUser = async (email, password) => {
  try {
      const response = await axios.post(`${Host}/api/v1/login`, {
          email,
          password
      });

      return response.data;
  } catch (err) {
      throw new  toast.error('Invalid credentials. Please try again.');
  }
};
export const registerUser = async (userData) => {
  try {
      const response = await axios.post(`${Host}/api/v1/register`, userData);
      return response.data;  
  } catch (err) {
      throw new  toast.error(err.response?.data?.message || 'Signup failed. Please try again later.');
  }
};
export const fetchBlogsApi = async (page = 1) => {
  try {
    const response = await axios.get(`${Host}/api/v1/allblog?page=${page}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching blogs", error);
    throw error;
  }
};
export const fetchBlogApi = async (id) => {
  try {
    const response = await axios.get(`${Host}/api/v1/allblog/${id}`);
    

    const blogData = {
      post: response.data.post,
      recommendedPosts: response.data['recommended posts'],
    };

    return blogData; 
  } catch (error) {
    console.error("Error fetching the blog:", error);
    throw error; 
  }
};
export const placeOrder = async (phone, addressIndetail, token) => {
  
  try {
    const response = await axios.post(
      `${Host}/api/v1/orderal`,
      
      {
        phone,
        addressIndetail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const token = localStorage.getItem('token');

    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error; 
  }
};


export const fetchData = async (date, token, setData) => {
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();
  try {
    const response = await fetch(`${Host}/api/v1/dashboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ month, day }),
    });

    if (response.ok) {
      const result = await response.json();
      setData({
        productCount: result.productCount,
        visitorsCount: result['visitors count'],
        salesCount: result['sales count this month'],
        bestSellingProducts: result['best selling products'],
      });
    } else {
      console.error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching data', error);
  }
};

export const fetchCompareSalesData = async (year, productIds, token, setSalesData) => {
  try {
    const response = await fetch(`${Host}/api/v1/comparesales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        year,
        product_ids: productIds,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      setSalesData(result);
      console.log(result);
    } else {
      console.error('Failed to fetch compare sales data');
    }
  } catch (error) {
    console.error('Error fetching compare sales data', error);
  }
};
export const fetchBestsell = async () => {
  try {
    const response = await axios.get(`${Host}/api/v1/bestsell`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

export const fetchUsers = async (currentPage, token) => {
  try {
    const response = await axios.get(
      `${Host}/api/v1/aduser?page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const addAdmin = async (newAdminData, token) => {
  try {
    const response = await axios.post(
      `${Host}/api/v1/addadmin`,
      newAdminData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding admin:', error);
    throw error;
  }
};

export const deleteUser = async (userId, token) => {
  try {
    await axios.delete(`${Host}/api/v1/aduser/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};




export const fetchProducts = async (page = 1, token) => {
  try {
    const response = await fetch(`${Host}/api/v1/adproduct?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return {
        products: data.products.data,
        currentPage: data.products.current_page,
        totalPages: data.products.last_page,
      };
    } else {
      throw new Error("Error fetching products");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveProduct = async (productData, token) => {
  const formData = new FormData();

  formData.append("name", productData.name);
  formData.append("name_ar", productData.name_ar);
  formData.append("description", productData.description);
  formData.append("desc_ar", productData.desc_ar);
  formData.append("stock", productData.stock);
  formData.append("price", productData.price);

  if (productData.image) {
    formData.append("image", productData.image);
  }

  try {
    const response = await fetch(`${Host}/api/v1/adproduct`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error saving product");
    }
  } catch (error) {
    toast.error(error);
    throw error;
  }
};


export const deleteProduct = async (productId, token) => {
  try {
    const response = await fetch(`${Host}/api/v1/adproduct/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Error deleting product");
    }
  } catch (error) {
    toast.error(error);
    throw error;
  }
};

export const uploadProductImage = async (productId, imageFile, token) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch(`${Host}/api/v1/updproduct2/${productId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      return true;
    } else {
      throw new  toast.error("Error uploading image");
    }
  } catch (error) {
    toast.error(error);
    throw error;
  }
};


