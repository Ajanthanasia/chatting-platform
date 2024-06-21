import React, { useState } from "react";
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const url = 'http://localhost:4242/api/members/login';

    const handleSubmit = async (event) => {
        event.preventDefault();
        setUsernameError('');
        setPasswordError('');
        if (username === '') {
            setUsernameError('Username is required');
        } else if (password === '') {
            setPasswordError('Password is required');
        } else {
            console.log(username);
            console.log(password);
            try {
                const response = await axios.post(`${url}`, {
                    username: username,
                    password: password,
                });
                console.log(response);
                console.log('Login successfully!');
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <div className="panel">
            <div className="row">
                <div className="col-md-12">
                    <span>Welcome to Chatting app</span>
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
                            <button type="submit" className="btn btn-primary form-control">Sign In</button>
                        </div>
                    </div>
                </div>
            </form>
            <hr />
            <div className="row">
                <div className="col-md-6">
                    <a href="signup">
                        <button className="btn btn-info">Sign Up</button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;