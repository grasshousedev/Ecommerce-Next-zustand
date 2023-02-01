import styles from "../styles/Services.module.css"
import Image from "next/image";
import Service1 from "../assets/s1.png"
import Service2 from "../assets/s2.png"
import Service3 from "../assets/s3.png"

const Services = () => {
    return (
        <>
        <div className={styles.heading}>
            <span>WHAT WE SERVE</span>
            <span>Your Favourite Food</span>
            <span>Delivery Partner</span>
        </div>

        {/* SERVICES */}
        <div className={styles.services} id="services">
            <div className={styles.service}>
                <div className={styles.imageWrapper}>
                    <Image src={Service1} alt="" objectFit="cover" layout="intrinsic"/> 
                </div>

                <span>Easy to Order</span>
                <span>You only need a few steps in food ordering</span>
            </div>

            <div className={styles.service}>
                    <div className={styles.imageWrapper}>
                        <Image src={Service2} alt="" objectFit="cover" layout="intrinsic"/> 
                    </div>

                <span>Fast Delivery</span>
                <span>Delivery that is always on time even faster</span>
            </div>

            <div className={styles.service}>
                <div className={styles.imageWrapper}>
                        <Image src={Service3} alt="" objectFit="cover" layout="intrinsic"/> 
                </div>

                <span>Quality Food</span>
                <span>Not only fast for us, quality is also number one</span>

            </div>
        </div>
        </>
      );
}
 
export default Services;