import React, { useState } from "react";
import Dashboard from "../dashboard";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import ShowSuccessMessage from "../../routes/msg";

function ChannelChat() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, name, channelName, channelId } = location.state || {};
    const [channelMessage, setChannelMessage] = useState("");
    const [channelMessageError, setChannelMessageError] = useState("");
    const sendChannelMsgUrl = 'http://localhost:4242/api/members/sendmessage';
    const [msg, setMsg] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (channelMessage === '') {
                setChannelMessageError('Message is required');
            } else {
                const response = await axios.post(`${sendChannelMsgUrl}`, {
                    userId: id,
                    channelName: channelName,
                    message: channelMessage,
                });
                setMsg('message sent');
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
                            Channel :
                            <strong>{channelName}</strong>
                        </div>
                        <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-control">Loading</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className="form-group">
                                <form onClick={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <input type="text"
                                                className="form-control"
                                                placeholder="Enter your message ..."
                                                value={channelMessage}
                                                onChange={(e) => setChannelMessage(e.target.value)}
                                            />
                                            <b>{channelMessageError}</b>
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

export default ChannelChat;