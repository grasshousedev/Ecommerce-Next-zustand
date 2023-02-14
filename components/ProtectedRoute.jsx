import {useAuth} from '../pages/Contexts/AuthContext'
import { useRouter } from 'next/router'

const ProtectedRoute = ({children}) => {
    const router = useRouter()
    const{currentUser} = useAuth()

    if(!currentUser){
        //storing the route the user was trying to access in the session storage then redirect him to the login page
        sessionStorage.setItem('privateRoute', router.asPath);
        router.push('/login')
        return null
    }

    return children
}

export default ProtectedRoute