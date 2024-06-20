import React, { useState } from "react";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setemailError] = useState("");
    const [url, setUrl] = useState('#');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(username);
        console.log(email);
        console.log(password);
    }
    return (
        <div className="panel">
            <div className="row">
                <div className="col-md-12">
                    Register your Account
                </div>
            </div>

        </div>
    );
}

export default Signup;