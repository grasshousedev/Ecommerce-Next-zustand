import Head from "next/head";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import styles from "../styles/Home.module.css"
import Services from "../components/Services";
import { client } from "../lib/client"
import Menu from "../components/Menu";




export default function Home({ food, heroImages, foodCategories}) {
  
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
          <Hero heroImages={heroImages} />
          <Services />
          <Menu food={food} foodCategories={foodCategories} />
        </main>
      </div>
    </Layout>

  );
}


export const getServerSideProps = async () => {
  const foodQuery = '*[_type == "food"]'
  const food = await client.fetch(foodQuery)
  const heroImageQuery = '*[_type == "banner"]'
  const heroImages = await client.fetch(heroImageQuery)
  const foodCategoryQuery= '*[_type == "category"]'
  const foodCategories = await client.fetch(foodCategoryQuery)
  
  
  return {
    props: {
      food,
      heroImages,
      foodCategories,
    }
  }

}




