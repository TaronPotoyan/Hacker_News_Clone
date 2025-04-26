import { useEffect, useState } from "react";
import Header from "../components/header";
import React from "react";

export default function User_Page() {
    const [user, Setuser] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const logged = localStorage.getItem('user');
        const date = localStorage.getItem('date');
        Setuser(logged || '');
        setDate(date || '');
        setIsLoggedIn(!!logged); 
    }, []);

    return (
        <>
            <Header />
            {isLoggedIn ? (
                <Profil user={user} date={date} />
            ) : (
                <div className="user">
                    <p>Please log in to view your profile.</p>
                </div>
            )}
        </>
    );
}

function Profil({ user, date }: { user: string | null; date: string | null }) {
    const [pemail, setPemail] = useState(localStorage.getItem('email'));
    const [update, setUpdate] = useState(false);
    const [about, setAbout] = useState(localStorage.getItem('about') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');

    const handleUpdate = () => setUpdate(true);

    useEffect(() => {
        if (update) {
            fetch(`http://localhost:3000/users/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: user,
                    password: localStorage.getItem('password'),
                    email,
                    about,
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log('Update success:', data);
                if (data.email) {
                    setPemail(data.email);
                    localStorage.setItem('email', data.email);
                }    
                if (data.about != "undefined") {
                    setAbout(data.about); 
                    localStorage.setItem('about', data.about);
                } 
            })
            .catch((err) => {
                console.error('Update failed:', err);
                setUpdate(false);
            });
        }
    }, [update]);

    return (
        <div className="user">
            <span>User: {user}</span>
            <br />
            <span>Created: {date}</span>
            <br />
            <br />
            {pemail && (
                <>
                    <span>Email: {pemail}</span>
                    <input
                        type="text"
                        placeholder="Update your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                </>
            )}
            <label htmlFor="about">About: </label>
            <br />
            <textarea
                id="about"
                rows={6}
                cols={50}
                placeholder="Tell us about yourself..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
            />
            <br />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}