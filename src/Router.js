import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route exact path="/login"></Route>
        {/* Protected Routes */}
        <Route path="/">
          <Route index></Route>
          <Route path="/:folder/:sub-folder/:range/:tab/:sub-tab"></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
