import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";

import Frontend from "./components/Frontend";
import Backend from "./components/Backend";
import Dashboard from "./components/dashboard/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route exact path="/login"></Route>
        {/* Protected Routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />}></Route>
          {/* <Route path="/frontend" element={<Frontend />}></Route>
          <Route path="/backend" element={<Backend />}></Route> */}
          <Route path="/:folder/:sub-folder/:range/:tab/:sub-tab"></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
