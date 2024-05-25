import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import styles from "../styles/Login.module.css";
import { useAuth } from "./Contexts/AuthContext";
import axios from "axios";
import { url } from "../constants/constants";

function parseJwt(token) {
  if (!token) {
    return;
  }
  const [header, payload, signature] = token.split(".");
  const base64 = payload.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

const Login = () => {
  const router = useRouter();
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = (formInput) => {
    const errors = {};
    if (!formInput.username) {
      errors.username = "Username is required!";
    }
    if (!formInput.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formData));
    if (Object.keys(formErrors).length === 0) {
      try {
        setLoading(true);
        const response = await axios.post(`${url}/authenticate`, formData);
        const token = response.data;

        if (token) {
          const decodedToken = parseJwt(token);
          const { role, userId } = decodedToken;
          const intendedRoute = sessionStorage.getItem("intendedRoute");
          login({ token, username: formData.username, role, userId });

          // Redirect based on role
          if (role === "ADMIN") {
            router.push("/admin/");
          } else if (role === "USER") {
            router.push("/"); // Replace with desired location for USER role
          } else {
            // Handle unexpected roles (optional)
            console.warn("Unexpected role:", role);
            // Redirect to a default location (e.g., login page)
            router.push("/login");
          }

          if (intendedRoute) {
            sessionStorage.removeItem("intendedRoute");
          }
        }
      } catch (error) {
        console.log(error);
        setFormErrors({
          loginStatus: "Invalid username or password. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Layout>
      <form action="" className={styles.formContainer}>
        <span>Login</span>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleInput}
          required
        />
        <p style={{ color: "red" }}>{formErrors.username}</p>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInput}
          required
        />
        <p style={{ color: "red" }}>{formErrors.password}</p>
        <p style={{ color: "red" }}>{formErrors.loginStatus}</p>
        <button
          type="submit"
          disabled={loading}
          className="btn"
          onClick={handleSubmit}
        >
          Login
        </button>
        <span>
          Do not have an account?{" "}
          <Link href="/register">
            <span className={styles.signUp}> Register</span>
          </Link>
        </span>
      </form>
    </Layout>
  );
};

export default Login;
