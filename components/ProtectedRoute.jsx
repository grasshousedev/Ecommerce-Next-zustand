import {useAuth} from '../pages/Contexts/AuthContext'
import { useRouter } from 'next/router'

const ProtectedRoute = ({children}) => {
    const router = useRouter()
    const{currentUser} = useAuth()

    if(!currentUser){
        router.push('/login')
        return null
    }

    return children
}

export default ProtectedRoute