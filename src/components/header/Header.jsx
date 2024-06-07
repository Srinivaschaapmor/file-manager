import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { Link, useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../common/components/breadcrumbs/Breadcrumbs";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const path = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container sx={{ height: "60px", padding: "10px", mb: 2 }}>
      <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
        <Box>{path.pathname !== "/" && <Breadcrumbs />}</Box>
        <Box
          display={"flex"}
          // width={"250px"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          sx={{ height: 40, mr: 1 }}
          gap={2}
        >
          {/* Avatar */}
          <IconButton
            onClick={handleClick}
            sx={{ ":hover": { bgcolor: "transparent" } }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://img.freepik.com/premium-photo/bearded-man-illustration_665280-67047.jpg"
              sx={{
                ":hover": { backgroundColor: "#E1DDFF,0.5" },
                p: 0,
              }}
            />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Stack>
    </Container>
  );
};

export default Header;
