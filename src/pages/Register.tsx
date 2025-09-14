import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../pages/Auth.module.css";

const API_URL = "http://localhost:5000";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {

            const res = await fetch(`${API_URL}/users?username=${username}`);
            const data = await res.json();

            if (data.length > 0) {
                setError("Username already exists");
                return;
            }


            await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });


            navigate("/login");
        } catch (err) {
            console.error(err);
            setError("Server error, try again later");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Register</h2>
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

                    <label className={styles.label}>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={styles.input}
                    />

                    <button className={styles.loginBtn} onClick={handleRegister}>
                        Register
                    </button>

                    {error && <p className={styles.registerText}>{error}</p>}

                    <p className={styles.registerText}>
                        Already have an account?{" "}
                        <span
                            className={styles.registerLink}
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
