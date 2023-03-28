import {Modal, useMantineTheme} from "@mantine/core"
import { useState } from "react"
import toast, {Toaster} from "react-hot-toast"
import { useStore } from "../store/store"
import { createOrder } from "../lib/orderHandler"
import styles from "../styles/OrderModal.module.css"
import { useRouter } from "next/router"
import {db} from "../lib/firebase"
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../pages/Contexts/AuthContext";

const OrderModal  = ({opened, setOpened, paymentMethod}) => {

    const total = typeof window !== 'undefined' &&  localStorage.getItem('total')
    const dish = typeof window !== 'undefined' &&  localStorage.getItem('orderDish') 
    const quantity = typeof window !== 'undefined' &&  localStorage.getItem('orderQuantity') 
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);

    
    const theme = useMantineTheme()
    const router = useRouter()
    const [formData, setFormData] = useState({})
    const[formErrors, setFormErrors]= useState({})
    const[isSubmit, setIsSubmit]= useState(false)
    const resetCart = useStore((state) => state.resetCart)
    const {currentUser} = useAuth()
    const [disableOrderSubmission, setDisableOrderSubmission ] = useState(false)

    //Form validation
    const validate = (formInput) =>{
        const errors= {}
        const regex= /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g

        if(!formInput.name){
            errors.name= "Name is required!"
        }
        if(!formInput.phone){
            errors.phone= "Phone number is required!"
        } else if( !regex.test(formInput.phone)){
            errors.phone= "This is not a valide phone number format!"
        }

        if(!formInput.address){
            errors.address= "Name is required!"
        }
        return errors
    }

    const handleInput = (e) => {
        setFormData(
            {...formData, 
            [e.target.name] : e.target.value
            })
    }


    const handleSubmit = async (e)=>{

        e.preventDefault()
        setFormErrors(validate(formData)) 
        setDisableOrderSubmission(true)
        
        try{

            if(Object.keys(formErrors).length === 0){

                const id=  await createOrder({
        
                    name: formData.name,
                    phone: formData.phone,
                    address: formData.address,
                    dish, 
                    quantity, 
                    total,
                    paymentMethod,
                    formattedDate,
                    })

                await setOrderDetails(id)
                toast.success("Order Placed")
                resetCart()

                {
                    typeof window !== 'undefined' && localStorage.setItem('order', id)
                }
        
                router.push(`/order/${id}`)
            }

        } catch (error){

            console.log (error)
            toast.error("Error, couldn't place an order!")

        }
   
    }
    
   

    const setOrderDetails = async (id) =>{
       
        try{

            const userDocRef = doc(db, "orders", currentUser.uid)
                await setDoc(userDocRef, {
                id: id,
                name: formData.name,
                address: formData.address,
                phoneNumber: formData.phone,
                dish: dish,
                quantity: quantity,
                total: total,
                date: formattedDate,   
                });
    

        } catch(error){

            console.log(error)
            toast.error("Couldn't place the order, try again")
            

        }
    }


    return ( 
        <Modal
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        onClose={()=> setOpened(null)}
        >
        {/* Modal content */}
        <form action="" className={styles.formContainer}>
            <input type="text" name="name" onChange={handleInput } required placeholder="Name"/>
            <p style={{color: "red"}}>{formErrors.name}</p>

            <input type="text" name="phone"  onChange={handleInput } required placeholder="Phone Number"/>
            <p style={{color: "red"}}>{formErrors.phone}</p>

            <textarea name="address" onChange={handleInput } placeholder="Address" rows={3}></textarea>
            <p style={{color: "red"}}>{formErrors.address}</p>

            <span>
                You will pay <span>${total} </span> on delivery 
                
            </span>

            <button type="submit" onClick={handleSubmit} className="btn" disabled={disableOrderSubmission}>Place Order</button>
        </form>
        <Toaster/>

        </Modal>
     );
}
 
export default OrderModal;