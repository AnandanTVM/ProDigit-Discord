import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import { ClientNav, EdProfile } from '../../Components'

function EditProfile() {
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
            navigate("/");
        }
    }, [navigate]);
    return (
        <div>
            <ClientNav profile />
            <EdProfile />
        </div>
    )
}

export default EditProfile