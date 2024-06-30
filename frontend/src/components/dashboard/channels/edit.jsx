import React, { useState } from "react";
import Dashboard from "../dashboard";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ShowSuccessMessage from "../../routes/msg";

function EditChannel() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, name, editChannel, editChannelId } = location.state || {};
    const [channel, setChannel] = useState(editChannel);
    const [channelId, setChannelId] = useState(editChannelId);
    const url = 'http://localhost:4242/api/members/editChannel';
    const successUrl = '/channels-index';
    const [msg, setMsg] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`${url}`, {
                userId: id,
                newChannel: channel,
                channelId: channelId,
            });
            const data = { id: id, name: name };
            setMsg(response.data.message);
            setTimeout(() => {
                navigate(successUrl, { state: data });
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="panel mt-1">
            <ShowSuccessMessage msg={msg}></ShowSuccessMessage>
            <div className="row">
                <div className="col-sm-3">
                    <Dashboard id={id} name={name} />
                </div>
                <div className="col-sm-9">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-1">
                            <div className="col-md-10">
                                Edit your Channel
                            </div>
                            <div className="col-md-10">
                                <strong>
                                    <label htmlFor="channel">Channel name :</label>
                                </strong>
                                <input
                                    type="text"
                                    id="channel"
                                    className="form-control"
                                    value={channel}
                                    onChange={(e) => setChannel(e.target.value)}
                                />
                            </div>
                            <div className="col-md-10">
                                <button type="submit" className="btn btn-primary form-control" >
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default EditChannel;