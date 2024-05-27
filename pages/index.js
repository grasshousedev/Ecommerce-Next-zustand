import Head from "next/head";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import styles from "../styles/Home.module.css";
import Services from "../components/Services";
import Menu from "../components/Menu";
import axios from "axios";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import { url } from "../constants/constants";

export default function Home({ food, foodCategories }) {
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

export const getServerSideProps = async () => {
  try {
    const foodResponse = await axios.get(`${url}/api/admin/products`);
    const food = foodResponse.data;

    const foodCategoryResponse = await axios.get(`${url}/api/admin/categories`);
    const foodCategories = foodCategoryResponse.data;

    return {
      props: {
        food,
        foodCategories,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        food: [],
        foodCategories: [],
      },
    };
  }
};
