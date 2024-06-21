import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../login/login";
import Signup from "../signup/signup";
import Dashboard from "../dashboard/dashboard";
import Profile from "../dashboard/profile";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="signup" element={<Signup />}></Route>
                <Route path="dashboard" element={<Dashboard />}></Route>
                <Route path="profile" element={<Profile />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default Routing;