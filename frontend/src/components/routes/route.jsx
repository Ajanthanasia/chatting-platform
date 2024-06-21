import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../login/login";
import Signup from "../signup/signup";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="signup" element={<Signup />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default Routing;