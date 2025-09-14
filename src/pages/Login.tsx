import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../pages/Auth.module.css";

const API_URL = "http://localhost:5000";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/users?username=${username}&password=${password}`
      );
      const data = await res.json();

      if (data.length > 0) {
        localStorage.setItem("user", JSON.stringify(data[0]));
        navigate("/home");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server error, try again later");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.form}>
          <label className={styles.label}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />

          <label className={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />

          <button className={styles.loginBtn} onClick={handleLogin}>
            Login
          </button>

          {error && <p className={styles.registerText}>{error}</p>}

          <p className={styles.registerText}>
            Don't have an account?{" "}
            <span
              className={styles.registerLink}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
