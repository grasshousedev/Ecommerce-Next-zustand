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


const Register = () => {
    const router = useRouter()
    const[formData, setFormData] = useState({})
    const[formErrors, setFormErrors]= useState({})
    const[isSubmit, setIsSubmit]= useState(false)
    
    //Getting login info from the store 
    const login= useStore((state) => state.login)
    const userInfo= useStore((state) => state.userInfo)

    useEffect(() =>{
        if(userInfo){
            router.push("/")
        }
    }, [router, userInfo])

    const handleInput = (e)=>{
            setFormData({...formData,
                [e.target.name]: e.target.value
            })
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

  


    const handleSubmit = async (e) =>{
           e.preventDefault()
           setFormErrors(validate(formData)) 
           setIsSubmit(true)
           if(Object.keys(formErrors).length === 0 && isSubmit){
                // createUser({...formData})
                const id= await createUser({...formData})
                typeof window !== 'undefined' && localStorage.setItem('user', id)
                toast.success("Account Created!")
                // router.push(`/user/${id}`)
                Cookies.set('userInfo', JSON.stringify(formData.email));
                login(formData)
                router.push("/")
                
                
                // toast.error("Account exists, login instead!")
            
                
            
        }
    
           
   
    }

    
    

         
    

   

    return (
        <Layout>
            <form action="" className={styles.formContainer}>
            <span>Register</span>
            <input type="text" name="name" placeholder="Full Name"  onChange={handleInput} required/>
            <p style={{color: "red"}}>{formErrors.name}</p>

            <input type="email" name="email" placeholder="Email" onChange={handleInput} required />
            <p style={{color: "red"}}>{formErrors.email}</p>

            <input type="password" name="password" placeholder="Password" onChange={handleInput} required />
            <p style={{color: "red"}}>{formErrors.password}</p>

            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInput} required />
            <p style={{color: "red"}}>{formErrors.confirmPassword}</p>

            <button type="submit" className="btn" onClick={handleSubmit}>Register</button>
            <span>Already have an account? 
                <Link href="/login">
                    <span className={styles.signUp}> Login</span>
                </Link>
                
            </span>
        </form>
        <Toaster/>
        

        </Layout>
     );
    }
 
export default Register;