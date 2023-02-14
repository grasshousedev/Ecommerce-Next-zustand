import Layout from "../components/Layout"
import styles from "../styles/ForgotPassword.module.css"
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "./Contexts/AuthContext"
import toast, {Toaster} from "react-hot-toast"

const ForgotPassword= ()=>{

    const[formData, setFormData] = useState({})
    const[formErrors, setFormErrors]= useState({})
    const[loading, setLoading]=useState(false) 

    const{resetPassword}= useAuth()
    
     //Form validation
     const validate = (formInput) =>{
        const errors= {}
        const regex= /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if(!formInput.email){
            errors.email= "Email is required!"
            
        } else if( !regex.test(formInput.email)){
            errors.email= "This is not a valide email format!"
        }

        return errors
    }

    const handleInput = (e) =>{
        setFormData({...formData,
            [e.target.name]: e.target.value
        })

    }

     const handleSubmit =async (e) =>{
           e.preventDefault() 
           setFormErrors(validate(formData)) 
    
           if(Object.keys(formErrors).length === 0){

            try {
                setLoading(true)
                await resetPassword(formData.email) 
                toast.success('Check your inbox for further instructions')

            } catch{
                setFormErrors({passwordResetStatus: "Make sure you use the right email address!"})
            }
            setLoading(false)
        }  
    }  

    return(
        <Layout>
            <form action="" className={styles.formContainer}>
            <span>Password Reset</span>
            <input type="email" name="email" placeholder="Email" onChange={handleInput} required />
            <p style={{color: "red"}}>{formErrors.email}</p>

            <p style={{color: "red"}}>{formErrors.passwordResetStatus}</p>

            <button type="submit"  disabled={loading}  className="btn" onClick={handleSubmit}>Reset Password</button>

            <Link href="/login">
                <span className={styles.login}>Login</span>
            </Link>
            
            <span>Do not have an account? 
                <Link href="/register">
                    <span className={styles.signUp}> Register</span>
                </Link>
                
            </span>
        </form>
        <Toaster/>

        </Layout>
    )
}

export default ForgotPassword;