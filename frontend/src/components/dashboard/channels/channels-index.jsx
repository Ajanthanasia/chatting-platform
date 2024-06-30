import React, { useState } from "react";
import Dashboard from "../dashboard";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import ShowSuccessMessage from "../../routes/msg";

function ChannelIndex() {
    const navigate = useNavigate();
    const [channels, setChannels] = useState([{ id: 1, channels: 'loading...' }]);
    const loadUrl = 'http://localhost:4242/api/members/listChannels';
    const deleteChannelUrl = 'http://localhost:4242/api/members/deletechannel';
    const location = useLocation();
    const { id, name } = location.state || {};
    const [msg, setMsg] = useState("");
    const joinChannelUrl = "http://localhost:4242/api/members/joinchannel";
    const leaveChanelUrl = "http://localhost:4242/api/members/leavechannel";

    const loadChannelsData = async (event) => {
        try {
            const response = await axios.get(`${loadUrl}`, {});
            setChannels(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    setTimeout(() => {
        loadChannelsData();
    }, 1000);

    const deleteChannel = async (event) => {
        try {
            const response = await axios.post(`${deleteChannelUrl}`, {
                ownerId: id,
                channelName: event,
            });
            setMsg(response.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    const joinChannel = async (event) => {
        console.log(event);
        try {
            const response = await axios.post(`${joinChannelUrl}`, {
                userId: id,
                channelName: event,
            });
            setMsg(response.data.message);

        } catch (error) {
            console.log(error);
        }
    }

    const leaveChannel = async (event) => {
        console.log(event);
        try {
            const response = await axios.post(`${leaveChanelUrl}`, {
                userId: id,
                channelName: event,
            });
            setMsg(response.data.message);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="panel mt-1">
            <div className="row">
                <ShowSuccessMessage msg={msg} />
                <div className="col-sm-3">
                    <Dashboard id={id} name={name} />
                </div>
                <div className="col-sm-9">
                    <div className="row mb-1">
                        <div className="col-md-10">
                            List of Channels
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-primary form-control"
                                onClick={() => { navigate('/channels-create', { state: { id: id, name: name } }) }}>
                                Create Channel
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        {channels.map((channel, index) => (
                            <div className="col-md-9" key={index}>
                                <div className="form-control">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="">Channel : </label>
                                            <span>{channel.channels}</span>
                                        </div>
                                    </div>
                                    {id === channel.creatorId ?
                                        <div className="row">
                                            <div className="col-md-3">
                                                <button className="btn btn-primary"
                                                    onClick={() => { navigate('/channels-edit', { state: { id: id, name: name, editChannel: channel.channels, editChannelId: channel.id } }) }}>
                                                    Edit
                                                </button>
                                            </div>
                                            <div className="col-md-3">
                                                <button className="btn btn-danger" onClick={() => deleteChannel(channel.channels)}>
                                                    Delete
                                                </button>
                                            </div>
                                            <div className="col-md-3">
                                                <button className="btn btn-warning"
                                                    onClick={() => { navigate('/channels-chat', { state: { id: id, name: name, channelName: channel.channels, channelId: channel.id } }) }}>
                                                    msg
                                                </button>
                                            </div>
                                        </div>
                                        :
                                        <div className="row">
                                            <div className="col-md-3">
                                                <button className="btn btn-success"
                                                    onClick={() => joinChannel(channel.channels)}>
                                                    Join
                                                </button>
                                            </div>
                                            <div className="col-md-3">
                                                <button className="btn btn-danger"
                                                    onClick={() => leaveChannel(channel.channels)}>
                                                    Leave
                                                </button>
                                            </div>
                                            <div className="col-md-3">
                                                <button className="btn btn-warning"
                                                    onClick={() => { navigate('/channels-chat', { state: { id: id, name: name, channelName: channel.channels, channelId: channel.id } }) }}>
                                                    msg
                                                </button>
                                            </div>
                                        </div>
                                    }
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