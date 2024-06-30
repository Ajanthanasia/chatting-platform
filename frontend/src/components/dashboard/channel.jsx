import React from "react";
import Dashboard from "./dashboard";

function ChannelListDashboard() {
    return (
        <div className="panel mt-1">
            <div className="row">
                <div className="col-sm-3">
                    <Dashboard />
                </div>
                <div className="col-sm-9">
                    <div className="row">
                        <div className="col-sm-12">
                            <span>Channels</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8">
                            <button className="btn btn-primary">
                                Add Channel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChannelListDashboard;