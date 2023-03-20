import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

import { AFriends, ClientNav } from "../../Components";
function AddFriends() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = jwt(token);


            if (!user) {
                localStorage.removeItem("token");
                navigate("/");
            } else {
                // populateQuote()
            }
        } else {
            navigate("/login");
        }
    }, [navigate]);
    return (
        <div>
            <ClientNav add />
            <AFriends />

        </div>
    )
}

export default AddFriends