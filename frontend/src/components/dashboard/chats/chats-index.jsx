import React from "react";
import Dashboard from "../dashboard";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

function ChatsIndex() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, name } = location.state || {};
    const loadChatsUrl = 'http://localhost:4242/api/members/list_of_channels';

    const loadChatsData = async (event) => {
        try {
            const response = await axios.post(`${loadChatsUrl}`,{
                userId:id,
            });
            console.log(response);
            console.log(response.data);
            console.log(response.data.user);
            console.log(response.data.user.channels);
        } catch (error) {
            console.log(error);
        }
    };

    setTimeout(()=>{
        loadChatsData();
    });

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