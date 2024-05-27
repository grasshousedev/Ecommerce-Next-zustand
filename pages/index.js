import Head from "next/head";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Menu from "../components/Menu";
import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../constants/constants";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [food, setFood] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foodResponse, foodCategoryResponse] = await Promise.all([
          axios.get(`${url}/api/admin/products`),
          axios.get(`${url}/api/admin/categories`),
        ]);

        setFood(foodResponse.data);
        setFoodCategories(foodCategoryResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Chepe-chepe</title>
          <meta name="description" content="Food delivery app" />
          <link rel="icon" href="/Logo.png" />
        </Head>

        {/* body */}
        <main>
          <Hero />
          <Services />
          <Menu food={food} foodCategories={foodCategories} />
        </main>
      </div>
    </Layout>
  );
}
