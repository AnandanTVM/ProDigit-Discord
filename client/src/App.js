import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ClientHome, ForgotPassword, Home, HomeSignup } from "./Pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sginup" element={<HomeSignup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/client/home" element={<ClientHome />} />
      </Routes>
    </div>
  );
}

export default App;
