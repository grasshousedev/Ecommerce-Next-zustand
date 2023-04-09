import styles from "../styles/UserMenu.module.css";
import Link from "next/link";
import { useStore } from "../store/store";
import Cookies from "js-cookie";
import toast,{Toaster} from "react-hot-toast";
import { useRouter } from "next/router";
import {useAuth} from "../pages/Contexts/AuthContext"


const UserMenu= ({isOpen, menuFunction}) =>{ 
    const router= useRouter()
// importing logout from AuthContexts
    const {logout}= useAuth()

    //Function to logout and close the modal
    const LogoutAndClose= async () =>{
        menuFunction(false)
        typeof window !== 'undefined' && localStorage.clear()
        try{
            await logout()
            router.push('/login')
        } catch{
            toast.error("Failde to logout!")
        }
     
        router.push('/')
    }
    

    return(
    isOpen && (
        <div className={styles.container}>
            <Link href='/account'>
                <p onClick={() => menuFunction(false)}>Account</p>
            </Link>

            {/* <Link href='/orders'>
                <p onClick={() => menuFunction(false)}>My Orders</p>
            </Link> */}
            <p onClick={LogoutAndClose}>Logout</p>
            <Toaster/>

        </div>
    )
      
)}

export default UserMenu;