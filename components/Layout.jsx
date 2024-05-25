import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/Layout.module.css";
import { useStore } from "../store/store";

const Layout = ({ children }) => {
  const darkMode = useStore((state) => state.mode && state.mode.darkMode);

  return (
    <div className={darkMode ? `${styles.darkMode}` : ""}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
