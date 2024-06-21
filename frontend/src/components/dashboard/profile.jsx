import React from "react";
import Dashboard from "./dashboard";

function Profile() {
    return (
        <div className="panel mt-1">
            <div className="row">
                <div className="col-sm-3">
                    <Dashboard />
                </div>
                <div className="col-sm-9">
                    <div className="row">
                        <div className="col-sm-12">
                            <span>Hi, username</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;