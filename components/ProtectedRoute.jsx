import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../pages/Contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, checkAuthStatus } = useAuth();

  useEffect(() => {
    checkAuthStatus(); // Check authentication status on component mount/update

    if (!isAuthenticated) {
      // Store the intended route in session storage
      sessionStorage.setItem("intendedRoute", router.pathname);
      router.push("/login");
    }
  }, [isAuthenticated, router, checkAuthStatus]);

  return <>{isAuthenticated ? children : null}</>;
};

export default ProtectedRoute;
