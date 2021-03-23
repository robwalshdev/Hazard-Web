import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import Map from "../Map/Map";

async function loginUser(credentials) {
    return fetch('http://road-hazard-alert-system.eu-west-1.elasticbeanstalk.com/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

    return (
        <div className="Login">
            <Map />
            <div className="LoginSection">
                <form onSubmit={handleSubmit} className="LoginForm">
                    <h2>Login</h2>
                    <h5>Please enter your username and password to login.</h5>
                    <input type="text" placeholder="Username" className="LoginInput" onChange={e => setUserName(e.target.value)} />
                    <input type="password" placeholder="Password" className="LoginInput" onChange={e => setPassword(e.target.value)} />
                    <button type="submit" className="LoginButton">Login</button>
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};