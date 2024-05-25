import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Admin.module.css";
import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";
import { Modal, useMantineTheme } from "@mantine/core";
import ProtectedRoute from "../../components/ProtectedRoute";
import toast, { Toaster } from "react-hot-toast";
import { url } from "../../constants/constants";

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal open state
  const router = useRouter();

  // Fetch categories from backend when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/admin/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/admin/category`, {
        name: newCategoryName,
      });
      setNewCategoryName("");
      toast.success("Category created");
      fetchCategories(); // Fetch categories again to update the list
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${url}/api/admin/category/${id}`);
      toast.success("Category deleted");
      fetchCategories(); // Fetch categories again to update the list
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const updateCategory = async () => {
    if (!selectedCategory) return; // Ensure a category is selected
    try {
      await axios.put(`${url}/api/admin/category/${selectedCategory.id}`, {
        name: newCategoryName,
      });
      fetchCategories(); // Fetch categories again to update the list
      setNewCategoryName(""); // Clear input after update
      setIsModalOpen(false); // Close the modal after update
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleRowClick = (category) => {
    setSelectedCategory(category); // Set the selected category
    setNewCategoryName(category.name); // Populate input with category name
    setIsModalOpen(true); // Open the modal
  };

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <AdminHeader />
        <div className={styles.mainContainer}>
          <main className={styles.main}>
            <div className={styles.sidebar}>
              <AdminSidebar />
            </div>

            <form className={styles.formContainer} onSubmit={createCategory}>
              <span>Create category</span>
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                required
              />

              <button type="submit" className="btn">
                Create
              </button>
            </form>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td onClick={() => handleRowClick(category)}>
                      {category.name}
                    </td>
                    <td className={styles.buttons}>
                      <button onClick={() => deleteCategory(category.id)}>
                        Delete
                      </button>
                      <button onClick={() => handleRowClick(category)}>
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Render modal */}
            <Modal
              opened={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Update Category"
              overlayColor="#000"
            >
              <div className={styles.modalContainer}>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <button onClick={updateCategory}>Update</button>
              </div>
            </Modal>
          </main>
        </div>
      </div>
      <Toaster />
    </ProtectedRoute>
  );
};

export default Index;
