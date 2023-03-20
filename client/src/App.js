import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import {
  AddFriend,
  ClientHome,
  ForgotPassword,
  Home,
  HomeSignup,
  InviteFriend,
  Profile,
} from "./Pages";
import "./App.css";

const ENDPOINT = "http://localhost:3001";
function App() {
  const socket = useRef();
  const { clientDetails } = useSelector((state) => state.admin);
  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("addUser", clientDetails.userId);
  }, [clientDetails.userId]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sginup" element={<HomeSignup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/client/home" element={<ClientHome />} />
        <Route path="/client/addFriend" element={<AddFriend />} />
        <Route path="/client/invite" element={<InviteFriend />} />
        <Route path="/client/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
