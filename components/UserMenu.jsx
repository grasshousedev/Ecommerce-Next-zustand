import styles from "../styles/UserMenu.module.css";
import Link from "next/link";
import { useStore } from "../store/store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import {useAuth} from "../pages/Contexts/AuthContext"
const UserMenu= ({isOpen, menuFunction}) =>{ 
    const router= useRouter()
// importing logout from AuthContexts
    const {logout}= useAuth()

    //Function to logout and close the modal
    const LogoutAndClose= () =>{
        menuFunction(false)
        logout()
        router.push('/')
    }
    

    return(
    isOpen && (
        <div className={styles.container}>
            <Link href='/account'>
                <p onClick={() => menuFunction(false)}>Account</p>
            </Link>

            <Link href='/order-history'>
                <p onClick={() => menuFunction(false)}>My Orders</p>
            </Link>
            <p onClick={LogoutAndClose}>Logout</p>

        </div>
    )
      
)}

export default UserMenu;