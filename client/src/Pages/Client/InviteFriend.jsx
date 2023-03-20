import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

import { ClientNav, Invites, Penging } from "../../Components";

function InviteFriend() {
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
            <ClientNav invite />

            <Penging />
            <Invites />
        </div>
    )
}

export default InviteFriend