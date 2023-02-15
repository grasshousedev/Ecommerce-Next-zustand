import Layout from "../components/Layout";
import styles from "../styles/Account.module.css"
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "./Contexts/AuthContext";
import { useState } from "react";

const Account= ()=>{

    const {currentUser, updateEmail, updatePassword} = useAuth()
    const [formData, setFormdata] = useState({})
    const [errors, setFormErrors] = useState({})
    const [disabled, setDisabled] = useState(true)
    const [passwordChange, setPasswordChange] = useState(true)


    const handleInput= (e) => {
        setFormdata({
            ...formData, 
            [e.target.name] : e.target.value
        })
    }

    const unable = (e) => {
        e.preventDefault()
        setDisabled(false)
    }

    const disable = (e) => {
        e.preventDefault()
        setDisabled(true)
    }

    const unablePasswordChange = (e) => {
       e.preventDefault()
       setPasswordChange(false)
    }

    const disablePasswordChange= (e) => {
        e.preventDefault()
        setPasswordChange(true)
    }

     //Form validation
     const validate = (formInput) =>{
        const errors= {}
        const regex= /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if(!formInput.email){
            errors.email= "Email is required!"
        } else if( !regex.test(formInput.email)){
            errors.email= "This is not a valide email format!"
        }

        if(!formInput.password){
            errors.password= "Password is required!"
        }
        return errors
    }
    

    return(
    <Layout>
        <ProtectedRoute>
            <div className={styles.container}>
                <form className={styles.personalDetails}>
                    <div className={styles.formHeader}>
                        <span className={styles.formTitle}>Personal Details</span>
                        <button className={styles.button}  onClick={unable}>Change Details</button>
                    </div>
                    
                    <label>Username</label>
                    <input type="text" name="userName" onChange={handleInput} disabled={disabled}/>
                    <label>Full Name</label>
                    <input type="text" name="fullName" onChange={handleInput} disabled={disabled} />
                    <label>Email</label>
                    <input type="text" name="email"  onChange={handleInput}  defaultValue={currentUser.email} disabled={disabled}/>
                    <label>Phone number</label>
                    <input type="tel" name="PhoneNumber" onChange={handleInput} disabled={disabled}/>
                    <label>Address</label>
                    <input type="text" name="address" onChange={handleInput} disabled={disabled}/>
                    { disabled ||
                        <div className={styles.detailButtons}>
                            <button className={styles.button}>Update Details</button>
                            <button className={styles.button} onClick={disable}>Cancel</button>
                        </div>}
                
                </form>

                <form className={styles.security}>
                    <div className={styles.formHeader}>
                        <span className={styles.formTitle}>Security</span>
                        <button className={styles.button} onClick={unablePasswordChange}>Change Password</button>
                    </div>
                 
                    <label>Current Password</label>
                    <input type="password" name="password" onChange={handleInput} placeholder="Leave blank to keep the same" defaultValue="test" disabled={passwordChange}/>
                    { passwordChange ||
                        <>
                            <div className={styles.passwordChange}>
                                <label>New Password</label>
                                <input type="text" name="newPassword"  />

                                <label>Confirm New Password</label>
                                <input type="text" name="confirmNewPassword" />
                            </div>
                            <div className={styles.detailButtons}>
                                <button className={styles.button}>Update Password</button>
                                <button className={styles.button} onClick={disablePasswordChange}>Cancel</button>
                            </div>
                        </>
                        }
                </form>
            </div>
        </ProtectedRoute>
        
       
    </Layout>
    )
}

export default Account;