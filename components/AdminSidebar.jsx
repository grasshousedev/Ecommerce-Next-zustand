import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/AdminSideBar.module.css";

const AdminSidebar = () => {
  const router = useRouter();

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.list}>
        <li
          className={router.pathname === "/admin" ? styles.selected : ""}
          onClick={() => router.push("/admin/")}
        >
          Categories
        </li>
        <li
          className={
            router.pathname === "/admin/Products" ? styles.selected : ""
          }
          onClick={() => router.push("/admin/Products")}
        >
          Products
        </li>
        <li
          className={router.pathname === "/admin/Orders" ? styles.selected : ""}
          onClick={() => router.push("/admin/Orders")}
        >
          Orders
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
