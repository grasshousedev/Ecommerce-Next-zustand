import { useStore } from "../store/store";
import Layout from "../components/Layout";
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { urlFor } from "../lib/client";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import OrderModal from "../components/OrderModal";
import ProtectedRoute from "../components/ProtectedRoute";

const Cart = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const cartData = useStore((state) => state.cart);
  const removeDish = useStore((state) => state.removeDish);

  const handleRemove = (index) => {
    removeDish(index);
    toast.error("Item Removed");
  };
  const total = () =>
    cartData.dishes.reduce((a, b) => a + b.quantity * b.price, 0);
  const totalAmount = total();

  const handleOnDelivery = () => {
    totalAmount === 0
      ? toast.error("Add Items to the cart first")
      : setPaymentMethod(0);
    typeof window !== "undefined" && localStorage.setItem("total", total());
  };

  const handleOnlinePayment = () => {
    toast("This option is not available for now! Coming soon", {
      icon: "😉",
    });
  };

  return (
    <Layout>
      <ProtectedRoute>
        <div className={styles.container}>
          {/* DETAILS */}
          <div className={styles.details}>
            <table className={styles.table}>
              <thead>
                <th>Image</th>
                <th>Name</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </thead>

              <tbody className={styles.tbody}>
                {cartData.dishes.length > 0 &&
                  cartData.dishes.map((dish, index) => {
                    return (
                      <tr key={index} className={styles.tr}>
                        <td className={styles.imageTd} data-label="Image">
                          <Image
                            src={`data:image/jpeg;base64,${dish.image}`}
                            alt=""
                            objectFit="cover"
                            width={85}
                            height={85}
                          />
                        </td>

                        <td data-label="Name">{dish.name}</td>

                        <td data-label="Size">
                          {dish.size === 0
                            ? "Small"
                            : dish.size === 1
                            ? "Medium"
                            : "Large"}
                        </td>

                        <td data-label="Price">{dish.price}</td>

                        <td data-label="Quantity">{dish.quantity}</td>

                        <td data-label="Total">{dish.price * dish.quantity}</td>

                        <td
                          onClick={() => handleRemove(index)}
                          style={{
                            color: "var(--themeRed)",
                            cursor: "pointer",
                          }}
                          className={styles.cross}
                        >
                          x
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* SUMMARY */}
          <div className={styles.cart}>
            <span>Cart</span>

            <div className={styles.cartDetails}>
              <div>
                <span>Items </span>
                <span>{cartData.dishes.length}</span>
              </div>

              <div>
                <span>Total </span>
                <span>${total()}</span>
              </div>

              <div className={styles.buttons}>
                <button className="btn" onClick={handleOnDelivery}>
                  Pay On Delivery
                </button>
                <button className="btn" onClick={handleOnlinePayment}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
        {/* MODAL */}
        <OrderModal
          opened={paymentMethod === 0}
          setOpened={setPaymentMethod}
          paymentMethod={paymentMethod}
        />
      </ProtectedRoute>
    </Layout>
  );
};

export default Cart;
