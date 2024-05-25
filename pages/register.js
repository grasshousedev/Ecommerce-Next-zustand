import Layout from "../components/Layout";
import styles from "../styles/Register.module.css";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { url } from "../constants/constants";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formData));

    if (Object.keys(formErrors).length === 0) {
      try {
        setLoading(true);
        const response = await axios.post(`${url}/sign-up`, formData);
        toast.success("Account created successfully!");
        router.push("/");
      } catch (error) {
        console.error(error);
        setFormErrors({ signUpStatus: "Failed to create an account" });
      }

      setLoading(false);
    }
  };

  const validate = (formInput) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!formInput.fullName) {
      errors.name = "Full name is required!";
    }

    if (!formInput.username) {
      errors.username = "Username is required!";
    }
    if (!formInput.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(formInput.email)) {
      errors.email = "This is not a valide email format!";
    }

    if (!formInput.password) {
      errors.password = "Password is required!";
    } else if (formInput.password.length < 4) {
      errors.password = "Password should be more than 4 characters";
    } else if (formInput.password.length > 15) {
      errors.password = "Passwords cannot exceed 15 characters";
    }

    if (!formInput.confirmPassword) {
      errors.confirmPassword = "Retype the password";
    } else if (formInput.password !== formInput.confirmPassword) {
      errors.confirmPassword = "Passwords do not macth!";
    }

    return errors;
  };
  return (
    <Layout>
      <form action="" className={styles.formContainer}>
        <span>Register</span>

        <input
          type="text"
          name="name"
          placeholder="Full name"
          onChange={handleInput}
          required
        />
        <p style={{ color: "red" }}>{formErrors.fullName}</p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleInput}
          required
        />
        <p style={{ color: "red" }}>{formErrors.userName}</p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInput}
          required
        />
        <p style={{ color: "red" }}>{formErrors.email}</p>

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInput}
          required
        />
        <p style={{ color: "red" }}>{formErrors.password}</p>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleInput}
          required
        />
        <p style={{ color: "red" }}>{formErrors.confirmPassword}</p>
        <p style={{ color: "red" }}>{formErrors.signUpStatus}</p>

        <button
          type="submit"
          disabled={loading}
          className="btn"
          onClick={handleSubmit}
        >
          Register
        </button>

        <span>
          Already have an account?
          <Link href="/login">
            <span className={styles.signUp}> Login</span>
          </Link>
        </span>
      </form>
      <Toaster />
    </Layout>
  );
};

export default Register;
