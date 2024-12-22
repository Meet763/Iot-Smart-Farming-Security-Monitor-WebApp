import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ControlPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleControlAction = async (action) => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            alert("User is not logged in. Please log in.");
            navigate("/login");
            return;
        }
    
        setLoading(true);
        try {
            const response = await axios.post(
                "http://206.189.138.125/auth/control",
                { action },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Response:", response.data);
            alert(response.data.message);
        } catch (err) {
            console.error("Error:", err.response || err);
            if (err.response && err.response.status === 401) {
                alert("Session expired. Please log in again.");
                navigate("/login");
            } else {
                alert("An error occurred while sending the control action.");
            }
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="bg-gray-50 min-h-screen p-4">
            <div className="bg-white shadow-lg rounded-md p-6 max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <button
                        className="bg-green-200 hover:bg-green-300 text-green-800 px-4 py-2 rounded-md"
                        onClick={() => navigate("/")}
                    >
                        Goto Monitoring
                    </button>
                </div>

                {/* Control Section */}
                <div className="text-center">
                    <h1 className="text-xl font-bold text-gray-700 mb-6">
                        Simulate Alerts for Topic: CONTROL_TOPIC
                    </h1>
                    <div className="flex justify-center space-x-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium"
                            onClick={() => handleControlAction("start")}
                            disabled={loading}
                        >
                            {loading ? "Starting..." : "Start Electric Current"}
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium"
                            onClick={() => handleControlAction("stop")}
                            disabled={loading}
                        >
                            {loading ? "Stopping..." : "Stop Electric Current"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlPage;
