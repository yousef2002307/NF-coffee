import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchUsers, addAdmin, deleteUser  } from "../../../Api/Api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
  });
  const [messagePopup, setMessagePopup] = useState({ isOpen: false, message: "", isError: false });
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);  // State for confirmation modal
  const [userToDelete, setUserToDelete] = useState(null);  // Track user to delete
  const navigate = useNavigate();

  // Fetch users data
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const userData = await fetchUsers(currentPage, token);
        setUsers(userData.data);
        setTotalPages(userData.last_page);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDropdownToggle = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleInfoClick = (id) => {
    navigate(`/dashboard/info/${id}`);
  };

  const handleDelete = (id) => {
    setUserToDelete(id);  // Set the user to delete
    setIsConfirmDeleteOpen(true);  // Open the confirmation modal
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      const token = localStorage.getItem("token");
      try {
        await deleteUser(userToDelete, token);
        setUsers(users.filter((user) => user.id !== userToDelete));
        setMessagePopup({
          isOpen: true,
          message: "User deleted successfully.",
          isError: false,
        });
      } catch (error) {
        setMessagePopup({
          isOpen: true,
          message: "Failed to delete user.",
          isError: true,
        });
      }
    }
    setIsConfirmDeleteOpen(false);  // Close the confirmation modal
  };

  const cancelDelete = () => {
    setIsConfirmDeleteOpen(false);  // Close the confirmation modal without deleting
  };

  const handleAddAdminClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddAdminSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await addAdmin(newAdminData, token);
      setMessagePopup({
        isOpen: true,
        message: "Admin added successfully.",
        isError: false,
      });
      setIsModalOpen(false);
    } catch (error) {
      setMessagePopup({
        isOpen: true,
        message: "Failed to add admin.",
        isError: true,
      });
    }
  };

  // Close the message popup after a certain time
  useEffect(() => {
    if (messagePopup.isOpen) {
      setTimeout(() => setMessagePopup({ ...messagePopup, isOpen: false }), 3000);
    }
  }, [messagePopup]);

  return (
    <div className="flex flex-col w-full m-auto   ml-auto gap-5 h-full bg-[#F3ECE6] px-6 py-4">
      <div className="flex justify-between flex-col md:flex-row gap-2 items-center mb-6">
        <input
          type="text"
          placeholder="Search here"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
       
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          onClick={handleAddAdminClick}
        >
          + New Users
        </button>
      </div>

      {/* Table */}
      <div className="flex justify-center items-center w-full bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-white">
              <th className="py-3 px-4 text-center font-medium text-gray-600">ID</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Name</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Email</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Phone</th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-center text-gray-800">{user.id}</td>
                <td className="py-3 px-4 text-center text-gray-800">{user.name}</td>
                
                <td   className="py-3 px-4 text-center font-medium text-gray-600 truncate" 
  style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
>{user.email}</td>
                <td   className="py-3 px-4 text-center font-medium text-gray-600 truncate" 
  style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
>{user.phone || "N/A"}</td>
                <td className="py-3 px-4 text-center text-gray-800 relative">
                  <button
                    onClick={() => handleDropdownToggle(index)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ...
                  </button>
                  {dropdownIndex === index && (
                    <div className="absolute bg-white right-10 shadow-lg mt-2 z-50 w-40 rounded border border-gray-300">
                      <button
                        onClick={() => handleInfoClick(user.id)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Info
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)} // Trigger delete function
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
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

      
      {isConfirmDeleteOpen && (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg sm:max-w-md">
            <p className="text-center text-gray-800">Are you sure you want to delete this user?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={cancelDelete}
                className="p-2 bg-gray-300 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="p-2 bg-orange-500 text-white rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

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
      {messagePopup.isOpen && (
        <div className={`fixed inset-0 flex justify-center z-50 items-center bg-gray-600 bg-opacity-50`}>
          <div className={`bg-white p-6 rounded-lg shadow-lg w-1/3 ${messagePopup.isError ? 'border-red-500' : 'border-green-500'}`}>
            <p className="text-center text-gray-800">{messagePopup.message}</p>
          </div>
        </div>
      )}
 
      {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg sm:max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add New Admin</h2>
            <form onSubmit={handleAddAdminSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newAdminData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newAdminData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={newAdminData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <input
                  type="text"
                  name="role"
                  value={newAdminData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mr-4 p-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-2 bg-orange-500 text-white rounded hover:bg-blue-600"
                >
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
