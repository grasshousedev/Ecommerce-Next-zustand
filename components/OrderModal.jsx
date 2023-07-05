import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "../store/store";
import { createOrder } from "../lib/orderHandler";
import styles from "../styles/OrderModal.module.css";
import { useRouter } from "next/router";
import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../pages/Contexts/AuthContext";

const OrderModal = ({ opened, setOpened, paymentMethod }) => {
  const total = typeof window !== "undefined" && parseFloat(localStorage.getItem("total"));
  const dishes = typeof window !== "undefined" && JSON.parse(localStorage.getItem("dishes"));
  const dishSlugs = [];
  const dishQuantities = [];
  const dishSizes = [];

  if (dishes && dishes.length > 0) {
    dishes.forEach((dish) => {
      dishSlugs.push(dish.slug);
      dishQuantities.push(dish.quantity);
      dishSizes.push(dish.size);
    });
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);

  const theme = useMantineTheme();
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const resetCart = useStore((state) => state.resetCart);
  const { currentUser } = useAuth();
  const [disableOrderSubmission, setDisableOrderSubmission] = useState(false);

  // Form validation
  const validate = () => {
    const errors = {};
    const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g;

    if (!formData.name) {
      errors.name = "Name is required!";
    }
    if (!formData.phone) {
      errors.phone = "Phone number is required!";
    } else if (!regex.test(formData.phone)) {
      errors.phone = "This is not a valid phone number format!";
    }

    if (!formData.address) {
      errors.address = "Address is required!";
    }

    return errors;
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    setDisableOrderSubmission(true);

    if (Object.keys(errors).length === 0) {
      try {
        const id = await createOrder({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          dishSlugs,
          dishQuantities,
          dishSizes,
          total,
          paymentMethod,
          formattedDate,
        });

        await setOrderDetails(id);
        toast.success("Order Placed");
        resetCart();

        if (typeof window !== "undefined") {
          localStorage.setItem("order", id);
        }
      
        router.push(`/order/${id}`);
      } catch (error) {
        console.log(error);
        toast.error("Error, couldn't place an order!");
      }
    }
  };

  const setOrderDetails = async (id) => {
    try {
      const userDocRef = doc(db, "orders", currentUser.uid);
      await setDoc(userDocRef, {
        id,
        name: formData.name,
        address: formData.address,
        phoneNumber: formData.phone,
        dishSlugs,
        dishQuantities,
        dishSizes,
        total,
        date: formattedDate,
      });
    } catch (error) {
      console.log(error);
      toast.error("Couldn't place the order, try again");
    }
  };

  const handleFocus = (field) => {
    setFormErrors({ ...formErrors, [field]: "" });
  };

 

  return (
    <Modal
      overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={setOpened(null)}
    >
      {/* Modal content */}
      <form action="" className={styles.formContainer}>
        <input type="text" name="name" onChange={handleInput} onFocus={() =>handleFocus("name")} required placeholder="Name" />
        <p style={{ color: "red" }}>{formErrors.name}</p>

            <input type="text" name="phone" onChange={handleInput} onFocus={() =>handleFocus("phone")} required placeholder="Phone Number" />
        <p style={{ color: "red" }}>{formErrors.phone}</p>

        <textarea name="address" onChange={handleInput} onFocus={() =>handleFocus("address")} placeholder="Address" rows={3}></textarea>
        <p style={{ color: "red" }}>{formErrors.address}</p>

        <span>
          You will pay <span>${total} </span> on delivery
        </span>

        <button type="submit" onClick={handleSubmit} className="btn">
          Place Order
        </button>
      </form>
      <Toaster />
    </Modal>
  );
};

export default OrderModal;
