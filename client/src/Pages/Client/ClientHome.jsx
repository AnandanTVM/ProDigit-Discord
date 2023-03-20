import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import { useDispatch } from "react-redux";
import { ClientLoginInfo } from "../../redux/adminReducer";
import { Chat, ClientNav } from "../../Components";
function ClientHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt(token);
      console.log(user);
      dispatch(ClientLoginInfo(user));
      if (!user) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        // populateQuote()
      }
    } else {
      navigate("/");
    }
  }, [dispatch, navigate]);
  return <div>
    <ClientNav home />
    <Chat />
  </div>;
}

export default ClientHome;
