import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/login/loginPage";
import Dashboard from "../pages/dashboard/dashboard";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  );
};

export default Routing;
