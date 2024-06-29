import React, { useState } from "react";
import Dashboard from "../dashboard";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function CreateChannel() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, name } = location.state || {};
    const [channel, setChannel] = useState("");
    const url = 'http://localhost:4242/api/members/createchannel';
    const successUrl = '/channels-index';

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}`, {
                userId: id,
                channelName: channel,
            });
            // console.log(response);
            // console.log(response.data);
            console.log('Successfully updated');
            const data = { id: id, name: name };
            navigate(successUrl, { state: data });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="panel mt-1">
            <div className="row">
                <div className="col-sm-3">
                    <Dashboard id={id} name={name} />
                </div>
                <div className="col-sm-9">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-1">
                            <div className="col-md-10">
                                Create New Channel
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
                                    Create Channel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateChannel;