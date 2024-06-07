import {
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import { Link, useLocation, useParams } from "react-router-dom";
// import TableData from "./TableData";
// import { DataChange, dbStorageMock } from "../../dataFolder";
import { CheckBox } from "@mui/icons-material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CodeIcon from "@mui/icons-material/Code";
import UploadFile from "../uploadFile/UploadFile";

const MenuItems = ({ params, location, Data }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Destructring
  const { folder, subFolder, range, tab, subTab } = params;
  return (
    <Box
      sx={{
        position: "sticky",
        zIndex: 0,
        top: "0px",
        // display: "flex",
        flexBasis: location.pathname.includes("%20.") ? null : "20%",
        borderRight: subFolder != "files" ? "1px solid #D1D1D1" : 0,
        pt: 3,
      }}
    >
      <Box sx={{}}>
        <Tabs
          value={value}
          onChange={handleChange}
          orientation="vertical"
          variant="scrollable"
          sx={{
            "& .MuiTabs-indicator": { display: "none" },
            color: "black",
          }}
          // scrollButtons={false}
          // aria-label="scrollable prevent tabs example"
        >
          {subFolder !== "files"
            ? Data[folder][subFolder][tab].map((e3, i) => (
                <Link
                  key={i}
                  to={`/${folder}/${subFolder}/${range}/${tab}/${
                    e3 ? e3 : null
                  }`}
                  style={{ textDecoration: "none", color: "inherit" }} // Apply styles to remove default link styling
                >
                  <Tab
                    label={e3}
                    sx={{
                      width: "90%",
                      ml: 1,
                      borderRadius: "5px",
                      "&.MuiButtonBase-root.MuiTab-root": {
                        "-webkit-align-items": "flex-start",
                        // alignItems: "left",
                        // "::webkit-align-items": "left",
                      },
                      fontWeight: location.pathname.includes(e3) && "700",
                      color: location.pathname.includes(e3)
                        ? "rgb(0, 0, 0)"
                        : "grey",
                      ":hover": {
                        bgcolor: "rgba(154, 173, 186, 0.2)",
                        color: "black",
                      },
                      backgroundColor: location.pathname.includes(e3)
                        ? "rgb(235, 235, 235)"
                        : null,
                    }}
                  />
                </Link>
              ))
            : null}
        </Tabs>
      </Box>
    </Box>
  );
};

export default MenuItems;
