import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  AddFriend,
  ClientHome,
  ForgotPassword,
  Home,
  HomeSignup,
  InviteFriend,
} from "./Pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sginup" element={<HomeSignup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/client/home" element={<ClientHome />} />
        <Route path="/client/addFriend" element={<AddFriend />} />
        <Route path="/client/invite" element={<InviteFriend />} />
      </Routes>
    </div>
  );
}

export default App;
