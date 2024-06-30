import React, { useState } from "react";
import Dashboard from "../dashboard";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import ShowSuccessMessage from "../../routes/msg";

function PrivateChat() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, name, sendUserId } = location.state || {};
    const [privateMessage, setPrivateMessage] = useState("");
    const sendMsgUrl = 'http://localhost:4242/api/members/privatemessage';
    const [msg, setMsg] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (privateMessage === '') {
            } else {
                const response = await axios.post(`${sendMsgUrl}`, {
                    userId: id,
                    toUserID: sendUserId,
                    message: privateMessage,
                });
                setMsg('message sent');
                console.log(response);
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="panel mt-1">
            <ShowSuccessMessage msg={msg} />
            <div className="row">
                <div className="col-sm-3">
                    <Dashboard id={id} name={name} />
                </div>
                <div className="col-sm-9">
                    <div className="row mb-1">
                        <div className="col-md-10">
                            Private Chat
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            Loading Chats ...
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            <div className="form-group">
                                <form onClick={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <input type="text"
                                                className="form-control"
                                                placeholder="Enter your message ..."
                                                value={privateMessage}
                                                onChange={(e) => setPrivateMessage(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <button type="submit" className="btn btn-warning">
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrivateChat;