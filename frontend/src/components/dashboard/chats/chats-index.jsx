import React from "react";
import Dashboard from "../dashboard";
import { useNavigate, useLocation } from "react-router-dom";

function ChatsIndex() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, name } = location.state || {};

    return (
        <div className="panel mt-1">
            <div className="row">
                <div className="col-sm-3">
                    <Dashboard id={id} name={name} />
                </div>
                <div className="col-sm-9">
                    <div className="row mb-1">
                        <div className="col-md-10">
                            List of Chats
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatsIndex;