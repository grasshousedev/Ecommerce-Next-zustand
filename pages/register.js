import Layout from "../components/Layout";
import styles from "../styles/Register.module.css"
import { useState, useEffect} from "react";
import Link from "next/link";
import {createUser} from "../lib/registerHandler"
import toast,{Toaster} from "react-hot-toast";
import {useRouter} from "next/router";
import  {useStore}  from "../store/store";
import Cookies from "js-cookie";
import { client } from "../lib/client";
import {useAuth} from "./Contexts/AuthContext";
import {auth} from "../lib/firebase"
import {db} from "../lib/firebase"
import { doc, setDoc } from "firebase/firestore";



const Register = () => {
    const router = useRouter()
    const[formData, setFormData] = useState({})
    const[formErrors, setFormErrors]= useState({})
    const[loading, setLoading]=useState(false)    //For checking if the account  creation process is being executed or not
    const{currentUser, signUp} = useAuth()

    const handleInput = (e)=>{
            setFormData({...formData,
                [e.target.name]: e.target.value
            })
           }



    const handleSubmit = async (e) =>{
        e.preventDefault()
        setFormErrors(validate(formData)) 

        if(Object.keys(formErrors).length === 0){
            try {
                setLoading(true)
                await signUp(formData.email, formData.password)

                await new Promise(async (resolve) => {
                    const unsubscribe = auth.onAuthStateChanged(async (user) => {
                      if (user) {
                        currentUser = user
                        unsubscribe()
                        resolve()
                      }
                    })
                  })
                
                toast.success("Account created successfuly!")
                router.push("/")

            } catch(error){
                console.error(error)
                setFormErrors({signUpStatus: "Failed to create an Account"})
            }

        
            // Listen for user creation
            auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                try {
                const userDocRef = doc(db, "users", currentUser.uid)
                await setDoc(userDocRef, {
                    userName: formData.userName,
                    fullName: "",
                    phoneNumber: "",
                    address: "",
                });
                } catch (error) {
                console.error(error);
                setFormErrors({ signUpStatus: "Failed to create an account" })
                }
            }
            });

            // Listen for user deletion
            auth.onAuthStateChanged(async (user) => {
                if (!user) {
                   // User signed out or deleted
                   try {
                    const userDocRef = doc(db, "users", user.uid)
                    await userDocRef.delete();
                    console.log("User document deleted successfully.");
                  } catch (error) {
                    console.error("Error deleting user document: ", error);
                  }
                } 
                 
                
              });

            
          setLoading(false)
        }
       
     }


    //Form validation
    const validate = (formInput) =>{
        const errors= {}
        const regex= /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if(!formInput.userName){
            errors.userName= "Username is required!"
        }
        if(!formInput.email){
            errors.email= "Email is required!"
        } else if( !regex.test(formInput.email)){
            errors.email= "This is not a valide email format!"
        }

        if(!formInput.password){
            errors.password= "Password is required!"
        } else if(formInput.password.length < 4){
            errors.password = "Password should be more than 4 characters"
        
        } else if(formInput.password.length > 15){
            errors.password = "Passwords cannot exceed 15 characters"
        }

        if(!formInput.confirmPassword){
            errors.confirmPassword= "Retype the password"
        } else if(formInput.password !== formInput.confirmPassword){
            errors.confirmPassword= "Passwords do not macth!"
        }

        return errors
    }
    
    return (
        <Layout>
            <form action="" className={styles.formContainer}>
                <span>Register</span>
                
                <input type="text" name="userName" placeholder="Username" onChange={handleInput} required />
                <p style={{color: "red"}}>{formErrors.userName}</p>
                
                <input type="email" name="email" placeholder="Email" onChange={handleInput} required />
                <p style={{color: "red"}}>{formErrors.email}</p>

                <input type="password" name="password" placeholder="Password" onChange={handleInput} required />
                <p style={{color: "red"}}>{formErrors.password}</p>

                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInput} required />
                <p style={{color: "red"}}>{formErrors.confirmPassword}</p>
                <p style={{color: "red"}}>{formErrors.signUpStatus}</p>

                <button type="submit" disabled={loading} className="btn" onClick={handleSubmit}>Register</button>
                
                <span>Already have an account? 
                    <Link href="/login">
                        <span className={styles.signUp}> Login</span>
                    </Link>
                
                </span>
            </form>
            <Toaster/>
        

        </Layout>
     )
    }
    
 
export default Register;