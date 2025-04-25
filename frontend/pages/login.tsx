import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin() {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name : name, password : password})
        })
        .then(res => res.json())
        .then(data => {
            if (data.message || data.user.name === undefined) {
                alert(`Log in fall : ${data.message}`)
            }else {
                alert('Login success');
                navigate('/');
                localStorage.setItem('user', data.user.name);
                localStorage.setItem('date', data.user.date);
                localStorage.setItem('password', data.user.password);
                localStorage.setItem('email',data.user.email);
                localStorage.setItem('about' , data.user.about);
            }              

        })
        .catch(err => {
            alert('Error loging')
            console.error(err);
        });
    }
    

    return (
        <div className="Log-in">
            <h2>Log in</h2>
            <div className="container">
                <big>Username: </big>  
                <input 
                    type="text" 
                    className="inp" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                />
            </div>
            <div className="container">
                <big>Password: </big>
                <input 
                    type="password" 
                    className="inp" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                />
            </div>
            <div>
                <Link to="/CreatUser" className="forgot-link">Creat new account?</Link>
            </div>
            <button className="logbtn" onClick={handleLogin}>Log in</button>
        </div>
    );
}
