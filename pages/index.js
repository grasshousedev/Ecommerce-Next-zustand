import Head from "next/head";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import styles from "../styles/Home.module.css";
import Services from "../components/Services";
import Menu from "../components/Menu";

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Chepe-chepe</title>
          <meta name="description" content="Food delivery app" />
          <link rel="icon" href="/Logo.png" />
        </Head>

        <main>
          <Hero />
          <Services />
          <Menu />
        </main>
      </div>
    </Layout>
  );
}
