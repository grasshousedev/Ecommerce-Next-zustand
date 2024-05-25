import styles from "../styles/UserMenu.module.css";
import Link from "next/link";
import { useStore } from "../store/store";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useAuth } from "../Contexts/AuthContext";

const UserMenu = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const { logout } = useAuth();
  const LogoutAndClose = async () => {
    setIsOpen(false);
    typeof window !== "undefined" && localStorage.clear();
    try {
      await logout();
      router.push("/login");
    } catch {
      toast.error("Failde to logout!");
    }

    router.push("/");
  };

  return (
    isOpen && (
      <div className={styles.container}>
        <p onClick={LogoutAndClose}>Logout</p>
        <Toaster />
      </div>
    )
  );
};

export default UserMenu;
