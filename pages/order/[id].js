import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import styles from "../../styles/Order.module.css";
import { UilBill, UilBox } from "@iconscout/react-unicons";
import Spinner from "../../assets/spinner.svg";
import Cooking from "../../assets/cooking.png";
import Onway from "../../assets/onway.png";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { url } from "../../constants/constants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Orders = () => {
  const router = useRouter();
  const { id } = router.query;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        try {
          const response = await axios.get(`${url}/api/customer/orders/${id}`);
          setOrder(response.data);
        } catch (error) {
          console.error("Error fetching order:", error);
          setError("Failed to fetch order details");
        } finally {
          setLoading(false);
        }
      };

      fetchOrder();
    }
  }, [id]);

  useEffect(() => {
    if (order && order.status > 3) {
      localStorage.clear();
    }
  }, [order]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <span className={styles.heading}>Order in Process</span>

        <div className={styles.details}>
          <div>
            <span>Order ID </span>
            <span>{loading ? <Skeleton width={200} /> : order.trackingId}</span>
          </div>

          <div>
            <span>Customer Name </span>
            <span>{loading ? <Skeleton width={150} /> : order.user.name}</span>
          </div>

          <div>
            <span>Method </span>
            <span>{loading ? <Skeleton width={100} /> : order.payment}</span>
          </div>

          <div>
            <span>Total </span>
            <span>
              {loading ? <Skeleton width={50} /> : `$${order.amount}`}
            </span>
          </div>
        </div>

        <div className={styles.statusContainer}>
          <div className={styles.status}>
            <UilBill width={50} height={50} />
            <span>Payment </span>
            {loading ? (
              <Skeleton width={100} />
            ) : order.method === "on delivery" ? (
              <span className={styles.pending}>On Delivery</span>
            ) : (
              <span className={styles.completed}>Completed</span>
            )}
          </div>

          <div className={styles.status}>
            <Image src={Cooking} alt="" width={50} height={50} />
            <span>Cooking</span>
            {loading ? (
              <Skeleton width={100} />
            ) : order.orderStatusValue === 1 ? (
              <div className={styles.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            ) : order.orderStatusValue > 1 ? (
              <span className={styles.completed}>Completed</span>
            ) : null}
          </div>

          <div className={styles.status}>
            <Image src={Onway} alt="" width={50} height={50} />
            <span>OnWay</span>
            {loading ? (
              <Skeleton width={100} />
            ) : order.orderStatusValue === 2 ? (
              <div className={styles.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            ) : order.orderStatusValue > 2 ? (
              <span className={styles.completed}>Completed</span>
            ) : null}
          </div>

          <div className={styles.status}>
            <UilBox width={50} height={50} />
            <span>Delivered</span>
            {loading ? (
              <Skeleton width={100} />
            ) : order.orderStatusValue === 3 ? (
              <div className={styles.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            ) : order.orderStatusValue > 3 ? (
              <span className={styles.completed}>Completed</span>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
