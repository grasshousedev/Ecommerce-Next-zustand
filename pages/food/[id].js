import Layout from "../../components/Layout";
import Image from "next/image";
import styles from "../../styles/Dish.module.css";
import LeftArrow from "../../assets/arrowLeft.png";
import rightArrow from "../../assets/arrowRight.png";
import { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { url } from "../../constants/constants";

const Food = ({ dish }) => {
  const [size, setSize] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type) => {
    type === "increment"
      ? setQuantity((prevQuantity) => prevQuantity + 1)
      : quantity === 1
      ? null
      : setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const addDish = useStore((state) => state.addDish);
  const dishes = useStore((state) => state.cart.dishes);

  const [addedDishes, setAddedDishes] = useState([]);

  useEffect(() => {
    const storedDishes = localStorage.getItem("dishes");
    if (storedDishes) {
      setAddedDishes(JSON.parse(storedDishes));
    }
  }, []);

  const addToCart = () => {
    const newDish = {
      ...dish,
      price: dish.price[size],
      quantity: quantity,
      size: size,
    };
    const newDishes = [...dishes, newDish];

    addDish(newDish);
    setAddedDishes(newDishes);

    typeof window !== "undefined" &&
      localStorage.setItem("dishes", JSON.stringify(newDishes));
    toast.success("Added to cart");
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            alt=""
            src={`data:image/jpeg;base64,${dish.image}`}
            unoptimized
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <span>{dish.name}</span>
          <span>{dish.description}</span>
          <span>
            {" "}
            <span style={{ color: "var(--themeRed)" }}>$</span>{" "}
            {dish.price[size]}
          </span>
          <div className={styles.size}>
            <span>Size</span>
            <div className={styles.sizeVariants}>
              <div
                onClick={() => setSize(0)}
                className={size === 0 ? styles.selected : ""}
              >
                Small
              </div>

              <div
                onClick={() => setSize(1)}
                className={size === 1 ? styles.selected : ""}
              >
                Medium
              </div>

              <div
                onClick={() => setSize(2)}
                className={size === 2 ? styles.selected : ""}
              >
                Large
              </div>
            </div>
          </div>

          {/* QUANTITY COUNTER */}
          <div className={styles.quantity}>
            <span>Quantity</span>
            <div className={styles.counter}>
              <Image
                src={LeftArrow}
                height={20}
                width={20}
                alt=""
                objectFit="contain"
                onClick={() => handleQuantity("decrement")}
              />

              <span>{quantity}</span>

              <Image
                src={rightArrow}
                height={20}
                width={20}
                alt=""
                objectFit="contain"
                onClick={() => handleQuantity("increment")}
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className={`btn ${styles.btn}`} onClick={addToCart}>
            Add to Cart
          </div>
        </div>
        <Toaster />
      </div>
    </Layout>
  );
};

export default Food;

async function getProductById(id) {
  try {
    console.log(`Fetching dish with id ${id} from API`); // Add this line
    const response = await axios.get(`${url}/api/admin/product/${id}`);
    console.log("API response:", response.data); // Add this line
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
}

// Function to fetch all products (required for getStaticPaths)
async function getAllProducts() {
  try {
    const response = await axios.get(`${url}/api/admin/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

export async function getStaticPaths() {
  // Get all product IDs from your backend
  const allProducts = await getAllProducts();
  const paths = allProducts.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths: paths,
    fallback: "blocking", // or 'true' if you want to use client-side rendering for missing paths
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  console.log("Fetching dish with id:", id); // Add this line

  const dish = await getProductById(id);
  console.log("Fetched dish:", dish); // Add this line

  return {
    props: {
      dish,
    },
  };
}
