import styles from "../styles/Header.module.css"
import Image from "next/image"
import Logo from "../assets/logo.png"
import {UilShoppingBag, UilReceipt, UilSun, UilMoon, UilBars, UilTimes, UilUser, UilAngleDown} from "@iconscout/react-unicons"
import  {useStore}  from "../store/store"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import Cookies from "js-cookie"
import UserMenu from "./UserMenu"
import {useAuth} from "../pages/Contexts/AuthContext"
import { doc, getDoc } from "firebase/firestore"
import {db} from "../lib/firebase"
import { useRouter } from "next/router"


const Header = () => {
    
    const userMenuRef = useRef(null)

    useEffect(() =>{

        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }

    }, [])

    const handleClickOutside = (e) =>{

        if( !userMenuRef.current.contains(e.target)){
            setUserMenu(false)
        }
        console.log(userMenuRef)
        
    }

    const router = useRouter()
    let mobile;

    if(typeof window !== 'undefined'){
         mobile=  window.innerWidth <= 740 ? true : false
    }

    const [order, setOrder] = useState("")
    useEffect(() =>{
        
        setOrder(localStorage.getItem("order"))
    }, [])

    
    const {currentUser, logout}= useAuth()

    const LogoutAndClose= async () =>{
        setMobileMenu(false)
        typeof window !== 'undefined' && localStorage.clear()
        try{
            await logout()
            router.push('/login')
        } catch{
            toast.error("Failde to logout!")
        }
     
        router.push('/')
    }
    

    const[mobileMenu, setMobileMenu] = useState(false)

   const mobileNavigation= ()=>{
        setMobileMenu(true)
   }

    const items = useStore((state) => state.cart.dishes.length)
    const darkMode = useStore((state) => state.mode && state.mode.darkMode)
    const darkModeOn = useStore((state) => state.darkModeOn)
    const darkModeOff = useStore((state) => state.darkModeOff)
    const userInfo= useStore((state) => state.userInfo)
    

    
    const [userMenu, setUserMenu]= useState(false)
    const [mobileUserMenu, setMobileUserMenu] = useState(false)

    const handleMobileUserMenu = () =>{
        
        setMobileUserMenu((prevState) => !prevState)
    }

    const handlerDarkMode= () =>{

       darkMode ? darkModeOff() : darkModeOn()
       const newMode= !darkMode
       Cookies.set('darkMode', darkMode ? 'ON' : 'OFF')

    }

    const handleUserMenu= () =>{
        setUserMenu((prevState) => !prevState)
    }

    const[userName, setUserName] = useState("")

    const fetchUserName = async() =>{

        try {
            const docRef = doc(db, "users", currentUser.uid)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){

                setUserName(docSnap.data().userName)  
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        if(currentUser){
            fetchUserName()
        }
       
    }, [currentUser])
   

    return ( 
        <div className={styles.header}>
           
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
                
                {(currentUser && !mobile) ?
                <div className={styles.userMenu} ref= {userMenuRef}>
                    <UilUser size={20}/>
                    <p className={styles.user} onClick={handleUserMenu} >{userName}</p> 
                    {userMenu ? <UilAngleDown size={20} className={styles.rotatedIcon} /> : <UilAngleDown size={20}  /> }

                </div>
                 
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
                        <UilShoppingBag size={35}  className={styles.cart}  color="#2E2E2E"/>
                        <div className={styles.badge}>{items}</div>
                    </div>
                </Link>

                {order && (
                    <Link href={`/order/${order}`}>
                        <div className={styles.cart}>
                            <UilReceipt size={30} className={styles.receipt}  color='#2E2E2E'/>
                            {order != "" && <div className={styles.badge}>1</div>}

                        </div>
                    </Link>
                )}

                {/* MOBILE MENU */}
                { (mobile && !mobileMenu) && <UilBars size={30} className={styles.hamburger} onClick={mobileNavigation}/> }
                { (mobile && mobileMenu) &&  <UilTimes  size={30} onClick={() =>setMobileMenu(false)}/>}

                {(mobile && mobileMenu) &&
                <ul className={styles.mobileMenu}>

                    {currentUser ?
                    <div className={styles.mobileUserMenu}>
                        <UilUser size={20}/>
                        <p className={styles.user} onClick={handleMobileUserMenu} >{userName}</p> 
                        {mobileUserMenu ?   <UilAngleDown size={20} className={styles.rotatedIcon} /> :    <UilAngleDown size={20}  />}

                    </div>:
                    
                    <div className={styles.authButtonMobile}> 
                        <Link href="/login">
                            <button className={` btn ${styles.login}`}>Login</button>
                    
                        </Link>
        
                        <Link href="/register">
                            <button className={`btn ${styles.signUp}`}>Register</button>
                        </Link>
                    
                    </div>
                    } 

                    {(currentUser &&  mobileUserMenu ) && 
                    <div className={styles.mobileUserMenuItems}>
                        <li>
                            <Link href='/account' onClick={ () => setUserMenu(false)}>Account</Link>
                        </li>

                        <li>
                            <p  onClick={LogoutAndClose}>Logout</p>
                        </li>
                    </div>
                      }

                   
                    
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