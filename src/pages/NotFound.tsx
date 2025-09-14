import { useNavigate } from "react-router-dom";
import styles from "../pages/Auth.module.css";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>404 - Page Not Found</h2>
                <p className={styles.registerText}>
                    Sorry, the page you are looking for does not exist.
                </p>
                <button
                    className={styles.loginBtn}
                    onClick={() => navigate("/home")}
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
}