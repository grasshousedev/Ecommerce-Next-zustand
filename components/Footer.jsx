import styles from "../styles/Footer.module.css";
import Image from "next/image";
import Logo from "../assets/Logo.png";
import GooglePlay from "../assets/google.png";
import AppStore from "../assets/appStore.png";
import Airtel from "../assets/airtel.png"
import Orange from "../assets/orange.png"
import Paypal from "../assets/paypal.png"
import  {useStore}  from "../store/store"

import { UilInstagram, UilFacebook, UilLinkedin } from '@iconscout/react-unicons';
const Footer = () => {
    const darkMode = useStore((state) => state.mode.darkMode)
    return (  
        <div className={darkMode ? `${styles.darkMode} ${styles.container}` : `${styles.container}`}>
            <div className={styles.col}>
                <div className={styles.logo}>
                    <div className={styles.logoContainer}>
                        <Image src={Logo} alt=""/>
                    </div>
                    <span>Chepe-chepe</span>
                </div>
               <span className={`${styles.bold} ${styles.contact}`}>Contacts</span>
              <div className={styles.info}>
                
                <span className={styles.bold}>Address : </span>
                <span>Virunga, Kagephar 74</span>
              </div>
               <div className={styles.info}>
                <span className={styles.bold}>Phone : </span>
                <span>+243971534162</span>

               </div>
              <div >
                <span className={styles.bold}>Hours :</span>
                <span> 8:00 - 22:00, Mon -Sun</span>

              </div>
                

                <span className={`${styles.bold} ${styles.info} ${styles.follow}`}>Follow us</span>
                <div className={styles.social}>
                    <UilInstagram/>
                    <UilFacebook/>
                    <UilLinkedin/>

                </div>

            </div>
            <div className={styles.col}>
                <span className={`${styles.bold} ${styles.marginBottom}`}>About</span>
                <span>About us</span>
                <span>Delivery Information</span>
                <span>Pricing Policy</span>
                <span>Terms and Conditions</span>
                <span>Contact us</span>

            </div>
            <div className={styles.col}>
                <span className={`${styles.bold} ${styles.marginBottom}`}>My Account</span>
                <span>Register</span>
                <span>Login</span>
                <span>View Cart</span>
                <span>Track My Order</span>
                <span>Help</span>

            </div>
            <div className={styles.col}>
                <span className={`${styles.bold} ${styles.marginBottom}`}>Install App</span>
                <span>From App Store or Google Play</span>
                <div className={styles.imageWrapper}>
                    <div className={styles.imageContainer}>
                    <Image src={GooglePlay} alt=""/>
                    
                    </div>

                    <div className={styles.imageContainer}>
                        <Image src={AppStore} alt=""/>
                        
                    </div>
                </div>
               
                <span>Secure Payment Gateways</span>

                <div className={styles.imageWrapper}>
                    <div className={styles.payment}>
                    <Image src={Airtel} alt=""/>
                    
                    </div>

                    <div className={styles.payment}>
                        <Image src={Orange} alt=""/>
                        
                    </div>

                    <div className={styles.payment}>
                        <Image src={Paypal} alt=""/>
                        
                    </div>
                </div>

            </div>

        </div>
    );
}
 
export default Footer;