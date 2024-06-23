import React, { useState } from "react";
import Dashboard from "../dashboard";
import { useLocation } from "react-router-dom";
import axios from 'axios';

function ChannelIndex() {
    const [channels, setChannels] = useState([{ id: 1, name: 'cha' }]);
    const loadUrl = 'http://localhost:4242/api/members/listChannels';
    const location = useLocation();
    const { id, name } = location.state || {};

    const loadChannelsData = async (event) => {
        try {
            const response = await axios.get(`${loadUrl}`, {});
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    setTimeout(() => {
        loadChannelsData();
    }, 2000);
    return (
        <div className="panel mt-1">
            <div className="row">
                <div className="col-sm-3">
                    <Dashboard id={id} name={name}/>
                </div>
                <div className="col-sm-9">
                    <div className="row mb-1">
                        <div className="col-md-10">
                            List of Channels
                        </div>
                        <div className="col-md-6">
                            <a href="channels-create">
                                <button className="btn btn-primary form-control">
                                    Create Channel
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        {channels.map((channel, index) => (
                            <div className="col-md-9" key={index}>
                                <div className="form-control">
                                    <span>{index}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ChannelIndex;