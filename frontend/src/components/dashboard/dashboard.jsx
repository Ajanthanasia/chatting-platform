import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard(props) {
    const { id, name } = props;
    const navigate = useNavigate();
    return (
        <>
            <div className="mb-1">
                <button className="btn btn-sm btn-success"
                    onClick={() => { navigate('/profile', { state: { id: id, name: name } }) }}>
                    Profile
                </button>
            </div>
            <div className="mb-1">
                <button className="btn btn-sm btn-success"
                    onClick={() => { navigate('/dashboard-users', { state: { id: id, name: name } }) }}>
                    Friends
                </button>
            </div>
            <div className="mb-1">
                <a href="channels-index">
                    <button className="btn btn-sm btn-success"
                        onClick={() => { navigate('/channels-index', { state: { id: id, name: name } }) }}>
                        Channels
                    </button>
                </a>
            </div>
            <div className="mb-1">
                <button className="btn btn-sm btn-success"
                    onClick={() => { navigate('/chats-index', { state: { id: id, name: name } }) }}>
                    Chats
                </button>
            </div>
            <div className="mb-1">
                <button className="btn btn-sm btn-success" onClick={() => { navigate('/') }}>
                    Logout
                </button>
            </div>
        </>
    );
}

export default Dashboard;