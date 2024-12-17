import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Host } from "../../../Api/Api";
import { toast } from "react-toastify";

const BlogsActivity = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    image: null,
    user_id: "",
  });
  const [editBlog, setEditBlog] = useState({
    id: "",
    title: "",
    content: "",
    image: null,
    user_id: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const User = localStorage.getItem("UserId");

  // Fetch Blogs
  const fetchBlogs = async (page = 1) => {
    try {
      const response = await axios.get(`${Host}/api/v1/blog?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(response.data.data);
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Search Handling
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Page Change Handling
  const handlePageChange = (page) => {
    fetchBlogs(page);
  };

  // Toggle dropdown visibility
  const toggleDropdown = (id) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  // View Blog Details
  const handleViewInfo = (id) => {
    navigate(`/dashboard/blogDashboard/${id}`);
  };

  // Close modal
  const handleModalClose = () => {
    setModalVisible(false);
    setNewBlog({
      title: "",
      content: "",
      image: null,
      user_id: User  || "",
    });
    setEditBlog({
      id: "",
      title: "",
      content: "",
      image: null,
      user_id: User,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditBlog({ ...editBlog, image: file });
    }
  };
  const handleImageChangeadd = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBlog({ ...newBlog, image: file });
    }
  };
  const handleUpdateBlog = async () => {
    const formData = new FormData();
    formData.append("title", editBlog.title);
    formData.append("content", editBlog.content);
    formData.append("user_id", editBlog.user_id);
    if (editBlog.image) {
      formData.append("image", editBlog.image);
    }

    try {
      const response = await axios.post(
        `${Host}/api/v1/updblog/${editBlog.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Blog updated successfully:", response.data);
      fetchBlogs(currentPage);
      handleModalClose();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleEdit = (blog) => {
    setEditBlog({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      image: null,
      user_id: blog.user_id,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${Host}/api/v1/blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Blog deleted successfully:", response.data);
      fetchBlogs(currentPage);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  useEffect(() => {
    const User = localStorage.getItem("UserId");
    console.log("UserId:", User); // Check if UserId is available
  
    if (User) {
      setNewBlog((prevBlog) => ({ ...prevBlog, user_id: User }));
      setEditBlog((prevBlog) => ({ ...prevBlog, user_id: User }));
    }
  }, []);
  const handleAddBlog = async (e) => {
    e.preventDefault();

    // Check if title, content, and image are provided
    if (!newBlog.title || !newBlog.content || !newBlog.image) {
      toast.error("Please provide title, content, and image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("content", newBlog.content);
    formData.append("user_id", newBlog.user_id);

    formData.append("image", newBlog.image);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        `${Host}/api/v1/blog`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Blog created successfully:", response.data);
      fetchBlogs(currentPage);
      handleModalClose();
    } catch (error) {
      console.error("Error adding blog:", error.response ? error.response.data : error);
    }
  };

  return (
    <div className="flex flex-col  gap-5 bg-[#F3ECE6] px-6 py-4">
      <div className="flex justify-between flex-col md:flex-row gap-2 items-center mb-6">
        <input
          type="text"
          placeholder="Search here"
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
          value={search}
          onChange={handleSearch}
        />
        <button
          onClick={() => setModalVisible(true)} // Open modal for adding a new blog
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
        >
          + New Blog
        </button>
      </div>

      <div className=" flex justify-center items-center w-full bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-white">
              <th className="py-3 px-4 text-center font-medium text-gray-600">Title</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Date</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-center font-medium text-gray-600 truncate" 
  style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{blog.title}</td>
                <td className="py-3 px-4 text-center text-gray-800">
                  {new Date(blog.created_at).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-center relative">
                  <button
                    onClick={() => toggleDropdown(blog.id)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ...
                  </button>
                  {dropdownVisible === blog.id && (
                    <div className="absolute z-50  right-0 mt-2 w-40 bg-white shadow-md rounded border border-gray-200">
                      <button
                        onClick={() => handleViewInfo(blog.id)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 w-full text-left"
                      >
                        View Info
                      </button>
                      <button
                        onClick={() => handleEdit(blog)}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 w-full text-left"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
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

      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600 text-sm">
          Showing page {currentPage} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-gray-400 hover:text-gray-600"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`p-2 rounded ${
                currentPage === index + 1 ? "bg-orange-500 text-white" : "text-gray-600"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="p-2 text-gray-400 hover:text-gray-600"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            »
          </button>
        </div>
      </div>

      {/* Modal for Adding or Editing Blog */}
      {(modalVisible || editBlog.id) && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3">
            <h2 className="text-xl font-bold mb-4">{editBlog.id ? "Edit Blog" : "Add Blog"}</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              value={editBlog.id ? editBlog.title : newBlog.title}
              onChange={(e) =>
                editBlog.id
                  ? setEditBlog({ ...editBlog, title: e.target.value })
                  : setNewBlog({ ...newBlog, title: e.target.value })
              }
            />
            <textarea
              placeholder="Content"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              value={editBlog.id ? editBlog.content : newBlog.content}
              onChange={(e) =>
                editBlog.id
                  ? setEditBlog({ ...editBlog, content: e.target.value })
                  : setNewBlog({ ...newBlog, content: e.target.value })
              }
            />
            <input
              type="file"
              onChange={editBlog.id ? handleImageChange : handleImageChangeadd}
              className="mb-4 p-2"
            />
            <div className="flex justify-between items-center">
              <button
                onClick={editBlog.id ? handleUpdateBlog : handleAddBlog}
                className="bg-orange-500 text-white py-2 px-4 rounded"
              >
                {editBlog.id ? "Update" : "Add"}
              </button>
              <button
                onClick={handleModalClose}
                className=" text-orange-500 py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsActivity;
