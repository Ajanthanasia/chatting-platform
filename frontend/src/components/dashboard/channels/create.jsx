import React from "react";
import Dashboard from "../dashboard";

function CreateChannel() {
    return (
        <div className="panel mt-1">
            <div className="row">
                <div className="col-sm-3">
                    <Dashboard />
                </div>
                <div className="col-sm-9">
                    <div className="row mb-1">
                        <div className="col-md-10">
                            Create New Channel
                        </div>
                        <div className="col-md-10">
                            <strong>
                                <label htmlFor="channel">Channel name :</label>
                            </strong>
                            <input
                                type="text"
                                id="channel"
                                className="form-control" />
                        </div>
                        <div className="col-md-10">
                            <button className="btn btn-primary form-control">
                                Create Channel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateChannel;