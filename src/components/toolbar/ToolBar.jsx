import { Box, Stack, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CodeIcon from "@mui/icons-material/Code";

const ToolBar = ({ Data, isSelected, params, DataChange }) => {
  const [value, setValue] = useState(0);

  //Icons for top toolbar
  const iconItems = {
    PLANNING: <AssignmentIcon sx={{ fontSize: 18 }} />,
    DESIGNING: <DesignServicesIcon sx={{ fontSize: 18 }} />,
    DEVELOPING: <CodeIcon sx={{ fontSize: 18 }} />,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Destructring
  const { folder, subFolder, range } = params;
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Stack direction="row">
        {subFolder !== "files"
          ? Object.keys(Data[folder][subFolder]).map((e2, i) => (
              <Tabs
                key={i}
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{ style: { display: "none" } }}
              >
                <Link
                  to={
                    Object.values(Data[folder][subFolder][e2])[0]
                      ? `/${folder}/${subFolder}/${range}/${e2}/${
                          Object.values(Data[folder][subFolder][e2])[0]
                        }`
                      : `/${folder}/${subFolder}/${range}/${e2}/%20.`
                  }
                  style={{ textDecoration: "none" }}
                >
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {iconItems[e2.toUpperCase()] && (
                          <Box sx={{ mr: 1 }}>
                            {iconItems[e2.toUpperCase()]}
                          </Box>
                        )}
                        {e2}
                      </Box>
                    }
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      textDecoration: isSelected(e2) ? "underline" : "none",
                      textUnderlineOffset: "18px",
                      fontWeight: isSelected(e2) ? "700" : "normal",
                      color: isSelected(e2) ? "rgb(254, 84, 41)" : "black",
                      transition: "color 0.1s linear",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        width: "100%",
                        height: "2px",
                        bottom: 0,
                        left: 0,
                        backgroundColor: "currentColor",
                        transform: isSelected(e2)
                          ? "translateX(0%)"
                          : "translateX(-100%)",
                        transition:
                          "transform 0.1s linear, background-color 0.1s linear",
                      },
                      "&:hover": !isSelected(e2) && {
                        color: "rgb(254, 84, 41)",
                      },
                      // "&:hover::before": !isSelected(e2) && {
                      //   transform: "translateX(0%)",
                      //   backgroundColor: "rgb(254, 84, 41)",
                      // },
                    }}
                  />
                </Link>
              </Tabs>
            ))
          : Object.keys(DataChange[folder]).map((e, i) => (
              <Tabs
                key={i}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                TabIndicatorProps={{ style: { display: "none" } }}
                aria-label="scrollable auto tabs example"
              >
                <Link
                  to={`/${folder}/${subFolder}/${range}/${e}/%20.`}
                  style={{ textDecoration: "none" }}
                >
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {iconItems[e.toUpperCase()] && (
                          <Box sx={{ mr: 1 }}>{iconItems[e.toUpperCase()]}</Box>
                        )}
                        {e}
                      </Box>
                    }
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      textDecoration: isSelected(e) ? "underline" : "none",
                      textUnderlineOffset: "18px",
                      fontWeight: isSelected(e) ? "700" : "normal",
                      color: isSelected(e) ? "rgb(255, 108, 71)" : "black",
                      transition: "color 0.1s linear",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        width: "100%",
                        height: "2px",
                        bottom: 0,
                        left: 0,
                        backgroundColor: "currentColor",
                        transform: isSelected(e)
                          ? "translateX(0%)"
                          : "translateX(-100%)",
                        transition:
                          "transform 0.1s linear, background-color 0.1s linear",
                      },
                      "&:hover": !isSelected(e) && {
                        color: "rgb(254, 84, 41)",
                      },
                      // "&:hover::before": !isSelected(e) && {
                      //   transform: "translateX(0%)",
                      //   backgroundColor: "rgb(254, 84, 41)",
                      // },
                    }}
                  />
                </Link>
              </Tabs>
            ))}
      </Stack>
    </Stack>
  );
};

export default ToolBar;
