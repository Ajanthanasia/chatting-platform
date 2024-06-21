import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const url = 'http://localhost:4242/api/members/register';
    const navigate = useNavigate();
    const loginPageUrl = '/';

    const handleSubmit = async (event) => {
        event.preventDefault();
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        if (username === '') {
            setUsernameError('Username is required');
        } else if (email === '') {
            setEmailError('Email is required');
        }
        else if (password === '') {
            setPasswordError('Password is required');
        } else {
            try {
                const response = await axios.post(`${url}`, {
                    username: username,
                    email: email,
                    password: password,
                });
                console.log(response);
                console.log('Register successfully');
                navigate(loginPageUrl);
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <div className="panel">
            <div className="row">
                <div className="col-md-12">
                    Register your Account
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-8">
                            <strong>
                                <label htmlFor="username">Username :</label>
                            </strong>
                        </div>
                        <div className="col-md-8">
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <b>{usernameError}</b>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-8">
                            <strong>
                                <label htmlFor="email">Email</label>
                            </strong>
                        </div>
                        <div className="col-md-8">
                            <input
                                type="text"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <b>{emailError}</b>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-8">
                            <strong>
                                <label htmlFor="password">Password :</label>
                            </strong>
                        </div>
                        <div className="col-md-8">
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <b>{passwordError}</b>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-8">
                            <button type="submit" className="btn btn-primary form-control">Sign Up</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Signup;