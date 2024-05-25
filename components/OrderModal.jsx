import { Modal, useMantineTheme } from "@mantine/core";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "../store/store";
import styles from "../styles/OrderModal.module.css";
import { useRouter } from "next/router";
import { useAuth } from "../pages/Contexts/AuthContext";
import axios from "axios";
import { url } from "../constants/constants";

const getSizeFromIndex = (index) => {
  switch (index) {
    case 0:
      return "small";
    case 1:
      return "medium";
    case 2:
      return "large";
    default:
      return "";
  }
};

const getPaymentMethodFromCode = (code) => {
  switch (code) {
    case 0:
      return "on delivery";
    case 1:
      return "online";

    default:
      return "";
  }
};
const OrderModal = ({ opened, setOpened, paymentMethod }) => {
  const total =
    typeof window !== "undefined" && parseFloat(localStorage.getItem("total"));
  const dishes =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("dishes"));
  const dishSlugs = [];
  const dishQuantities = [];
  const dishSizes = [];

  const cartData = useStore((state) => state.cart);

  console.log(cartData.dishes);

  if (dishes && dishes.length > 0) {
    dishes.forEach((dish) => {
      dishSlugs.push(dish.id);
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
  const { user } = useAuth();
  console.log(user.userId);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (user) {
      setUserId(user.userId);
    }
  }, [user]);

  console.log(user);

  const [disableOrderSubmission, setDisableOrderSubmission] = useState(false);

  // Form validation
  const validate = () => {
    const errors = {};

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
        const orderItems = cartData.dishes.map((dish) => ({
          productId: dish.id,
          quantity: dish.quantity,
          size: getSizeFromIndex(dish.size),
        }));

        const requestBody = {
          orderItems,
          address: formData.address,
          paymentMethod: getPaymentMethodFromCode(paymentMethod),
          userId: Number(user.userId),
        };

        const response = await axios.post(
          `${url}/api/customer/orders/create`,
          requestBody
        );

        if (response.status === 201) {
          const { data } = response;
          toast.success("Order Placed");
          resetCart();

          if (typeof window !== "undefined") {
            localStorage.setItem("order", data.id);
          }
          toast.success("order placed");

          router.push(`/order/${data.id}`);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error, couldn't place an order!");
      }
    }
  };

  const handleFocus = (field) => {
    setFormErrors({ ...formErrors, [field]: "" });
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      {/* Modal content */}
      <form action="" className={styles.formContainer}>
        <textarea
          name="address"
          onChange={handleInput}
          onFocus={() => handleFocus("address")}
          placeholder="Address"
          rows={3}
        ></textarea>
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
