import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";

import Dashboard from "./components/dashboard/Dashboard";
import ContentPanel from "./components/content-panel/ContentPanel";
import LoginLayout from "./components/layouts/LoginLayout";
import { Login } from "./components/login/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route  path="/login" element={<LoginLayout />}>
          <Route index element={<Login />} />
        
          
        </Route>
        {/* Protected Routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />}></Route>
         
          <Route
            path="/:folder/:subFolder/:range/:tab/:subTab"
            element={<ContentPanel />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
