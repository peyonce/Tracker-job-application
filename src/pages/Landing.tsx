import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../pages/Landing.module.css";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <div className={style.container}>
            <h1 className={style.title}>Job Application Tracker</h1>

            <p className={style.description}>
                Stay organized during your job search! Track applications, monitor
                statuses, and manage everything in one place.
            </p>

            <div className={style.buttons}>
                <button onClick={handleLogin} className={style.loginBtn}>
                    Login
                </button>
                <button onClick={handleRegister} className={style.registerBtn}>
                    Register
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
