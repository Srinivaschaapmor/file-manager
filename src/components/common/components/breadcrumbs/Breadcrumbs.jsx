import { Box, Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
const Breadcrumbs = () => {
  const location = useLocation();
  const { item1, level1, tab1, year, itemOne } = useParams();
  return (
    <Box sx={{ pt: 1, pl: 2 }}>
      <MuiBreadcrumbs maxItems={2} aria-label="breadcrumb">
        <Typography sx={{ fontSize: 14 }}>{item1}</Typography>
        <Typography sx={{ fontSize: 14 }}>{level1}</Typography>

        <Typography
          color="text.primary"
          fontWeight={600}
          sx={{
            fontSize: 14,
            position: "relative",
            overflow: "hidden",
            transition: "color 0.5s linear", // Transition for text color
            "&::before": {
              content: "''",
              position: "absolute",
              width: "100%",
              height: "2px",
              bottom: 0,
              left: 0,
              backgroundColor: "currentColor",
              transform: "translateX(-100%)",
              transition: "transform 0.1s linear, background-color 0.1s linear", // Transition for underline
            },
            "&:hover": {
              color: "rgb(254, 84, 41)", // Change text color on hover
            },
            "&:hover::before": {
              transform: "translateX(0%)",
              backgroundColor: "rgb(254, 84, 41)", // Change underline color on hover
            },
          }}
        >
          {location.pathname.includes("%20.") ? tab1 : itemOne}
        </Typography>
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;
