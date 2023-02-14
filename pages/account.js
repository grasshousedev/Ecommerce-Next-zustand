import Layout from "../components/Layout";
import styles from "../styles/Account.module.css"
import ProtectedRoute from "../components/ProtectedRoute";

const Account= ()=>{
    return(
    <Layout>
        <ProtectedRoute>
            <div className={styles.container}>
                <form className={styles.personalDetails}>
                    <span className={styles.formTitle}>Personal Details</span>
                    <input type="text" name="userName" id="" placeholder="Username" />
                    <input type="text" name="fullName" id="" placeholder="Full Name" />
                    <input type="text" name="email" id=""  placeholder="Email"/>
                    <input type="tel" name="PhoneNumber" id=""  placeholder="Phone number"/>
                    <input type="text" name="address" id=""  placeholder="Address"/>
                </form>

                <form className={styles.security}>
                    <span className={styles.formTitle}>Security</span>
                    <input type="password" name="password" id="" placeholder="Password" />
                </form>
            </div>
        </ProtectedRoute>
        
       
    </Layout>
    )
}

export default Account;