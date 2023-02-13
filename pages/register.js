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
import {useAuth} from "./Contexts/AuthContext"


const Register = () => {
    const router = useRouter()
    const[formData, setFormData] = useState({})
    const[formErrors, setFormErrors]= useState({})
    const[loading, setLoading]=useState(false)    //For checking if the account  creation process is being executed or not

    const handleInput = (e)=>{
            setFormData({...formData,
                [e.target.name]: e.target.value
            })
           }
    const{ signUp}= useAuth()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setFormErrors(validate(formData)) 
        if(Object.keys(formErrors).length === 0){
            try {
                setLoading(true)
                await signUp(formData.email, formData.password) 
                router.push("/")
            } catch{
                setFormErrors({signUpStatus: "Failed to create an Account"})
            }
          setLoading(false)
        }
       
     }


    //Form validation
    const validate = (formInput) =>{
        const errors= {}
        const regex= /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if(!formInput.name){
            errors.name= "Name is required!"
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
            errors = "Passwords cannot exceed 15 characters"
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
                <input type="text" name="name" placeholder="User name"  onChange={handleInput} required/>
                <p style={{color: "red"}}>{formErrors.name}</p>
              
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