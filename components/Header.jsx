import styles from "../styles/Header.module.css";
import Image from "next/image";
import Logo from "../assets/Logo.png";
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
import { useStore } from "../store/store";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import UserMenu from "./UserMenu";
import { useAuth } from "../pages/Contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useRouter } from "next/router";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      setUserName(user.username);
    }
  }, [user]);

  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [userMenu, setUserMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [userName, setUserName] = useState("");
  console.log(mobileMenu);

  const mobileNavigation = () => {
    setMobileMenu(true);
  };

  const handleClickOutside = (e) => {
    if (!userMenuRef.current?.contains(e.target)) {
      setUserMenu(false);
    }
    // if(!mobileMenuRef.current?.contains(e.target) && !hamburgerRef.current?.contains(e.target)) {
    //     setMobileMenu(false);
    // }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const router = useRouter();
  const [order, setOrder] = useState("");
  useEffect(() => {
    setOrder(localStorage.getItem("order"));
  }, []);

  const LogoutAndClose = async () => {
    setMobileMenu(false);
    typeof window !== "undefined" && localStorage.clear();
    try {
      await logout();
      router.push("/login");
    } catch {
      toast.error("Failde to logout!");
    }

    router.push("/");
  };

  const items = useStore((state) => state.cart.dishes.length);
  const darkMode = useStore((state) => state.mode && state.mode.darkMode);
  const darkModeOn = useStore((state) => state.darkModeOn);
  const darkModeOff = useStore((state) => state.darkModeOff);
  const userInfo = useStore((state) => state.userInfo);

  const [mobileUserMenu, setMobileUserMenu] = useState(false);
  const handleMobileUserMenu = () => {
    setMobileUserMenu((prevState) => !prevState);
  };

  const handlerDarkMode = () => {
    darkMode ? darkModeOff() : darkModeOn();
    const newMode = !darkMode;
    Cookies.set("darkMode", darkMode ? "ON" : "OFF");
  };

  const handleUserMenu = () => {
    setUserMenu((prevState) => !prevState);
  };

  return (
    <div className={styles.header}>
      {/* LOGO SIDE */}
      <div className={styles.logo}>
        <Image src={Logo} alt="" width={50} height={50} />
        <span className={styles.logoText}>Chepe-chepe</span>
      </div>

      {/* MENU SIDE */}
      <ul className={styles.menu}>
        <li>
          <Link href="../">Home</Link>
        </li>

        <li>
          <Link href="../#menu">Menu</Link>
        </li>

        <li>
          <Link href="../#contact">Contact</Link>
        </li>

        <li>
          <Link href="../#services">Services</Link>
        </li>
      </ul>

      {/* RIGTH SIDE */}
      <div className={styles.rightSide}>
        {/* <div className={styles.toggler} >
                    <UilSun className={!darkMode ? `${styles.active}` : undefined} onClick={handlerDarkMode}/>
                    <UilMoon  className={ darkMode ? `${styles.active}` : undefined} onClick={handlerDarkMode}/>
                </div> */}

        {isAuthenticated ? (
          <div
            className={styles.userMenu}
            onClick={handleUserMenu}
            ref={userMenuRef}
          >
            <UilUser size={20} />
            <p className={styles.user}>{user.username}</p>
            {userMenu ? (
              <UilAngleDown size={20} className={styles.rotatedIcon} />
            ) : (
              <UilAngleDown size={20} />
            )}
          </div>
        ) : (
          <div className={styles.authButton}>
            <Link href="/login">
              <button className={` btn ${styles.login}`}>Login</button>
            </Link>

            <Link href="/register">
              <button className={`btn ${styles.signUp}`}>Register</button>
            </Link>
          </div>
        )}

        {/* USER MENU */}

        <UserMenu
          isOpen={userMenu}
          setIsOpen={setUserMenu}
          className={styles.userMenu}
        />

        <Link href="/cart">
          <div className={styles.cart}>
            <UilShoppingBag
              size={35}
              className={styles.cartIcon}
              color="#2E2E2E"
            />
            <div className={styles.badge}>{items}</div>
          </div>
        </Link>

        {order && (
          <Link href={`/order/${order}`}>
            <div className={styles.cart}>
              <UilReceipt
                size={30}
                className={styles.receipt}
                color="#2E2E2E"
              />
              {order != "" && <div className={styles.badge}>1</div>}
            </div>
          </Link>
        )}

        {/* MOBILE MENU */}
        {mobileMenu ? (
          <UilTimes
            size={30}
            className={styles.cross}
            onClick={() => setMobileMenu(false)}
          />
        ) : (
          <div
            ref={hamburgerRef}
            onClick={mobileNavigation}
            className={styles.hamburger}
          >
            <UilBars size={30} />
          </div>
        )}

        {mobileMenu && (
          <ul className={styles.mobileMenu} ref={mobileMenuRef}>
            {currentUser ? (
              <div
                className={styles.mobileUserMenu}
                onClick={handleMobileUserMenu}
              >
                <p className={styles.user}>{userName}</p>
                {mobileUserMenu ? (
                  <UilAngleDown size={20} className={styles.rotatedIcon} />
                ) : (
                  <UilAngleDown size={20} />
                )}
              </div>
            ) : (
              <div className={styles.authButtonMobile}>
                <Link href="/login">
                  <button className={` btn ${styles.login}`}>Login</button>
                </Link>

                <Link href="/register">
                  <button className={`btn ${styles.signUp}`}>Register</button>
                </Link>
              </div>
            )}

            {isAuthenticated && mobileUserMenu && (
              <div className={styles.mobileUserMenuItems}>
                <li>
                  <Link href="/account" onClick={() => setUserMenu(false)}>
                    Account
                  </Link>
                </li>

                <li>
                  <p onClick={LogoutAndClose}>Logout</p>
                </li>
              </div>
            )}

            <li>
              <Link href="../">Home</Link>
            </li>

            <li>
              <Link href="../#menu">Menu</Link>
            </li>

            <li>
              <Link href="../#contact">Contact</Link>
            </li>

            <li>
              <Link href="../#services">Services</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
