import Layout from "../components/Layout"
import ProtectedRoute from "../components/ProtectedRoute";
import {db} from "../lib/firebase"
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "./Contexts/AuthContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import {urlFor} from "../lib/client"
import styles from "../styles/Order.module.css"

const Order= ()=>{

    const {currentUser} = useAuth()
    const [userData, setUserData] = useState()

    const fetchUserData = async () => {
        try {
            const docRef = doc(db, "orders", currentUser.uid)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                setUserData(docSnap.data())  
            }

        } catch (error) {
            console.log(error)
        }  
    }

    useEffect(() => {

        if(currentUser){
            fetchUserData()
        }
     
    }, [currentUser])
    
    return(
        currentUser &&
        <Layout>
            <ProtectedRoute>
                <div>
                <div className={styles.container}>

{/* DETAILS */}
<div className={styles.details}>
    <table className={styles.table}>
        <thead>
            <th>Image</th>
            <th>Name</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
        </thead>

        <tbody className={styles.tbody}>
           

        </tbody>
    </table>
</div>


</div>
                </div>
            </ProtectedRoute>
            
        </Layout>
        
    )
}

export default Order;