import React, { useState } from "react";
import Dashboard from "../dashboard";
import { useLocation } from "react-router-dom";
import axios from "axios";

function DashboardUserList() {
    const [users, setUsers] = useState([{ id: 1, username: 'no user', channels: '0' }]);
    const loadUrl = 'http://localhost:4242/api/members/users';
    const location = useLocation();
    const { id, name } = location.state || {};

    const loadUserData = async (event) => {
        try {
            const response = await axios.get(`${loadUrl}`, {});
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    setTimeout(() => {
        loadUserData();
    }, 2000);

    return (
        <div className="panel mt-1">
            <div className="row">
                <div className="col-sm-3">
                    <Dashboard id={id} name={name} />
                </div>
                <div className="col-sm-9">
                    <div className="row">
                        <div className="col-md-10">
                            List of Users
                        </div>
                        {users.map((user, index) => (
                            <div className="col-md-10" key={index}>
                                <div className="form-control">
                                    <strong>{user.username}</strong>
                                    <p>Channels : {user.channels}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardUserList;