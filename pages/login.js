import Link from "next/link"
import { useState, useEffect } from "react"
import {useRouter} from "next/router";
import Layout from "../components/Layout"
import styles from "../styles/Login.module.css"
import  {useStore}  from "../store/store";
import Cookies from "js-cookie";
import {loginUser} from "../lib/loginHandler"


const Login = () => {
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

    const handleSubmit = (e) =>{
           e.preventDefault() 
           setFormErrors(validate(formData)) 
           setIsSubmit(true)
           if(Object.keys(formErrors).length === 0 && isSubmit){
            //login function handler
            loginUser(formData)
            //login function in the store 
            login(formData)
            Cookies.set('userInfo', JSON.stringify(formData.email));
            router.push("/")
            }  
   
    }

    const handleInput = (e) =>{
        setFormData({...formData,
            [e.target.name]: e.target.value
        })

    }

    return (  
       <Layout>
        <form action="" className={styles.formContainer}>
            <span>Login</span>
            <input type="email" name="email" placeholder="Email" onChange={handleInput} required />
            <p style={{color: "red"}}>{formErrors.email}</p>

            <input type="password" name="password" placeholder="Password" onChange={handleInput} required />
            <p style={{color: "red"}}>{formErrors.password}</p>

            <button type="submit" className="btn" onClick={handleSubmit}>Login</button>
            <span>Do not have an account? 
                <Link href="/register">
                    <span className={styles.signUp}> Register</span>
                </Link>
                
            </span>
        </form>
    

       </Layout>
    );
}
 
export default Login;