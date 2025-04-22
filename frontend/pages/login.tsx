import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <>
            <div className="Log-in">
                <h2>Log in</h2>
                <div className="container">
                    <big>username: </big>  
                    <input type="text" className="inp" />
                </div>
                <div className="container">
                    <big>Password: </big>
                    <input type="password" className="inp" />
                </div>
                
                <div>
                    <Link to="/forgot" className="forgot-link">Forgot Password?</Link>
                </div>

                <button className="logbtn">Log in</button>
            </div>
        </>
    );
}
