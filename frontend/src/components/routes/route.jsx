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
            </Routes>
        </BrowserRouter>
    );
}
export default Routing;