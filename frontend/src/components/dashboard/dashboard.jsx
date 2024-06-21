import React from "react";

function Dashboard() {
    return (
        <>
            <div className="mb-1">
                <button className="btn btn-sm btn-success">
                    Profile
                </button>
            </div>
            <div className="mb-1">
                <a href="channel-list">
                    <button className="btn btn-sm btn-success">
                        Channel
                    </button>
                </a>
            </div>
            <div className="mb-1">
                <button className="btn btn-sm btn-success">
                    Chats
                </button>
            </div>
            <div className="mb-1">
                <button className="btn btn-sm btn-success">
                    Logout
                </button>
            </div>
        </>
    );
}

export default Dashboard;