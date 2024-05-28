import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Admin.module.css";
import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";
import Image from "next/image";
import { Modal } from "@mantine/core";
import ProtectedRoute from "../../components/ProtectedRoute";
import toast, { Toaster } from "react-hot-toast";
import { url } from "../../constants/constants";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [prices, setPrices] = useState([0, 0, 0]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const handlePriceChange = (index, value) => {
    const newPrices = [...prices];
    newPrices[index] = parseFloat(value);
    setPrices(newPrices);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/admin/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    let retries = 3;
    while (retries > 0) {
      try {
        const response = await axios.get(`${url}/api/admin/products`, {
          timeout: 10000,
        });
        setProducts(response.data);
        return;
      } catch (error) {
        if (retries <= 1) {
          console.error("Error fetching products:", error);
          return;
        }
        retries -= 1;
        console.warn(`Retrying fetchProducts, attempts left: ${retries}`);
      }
    }
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = {
        name: name,
        price: prices,
        description: description,
        category: { id: parseInt(category) },
        image: image,
      };
      await axios.post(`${url}/api/admin/product`, formDataToSend);
      toast.success("Product created");
      fetchProducts();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${url}/api/admin/product/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "price":
        setPrices(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "image":
        setImage(value);
        break;
      default:
        break;
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        const base64Index = imageData.indexOf("base64,") + "base64,".length;
        const imageBytes = imageData.substring(base64Index);
        setImage(imageBytes);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setName(product.name);
    setPrices(product.price);
    setCategory(product.category.id);
    setDescription(product.description);
    setIsModalOpen(true);
  };

  const updateProduct = async () => {
    if (!selectedProduct) return;
    try {
      const formDataToSend = {
        name: name,
        price: prices,
        description: description,
        category: { id: parseInt(category) },
        image: image,
      };
      await axios.put(
        `${url}/api/admin/product/${selectedProduct.id}`,
        formDataToSend
      );
      fetchProducts();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <AdminHeader />
        <div className={styles.mainContainer}>
          <main className={styles.main}>
            <AdminSidebar />
            <form className={styles.formContainer} onSubmit={createProduct}>
              <span>Create Product</span>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Product Name"
                onChange={handleInputChange}
                required
              />

              <input
                type="number"
                value={prices[0]} // Small price
                placeholder="Small Price"
                onChange={(e) => handlePriceChange(0, e.target.value)}
                required
              />
              <input
                type="number"
                value={prices[1]} // Medium price
                placeholder="Medium Price"
                onChange={(e) => handlePriceChange(1, e.target.value)}
                required
              />
              <input
                type="number"
                value={prices[2]} // Large price
                placeholder="Large Price"
                onChange={(e) => handlePriceChange(2, e.target.value)}
                required
              />

              <select
                name="category"
                value={category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="description"
                value={description}
                placeholder="Product Description"
                onChange={handleInputChange}
                required
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />

              <button type="submit" className="btn">
                Create
              </button>
            </form>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Product Category</th>
                  <th>Product Description</th>
                  <th>Product Image</th>
                  <th>Delete Product</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} onClick={() => handleRowClick(product)}>
                    <td>{product.name}</td>
                    <td>
                      {product.price[0]}, {product.price[1]}, {product.price[2]}
                    </td>
                    <td>{product.category.name}</td>
                    <td>{product.description}</td>
                    <td>
                      <Image
                        src={`data:image/png;base64,${product.image}`}
                        width={50}
                        height={50}
                        alt="product image"
                      />
                    </td>
                    <td>
                      <button
                        className="btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProduct(product.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Toaster position="bottom-center" reverseOrder={false} />
          </main>
        </div>
        <Modal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Update Product"
        >
          <form className={styles.formContainer}>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Product Name"
              onChange={handleInputChange}
              required
            />

            <input
              type="number"
              value={prices[0]} // Small price
              placeholder="Small Price"
              onChange={(e) => handlePriceChange(0, e.target.value)}
              required
            />
            <input
              type="number"
              value={prices[1]} // Medium price
              placeholder="Medium Price"
              onChange={(e) => handlePriceChange(1, e.target.value)}
              required
            />
            <input
              type="number"
              value={prices[2]} // Large price
              placeholder="Large Price"
              onChange={(e) => handlePriceChange(2, e.target.value)}
              required
            />

            <select
              name="category"
              value={category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="description"
              value={description}
              placeholder="Product Description"
              onChange={handleInputChange}
              required
            />

            <input type="file" accept="image/*" onChange={handleImageUpload} />

            <button type="button" className="btn" onClick={updateProduct}>
              Update
            </button>
          </form>
        </Modal>
      </div>
    </ProtectedRoute>
  );
};

export default Products;
