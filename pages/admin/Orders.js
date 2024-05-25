import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Admin.module.css";
import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";
import ProtectedRoute from "../../components/ProtectedRoute";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { url } from "../../constants/constants";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/customer/orders/all`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const onUpdateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${url}/api/customer/orders/${orderId}/status/${newStatus}`
      );
      // Update the local orders list after successful update
      toast.success("Order status updated");
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <AdminHeader />
        <div className={styles.mainContainer}>
          <main className={styles.main}>
            <AdminSidebar />
            <div>
              <span className={styles.title}>Manage Orders</span>

              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Ordered Products</th>
                    <th>Products Quantities</th>
                    <th>Products Sizes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>
                          {/* Display ordered products */}
                          {order.orderItems.map((item) => (
                            <div key={item.id}>{item.productName}</div>
                          ))}
                        </td>
                        <td>
                          {/* Display quantities */}
                          {order.orderItems.map((item) => (
                            <div key={item.id}>{item.quantity}</div>
                          ))}
                        </td>
                        <td>
                          {/* Display sizes */}
                          {order.orderItems.map((item) => (
                            <div key={item.id}>{item.size}</div>
                          ))}
                        </td>
                        <td className={styles.buttons}>
                          <button
                            onClick={() => onUpdateStatus(order.id, "Cooking")}
                          >
                            Cooking
                          </button>
                          <button
                            onClick={() => onUpdateStatus(order.id, "OnWay")}
                          >
                            On the way
                          </button>
                          <button
                            onClick={() =>
                              onUpdateStatus(order.id, "Delivered")
                            }
                          >
                            Delivered
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </ProtectedRoute>
  );
};

export default Orders;
