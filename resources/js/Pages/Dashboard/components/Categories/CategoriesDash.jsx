import React, { useState, useEffect } from "react";
import { fetchCategories, Host } from "../../../Api/Api";
import { Link } from "react-router-dom";

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", namear: "" });
  const [editingCategory, setEditingCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const categoryData = editingCategory || newCategory;
    const setter = editingCategory ? setEditingCategory : setNewCategory;
    setter({ ...categoryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingCategory
      ? `${Host}/api/v1/cat/${editingCategory.id}`
      : `${Host}/api/v1/cat`;
    const method = editingCategory ? "PUT" : "POST";
    const categoryData = editingCategory || newCategory;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setEditingCategory(null);
        setNewCategory({ name: "", namear: "" });
        fetchData();
      } else {
        console.error("Error saving category", response);
      }
    } catch (error) {
      console.error("Error saving category", error);
    }
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;

    try {
      const response = await fetch(
        `${Host}/api/v1/cat/${categoryToDelete}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setCategories(categories.filter(({ id }) => id !== categoryToDelete));
        setDeleteModalOpen(false);
        setCategoryToDelete(null);
      } else {
        console.error("Error deleting category", response);
      }
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  const filteredCategories = categories.filter(
    ({ name, namear }) =>
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      namear.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full gap-5  bg-[#F3ECE6] px-6 py-4">
      {/* Header */}
      <div className="flex justify-between flex-col gap-2 md:flex-row w-full items-center mb-6">
        <input
          type="text"
          placeholder="Search here"
          className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-orange-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          onClick={() => {
            setIsModalOpen(true);
            setEditingCategory(null);
          }}
        >
          + New Category
        </button>
      </div>

      {/* Table */}
      <div className="flex justify-center items-center w-full bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr>
             
              <th className="py-3 px-4 text-center font-medium text-gray-600">
                Name
              </th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">
                Name ar
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map(({ id, name, namear }) => (
              <tr
                key={id}
                className="border-b hover:bg-gray-50 relative"
              >
                
                <td className="py-3 px-4 text-center">{name}</td>
                <td className="py-3 px-4 text-center">{namear}</td>
                <td className="py-3 px-4 text-center">
                  <button onClick={() => setDropdownOpen(dropdownOpen === id ? null : id)}>...</button>
                  {dropdownOpen === id && (
                    <div className="absolute bg-white right-10 shadow-lg mt-2 z-50 w-40 rounded border border-gray-300">
                      <Link  to={`/dashboard/menu/${id}`}
                        className="w-full text-left flex justify-start  px-4 py-2 text-gray-700 hover:bg-gray-100"
                       
                      >
                       All Products 
                      </Link>
                      <button
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setEditingCategory(categories.find((cat) => cat.id === id));
                          setIsModalOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setDeleteModalOpen(true);
                          setCategoryToDelete(id);
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

      {/* Modals */}
      {isModalOpen && (
        <Modal
          title={editingCategory ? "Edit Category" : "Add New Category"}
          onClose={() => setIsModalOpen(false)}
        >
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Name"
              name="name"
              value={editingCategory?.name || newCategory.name}
              onChange={handleInputChange}
              required
            />
            <TextInput
              label="name ar"
              name="namear"
              value={editingCategory?.namear || newCategory.namear}
              onChange={handleInputChange}
              required
            />
            <div className="flex justify-between">
              <Button type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {editingCategory ? "Update" : "Add Category"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {deleteModalOpen && (
        <Modal
          title="Delete Category"
          onClose={() => setDeleteModalOpen(false)}
        >
          <p>Are you sure you want to delete this category?</p>
          <div className="flex justify-between">
            <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      {children}
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
        X
      </button>
    </div>
  </div>
);
const TextInput = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-gray-700 mb-2">{label}</label>
    <input className="w-full p-2 border border-gray-300 rounded" {...props} />
  </div>
);

const Button = ({ children, variant = "default", ...props }) => {
  const className =
    variant === "primary"
      ? "bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
      : variant === "danger"
      ? "bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      : "bg-gray-300 text-gray-700 py-2 px-4 rounded";
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default CategoriesTable;
