import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/AdminSideBar.module.css";

const AdminSidebar = () => {
  const router = useRouter();
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.list}>
        <li className={styles.selected} onClick={() => router.push("/admin/")}>
          Categories
        </li>
        <li onClick={() => router.push("/admin/Products")}>Products</li>
        <li onClick={() => router.push("/admin/Orders")}>Orders</li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
