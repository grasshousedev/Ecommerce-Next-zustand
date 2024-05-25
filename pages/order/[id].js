import { client } from "../../lib/client";
import Layout from "../../components/Layout";
import styles from "../../styles/Order.module.css";
import { UilBill, UilBox } from "@iconscout/react-unicons";
import Spinner from "../../assets/spinner.svg";
import Cooking from "../../assets/cooking.png";
import Onway from "../../assets/onway.png";
import Confirmed from "../../assets/confirmed.svg";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";
import { url } from "../../constants/constants";

export const getServerSideProps = async ({ params }) => {
  const { id } = params;

  try {
    const response = await axios.get(`${url}/api/customer/orders/${id}`); // Make HTTP GET request to fetch order details by ID
    const order = response.data;

    return {
      props: {
        order,
      },
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    return {
      props: {
        order: null,
      },
    };
  }
};

const Orders = ({ order }) => {
  useEffect(() => {
    order.status > 3 && localStorage.clear();
  }, [order]);

  return (
    <Layout>
      <div className={styles.container}>
        <span className={styles.heading}>Order in Process</span>

        <div className={styles.details}>
          <div>
            <span>Order ID </span>
            <span>{order.trackingId}</span>
          </div>

          <div>
            <span>Customer Name </span>
            <span>{order.user.name}</span>
          </div>

          <div>
            <span>Method </span>
            <span>{order.payment}</span>
          </div>

          <div>
            <span>Total </span>
            <span>${order.amount}</span>
          </div>
        </div>

        <div className={styles.statusContainer}>
          <div className={styles.status}>
            <UilBill width={50} height={50} />

            <span>Payment </span>
            {order.method === "on delivery" ? (
              <span className={styles.pending}>On Delivery</span>
            ) : (
              <span className={styles.completed}>Completed</span>
            )}
          </div>
          <div className={styles.status}>
            <Image src={Cooking} alt="" width={50} height={50} />
            <span>Cooking</span>

            {order.orderStatusValue === 1 && (
              <div className={styles.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            )}

            {order.orderStatusValue > 1 && (
              <span className={styles.completed}>Completed</span>
            )}
          </div>

          <div className={styles.status}>
            <Image src={Onway} alt="" width={50} height={50} />
            <span>OnWay</span>

            {order.orderStatusValue === 2 && (
              <div className={styles.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            )}

            {order.orderStatusValue > 2 && (
              <span className={styles.completed}>Completed</span>
            )}
          </div>

          <div className={styles.status}>
            <UilBox width={50} height={50} />
            <span>Delivered</span>

            {order.orderStatusValue === 3 && (
              <div className={styles.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            )}

            {order.orderStatusValue > 3 && (
              <span className={styles.completed}>Completed</span>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
