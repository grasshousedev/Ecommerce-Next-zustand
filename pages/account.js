import Layout from "../components/Layout";
import styles from "../styles/Account.module.css"
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "./Contexts/AuthContext";
import {auth} from "../lib/firebase"
import { getAuth, deleteUser } from "firebase/auth";
import {db} from "../lib/firebase"
import { doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import { useState } from "react";
import toast, {Toaster} from "react-hot-toast";
import {useRouter} from "next/router";
import { useEffect } from "react";
import PhoneInput, {formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';





const Account= ()=>{
 
    const router = useRouter()
    const {currentUser, updateEmail, updatePassword} = useAuth()
    const [formData, setFormdata] = useState({})
    const [formErrors, setFormErrors] = useState({})
    const [disabled, setDisabled] = useState(true)
    const [emailDisabled, setEmailDisabled] = useState(true)
    const [passwordChange, setPasswordChange] = useState(true)
    const [ emailChange, setEmailChange] = useState(false)
    const [accountDeletion, setAccountDeletion] = useState(false)

    const [phoneNumber, setPhoneNumber] = useState();
    
    const handleInput= (e) => {
        setFormdata({
            ...formData, 
            [e.target.name] : e.target.value
        })
    }

    const handleEmailUpdate= async(e) => {

        e.preventDefault()
        const regex= /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

        if(formData.email !== currentUser.email && regex.test(formData.email)){
            try{
                await updateEmail(formData.email)
                toast.success("Email updated succesfully")
                setEmailDisabled(true)
                setEmailChange(false)

            } catch{
                toast.error("Failed to update the email")
            }

        } else if(formData.email == currentUser.email){
            toast.error("Make sure emails are not the same")

        } else if( !regex.test(formData.email)){
            toast.error("Not a valide email format")
        }
    }
   
    
    const handlePasswordUpdate= async(e) => {

        e.preventDefault()
        if(formData.newPassword == formData.confirmNewPassword){
            try{
                await updatePassword(formData.newPassword)
                toast.success("Password upadated succesfully!")

            } catch(error){
                console.log(error)
                toast.error("Failed to update password")
            }

        }
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

    const unableEmailChange = (e) =>{
        e.preventDefault
        setEmailChange(true)
        setEmailDisabled(false)
    }

    const disableEmailChange = (e) =>{
        e.preventDefault()
        setEmailChange(false)
        setEmailDisabled(true)
    }

    const unableAccountDeletion = () =>{
        setAccountDeletion(true)
    }

    const handleDetailsUpdate = async(e)=>{
        e.preventDefault()
        if(!isPossiblePhoneNumber(phoneNumber)){
            toast.error("Not a valid phone number")

        } else{
            try {
                const userDocRef = doc(db, "users", currentUser.uid)
                await setDoc(userDocRef, {
                    userName: formData.userName,
                    fullName: formData.fullName,
                    phoneNumber: formatPhoneNumberIntl(phoneNumber),
                    address: formData.address,
                });
    
                toast.success("Account details updated succesfully")
                setDisabled(true)
                } catch (error) {
    
                console.error(error);
                toast.error("Failed to update account details")
                }
        }
        

    }

    const handleAccountDeletion = async() =>{
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            await deleteUser(user)
            toast.success("Account deleted successfully!")
            router.push('/')

        }  catch (error) {
            toast.error("Failed to delete account")

        }
        try {
            const userDocRef = doc(db, "users", currentUser.uid)
            const userOrderRef = doc(db, "orders", currentUser.uid)
            await deleteDoc(userDocRef)
            await deleteDoc(userOrderRef)
            
        } catch(error){
            toast.error("Failed to delete account ")

        }
           
        } 

    const[userData, setUserData] = useState({})

    

    useEffect(()=> {

        const fetchUserData = async() =>{
            try {
                const docRef = doc(db, "users", currentUser.uid)
                const docSnap = await getDoc(docRef)
    
                if(docSnap.exists()){
    
                    setUserData(docSnap.data())  
                }
    
            } catch (error) {
                console.log(error)
            }
        }

        if(currentUser){
            fetchUserData()
        }
       
    }, [currentUser])

    return(
    currentUser &&
    <Layout>
        <ProtectedRoute>
            <div className={styles.container}>
                <form className={styles.personalDetails}>
                    <div className={styles.formHeader}>
                        <span className={styles.formTitle}>Personal Details</span>
                        <button className={styles.button}  onClick={unable}>Change Details</button>
                    </div>
                    

                    <label>Username</label>
                    <input type="text" name="userName" onChange={handleInput} disabled={disabled} defaultValue={userData.userName}/>

                    <label>Full Name</label>
                    <input type="text" name="fullName" onChange={handleInput} disabled={disabled} defaultValue={userData.fullName} />

                    <label>Phone number</label>
                    <PhoneInput
                        className={styles.phoneInput}
                        international
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        defaultCountry= "CD"
                        countryCallingCodeEditable={false}
                        placeholder= "Phone Number"
                        error = {phoneNumber && isPossiblePhoneNumber(phoneNumber) ? 'true' : 'false'}
                        disabled={disabled} 
                        defaultValue={userData.phoneNumber}
                    />

                    <label>Address</label>
                    <input type="text" name="address" onChange={handleInput} disabled={disabled} defaultValue={userData.address}/>
    
                    {disabled &&
                    <div className={styles.emailContainer}>
                        <label>Email</label>
                        <div className={styles.email}>
                            <input type="text" name="email"  onChange={handleInput}  defaultValue={currentUser.email} disabled={emailDisabled}/>
                            <span onClick={unableEmailChange}>Change Email</span>
                        </div>

                        { emailChange &&
                        <div className={styles.detailButtons}>
                            <button className={styles.button} onClick={handleEmailUpdate} >Update Email</button>
                            <button className={styles.button} onClick={disableEmailChange} >Cancel</button>
                        </div>}
                        
                    </div>
                   }

                    { disabled ||
                        <div className={styles.detailButtons}>
                            <button className={styles.button} onClick={handleDetailsUpdate}>Update Details</button>
                            <button className={styles.button} onClick={disable}>Cancel</button>
                        </div>}
                
                </form>

                <form className={styles.security}>
                    <div className={styles.formHeader}>
                        <span className={styles.formTitle}>Security</span>
                        <button className={styles.button} onClick={unablePasswordChange}>Change Password</button>
                    </div>
                 
                    <label>Current Password</label>
                    <input type="password" name="password" onChange={handleInput}  defaultValue="test1234" disabled={passwordChange}/>
                    { passwordChange ||
                        <>
                            <div className={styles.passwordChange}>
                                <label>New Password</label>
                                <input type="password" name="newPassword" onChange={handleInput}/>
        
                                <label>Confirm New Password</label>
                                <input type="password" name="confirmNewPassword" onChange={handleInput} />

                            </div>
                            <div className={styles.detailButtons}>
                                <button className={styles.button} onClick={handlePasswordUpdate}>Update Password</button>
                                <button className={styles.button} onClick={disablePasswordChange}>Cancel</button>
                            </div>
                        </>
                        }
                </form>
                <div className={styles.accountDeletion}>
                    <div className={styles.formHeader}>
                            <span className={styles.formTitle}>Account Deletion</span>
                            <button className={styles.button} onClick={() => setAccountDeletion(true)}>Delete account</button>
                    </div>

                    { accountDeletion &&
                        <div className={styles.confirmation}>
                                <button className={styles.button} onClick={handleAccountDeletion} >Delete Account</button>
                                <button className={styles.button} onClick={() => setAccountDeletion(false)}>Cancel</button>
                        </div>
                    }
                    
                </div>
            </div>
        
            <Toaster/>
        </ProtectedRoute>
        
       
    </Layout>
    ) 
}

export default Account;