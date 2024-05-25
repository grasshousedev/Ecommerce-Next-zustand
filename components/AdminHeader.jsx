import React from "react";
import styles from "../styles/AdminHeader.module.css";
import Logo from "../assets/Logo.png";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../Contexts/AuthContext";
import UserMenu from "./UserMenu";
import {
  UilShoppingBag,
  UilReceipt,
  UilSun,
  UilMoon,
  UilBars,
  UilTimes,
  UilUser,
  UilAngleDown,
} from "@iconscout/react-unicons";

const AdminHeader = () => {
  const [userName, setUserName] = useState("");
  const [userMenu, setUserMenu] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      setUserName(user.username);
    }
  }, [user]);

  const handleUserMenu = () => {
    setUserMenu((prevState) => !prevState);
  };

  const userMenuRef = useRef(null);
  const handleClickOutside = (e) => {
    if (!userMenuRef.current?.contains(e.target)) {
      setUserMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={Logo} alt="" width={50} height={50} />
        <span className={styles.logoText}>Chepe-chepe</span>
      </div>

      <div
        className={styles.userMenu}
        onClick={handleUserMenu}
        ref={userMenuRef}
      >
        <UilUser size={20} />
        <p className={styles.user}>{user?.username}</p>
        {userMenu ? (
          <UilAngleDown size={20} className={styles.rotatedIcon} />
        ) : (
          <UilAngleDown size={20} />
        )}
        <div className={styles.userModal}>
          <UserMenu
            isOpen={userMenu}
            setIsOpen={setUserMenu}
            className={styles.userMenu}
          />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
