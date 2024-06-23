import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./dashboard";
import axios from "axios";

function Profile() {
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [requsername, setRequsername] = useState("");
    const location = useLocation();
    const { id, name } = location.state || {};
    const url = 'http://localhost:4242/api/members/editUser';
    const navigate = useNavigate();
    const successUrl = '/profile';

    setTimeout(() => {
        setUserId(id);
        setUsername(name);
    }, 1000);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`${url}`, {
                userId: userId,
                newUsername: requsername,
            });
            // console.log(response);
            // console.log(response.data.username);
            console.log('Successfully updated');
            const data = { id: response.data.userId, name: response.data.username };
            navigate(successUrl, { state: data });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="panel mt-1">
            <div className="row">
                <div className="col-sm-3">
                    <Dashboard id={userId} name={username} />
                </div>
                <div className="col-sm-9">
                    <div className="row">
                        <div className="col-sm-12">
                            <span>Hi,{username}</span>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-8 mb-1">
                                <h3>
                                    Edit your username
                                </h3>
                            </div>
                            <div className="col-md-8 mb-1">
                                <strong>
                                    <label htmlFor="">Username</label>
                                </strong>
                            </div>
                            <div className="col-md-8 mb-1">
                                <input type="text"
                                    className="form-control"
                                    value={requsername}
                                    onChange={(e) => setRequsername(e.target.value)}
                                />
                            </div>
                            <div className="col-md-8 mb-1">
                                <button type="submit" className="btn btn-primary form-control">
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;