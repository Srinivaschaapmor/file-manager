import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

const DashboardLayout = () => {
  return (
    <Grid container>
      <Grid item xs={2.5} minHeight={"100vh"}>
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={9.5}
        sx={{ p: 2, bgcolor: "rgb(238, 242, 246)", maxHeight: "100vh" }}
      >
        <Header />
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;
