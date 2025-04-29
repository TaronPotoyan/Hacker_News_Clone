import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Create_User() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit() {
        fetch('http://localhost:3000/login/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        })
        .then(res => res.json())
        .then(data => {
            console.log("User created:", data);
            if (data.error) {
                alert (`${data.error}`)
            }
            navigate('/');
        })
        .catch(error => {
            console.error("Error creating user:", error);
    
        });
    }
    

    return (
        <div className="forgot-container">
            <h2>Create User</h2>
            <p>Enter your name and password to create a user.</p>
            <input
                type="text"
                className="inp"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="password"
                className="inp"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="logbtn" onClick={handleSubmit}>
                Create User
            </button>
        </div>
    );
}
