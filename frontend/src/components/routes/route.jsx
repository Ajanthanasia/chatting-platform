import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../login/login";
import Signup from "../signup/signup";
import Dashboard from "../dashboard/dashboard";
import Profile from "../dashboard/profile";
import ChannelListDashboard from "../dashboard/channel";
import DashboardUserList from "../dashboard/users/users";
import ChannelIndex from "../dashboard/channels/channels-index";
import CreateChannel from "../dashboard/channels/create";
import ChatsIndex from "../dashboard/chats/chats-index";
import EditChannel from "../dashboard/channels/edit";
import PrivateChat from "../dashboard/chats/private-chat";
import ChannelChat from "../dashboard/chats/channel-chat";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="signup" element={<Signup />}></Route>
                <Route path="dashboard" element={<Dashboard />}></Route>
                <Route path="profile" element={<Profile />}></Route>
                <Route path="channel-list" element={<ChannelListDashboard />}></Route>
                <Route path="dashboard-users" element={<DashboardUserList />}></Route>
                <Route path="channels-index" element={<ChannelIndex />}></Route>
                <Route path="channels-create" element={<CreateChannel />}></Route>
                <Route path="chats-index" element={<ChatsIndex />}></Route>
                <Route path="channels-edit" element={<EditChannel />}></Route>
                <Route path="private-chat" element={<PrivateChat />}></Route>
                <Route path="channels-chat" element={<ChannelChat />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default Routing;