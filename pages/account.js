import Layout from "../components/Layout";
import styles from "../styles/Account.module.css"
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "./Contexts/AuthContext";

const Account= ()=>{

    const{currentUser}= useAuth()

    return(
    <Layout>
        <ProtectedRoute>
            <div className={styles.container}>
                <form className={styles.personalDetails}>
                    <span className={styles.formTitle}>Personal Details</span>
                    <label>Username</label>
                    <input type="text" name="userName" id=""/>
                    <label>Full Name</label>
                    <input type="text" name="fullName" id="" />
                    <label>Email</label>
                    <input type="text" name="email" id="" defaultValue={currentUser.email}/>
                    <label>Phone number</label>
                    <input type="tel" name="PhoneNumber" id=""/>
                    <label>Address</label>
                    <input type="text" name="address" id=""/>
                </form>

                <form className={styles.security}>
                    <span className={styles.formTitle}>Security</span>
                    <label>Password</label>
                    <input type="password" name="password" id="" placeholder="Leave blank to keep the same"/>
                </form>
            </div>
        </ProtectedRoute>
        
       
    </Layout>
    )
}

export default Account;