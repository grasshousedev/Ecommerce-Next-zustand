import Layout from "../../components/Layout";
import styles from "../../styles/Order.module.css";
import { UilBill, UilBox } from "@iconscout/react-unicons";
import Spinner from "../../assets/spinner.svg";
import Cooking from "../../assets/cooking.png";
import Onway from "../../assets/onway.png";
import Confirmed from "../../assets/confirmed.svg";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useData } from "../../Contexts/DataContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Orders = () => {
  const { order, fetchOrder, orderLoading } = useData();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchOrder(id);
    }
  }, [id, fetchOrder]);

  useEffect(() => {
    if (order && order.status > 3) {
      localStorage.clear();
    }
  }, [order]);

  return (
    <Layout>
      <div className={styles.container}>
        <span className={styles.heading}>Order in Process</span>

        <div className={styles.details}>
          <div>
            <span>Order ID </span>
            <span>
              {orderLoading ? <Skeleton width={150} /> : order.trackingId}
            </span>
          </div>

          <div>
            <span>Customer Name </span>
            <span>
              {orderLoading ? <Skeleton width={150} /> : order.user.name}
            </span>
          </div>

          <div>
            <span>Method </span>
            <span>
              {orderLoading ? <Skeleton width={100} /> : order.payment}
            </span>
          </div>

          <div>
            <span>Total </span>
            <span>
              {orderLoading ? <Skeleton width={50} /> : `$${order.amount}`}
            </span>
          </div>
        </div>

        <div className={styles.statusContainer}>
          <div className={styles.status}>
            <UilBill width={50} height={50} />
            <span>Payment </span>
            {orderLoading ? (
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

            {orderLoading ? (
              <Skeleton width={100} />
            ) : order.orderStatusValue === 1 ? (
              <div className={styles.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            ) : (
              <span className={styles.completed}>Completed</span>
            )}
          </div>

          <div className={styles.status}>
            <Image src={Onway} alt="" width={50} height={50} />
            <span>OnWay</span>

            {orderLoading ? (
              <Skeleton width={100} />
            ) : order.orderStatusValue === 2 ? (
              <div className={styles.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            ) : (
              <span className={styles.completed}>Completed</span>
            )}
          </div>

          <div className={styles.status}>
            <UilBox width={50} height={50} />
            <span>Delivered</span>

            {orderLoading ? (
              <Skeleton width={100} />
            ) : order.orderStatusValue === 3 ? (
              <div className={styles.spinner}>
                <Image src={Spinner} alt="" />
              </div>
            ) : (
              <span className={styles.completed}>Completed</span>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
