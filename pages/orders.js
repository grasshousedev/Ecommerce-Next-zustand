import Layout from "../components/Layout"
import ProtectedRoute from "../components/ProtectedRoute";

const Order= ()=>{
    return(
        <Layout>
            <ProtectedRoute>
                <div>
                    No order so far!
                </div>
            </ProtectedRoute>
            
        </Layout>
    )
}

export default Order;