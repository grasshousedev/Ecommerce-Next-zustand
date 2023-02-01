import styles from "../styles/Header.module.css"
import Image from "next/image"
import Logo from "../assets/logo.png"
import {UilShoppingBag, UilReceipt, UilSun, UilMoon, UilBars, UilTimes} from "@iconscout/react-unicons"
import  {useStore}  from "../store/store"
import Link from "next/link"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import UserMenu from "./UserMenu"

const Header = () => {
    let mobile;
    if(typeof window !== 'undefined'){
         mobile=  window.innerWidth <= 740 ? true : false
    }
    const [order, setOrder] = useState("")
    useEffect(() =>{
        setOrder(localStorage.getItem("order"))
    }, [])
    
    //Function to open and close the navigation menu on mobile
    const[mobileMenu, setMobileMenu] = useState(false)
   const mobileNavigation= ()=>{
        setMobileMenu(true)
   }

    const items = useStore((state) => state.cart.dishes.length)
    const darkMode = useStore((state) => state.mode.darkMode)
    const darkModeOn = useStore((state) => state.darkModeOn)
    const darkModeOff = useStore((state) => state.darkModeOff)
    const userInfo= useStore((state) => state.userInfo)
    

    //User modal state
    const [userMenu, setUserMenu]= useState(false)

    const handlerDarkMode= () =>{
       darkMode ? darkModeOff() : darkModeOn()
       const newMode= !darkMode
       Cookies.set('darkMode', darkMode ? 'ON' : 'OFF')
    }
    const handleUserMenu= () =>{
        setUserMenu((prevState) => !prevState)
    }
    

    return ( 
        <div className={styles.header}>
             {/* HAMBURGER */}
             {/* {mobile &&<UilBars/>} */}
            {/* LOGO SIDE */}
            <div className={styles.logo}>
                <Image src={Logo} alt="" width={50} height={50}/> 
                <span className={styles.logoText}>Chepe-chepe</span>
            </div>

            {/* MENU SIDE */}
            <ul className={styles.menu}>
                <li>
                   <Link href='../'>Home</Link>
                </li>

                <li>
                    <Link href='../#menu'>Menu</Link>
                </li>

                <li>
                    <Link href='../#contact'>Contact</Link>
                </li>

                <li>
                    <Link href='../#services'>Services</Link>
                    </li>
            </ul>

            {/* RIGTH SIDE */}
            <div className={styles.rightSide}>
                <div className={styles.toggler} >
                    <UilSun className={!darkMode && `${styles.active}`} onClick={handlerDarkMode}/>
                    <UilMoon  className={ darkMode &&  `${styles.active}`} onClick={handlerDarkMode}/>
                </div>
                
                {userInfo 
                    ? <p className={styles.user} onClick={handleUserMenu} >{userInfo}</p>
                    : (
                        
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
                menuFunction={setUserMenu}
                />

                <Link href="/cart">
                    <div className={styles.cart}>
                        <UilShoppingBag size={35} color="#2E2E2E"/>
                        <div className={styles.badge}>{items}</div>
                    </div>
                </Link>

                {order && (
                    <Link href={`/order/${order}`}>
                        <div className={styles.cart}>
                            <UilReceipt size={35} className={styles.receipt}  color='#2E2E2E'/>
                            {order != "" && <div className={styles.badge}>1</div>}

                        </div>
                    </Link>
                )}

                {/* MOBILE MENU */}
                { mobile && <UilBars size={35} className={styles.hamburger} onClick={mobileNavigation}/> }

                {(mobile && mobileMenu) &&
                <ul className={styles.mobileMenu}>
                    <UilTimes onClick={() =>setMobileMenu(false)}/>
                    <li>
                    <Link href='../'>Home</Link>
                    </li>

                    <li>
                        <Link href='../#menu'>Menu</Link>
                    </li>

                    <li>
                        <Link href='../#contact'>Contact</Link>
                    </li>

                    <li>
                        <Link href='../#services'>Services</Link>
                    </li>
                </ul>}

            </div>
        </div>
            
     );
}
 
export default Header;