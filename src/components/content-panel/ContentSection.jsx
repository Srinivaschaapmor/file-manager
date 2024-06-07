import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Container,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { Link, useLocation, useParams } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ComponentData from "../Data/Data";
import { Scrollbar } from "react-scrollbars-custom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentPanel from "./ContentPanel";
import ShareDrawer from "../shareDrawer/ShareDrawer";

function ContentSection({ Data }) {
  const departments = [
    { name: "HR", members: ["Emp 1", "Emp 2", "Emp 3"] },
    { name: "Testing", members: ["Emp 1", "Emp 2", "Emp 3"] },
    { name: "Full Stack", members: ["Emp 1", "Emp 2", "Emp 3"] },
  ];
  const employees = {
    "Full stack": [
      { id: 1001, name: "Srinivas" },
      { id: 1002, name: "John Doe" },
    ],
    Testing: [
      { id: 2001, name: "Jane Doe" },
      { id: 2002, name: "Richard Roe" },
    ],
    HR: [
      { id: 3001, name: "Alice Smith" },
      { id: 3002, name: "Bob Brown" },
    ],
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  const { item1, level1, tab1, year, itemOne } = useParams();
  const pathname = location.pathname;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [selected, setSelected] = useState(false);
  const [dbStorage, setDbStorage] = useState({});
  const [selectedFileDetails, setSelectedFileDetails] = useState(null);
  const [department, setDepartment] = useState("");
  const [add, setAdd] = useState(false);
  const [checkedEmployees, setCheckedEmployees] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelected(true);
  };
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setAdd(true);
  };

  // uploading the file UPLOAD BUTTON
  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);

    let updatedValue = uploadedFiles.map((file) => ({
      file: file,
      shared: [],
    }));

    if (dbStorage[pathname]) {
      setDbStorage({
        ...dbStorage,
        [pathname]: [...dbStorage[pathname], ...updatedValue],
      });
    } else {
      setDbStorage({
        ...dbStorage,
        [pathname]: updatedValue,
      });
    }
  };
  // Download the file
  const handleDownload = (file) => {
    const downloadUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("File Downloaded Successfully");
  };

  //Delete the file
  const handleDelete = (index, key) => {
    let tempArray = dbStorage[key];
    tempArray.splice(index, 1);
    setDbStorage({ ...dbStorage, [key]: tempArray });
    toast.success("File Deleted Successfully");
  };
  // Opening the side drawer
  const handleShare = (fileDetails) => {
    setDrawerOpen(true);
    setSelectedFileDetails(fileDetails);
  };

  const [tempDbStorage, setTempDbStorage] = useState(dbStorage);

  //Handleing checkboxes other than select all
  const handleCheckboxChange = (
    employeeId,
    employeeName,
    employeeDepartment,
    fileName,
    isChecked
  ) => {
    const sharedDate = new Date();

    const updateSharedEmployees = (sharedEmployees) => {
      if (!isChecked && sharedEmployees.length > 0) {
        return sharedEmployees.filter((e) => e.employeeId !== employeeId);
      }
      return [
        ...sharedEmployees,
        { employeeId, employeeName, employeeDepartment, sharedDate },
      ];
    };

    const updatedTempDbStorage = tempDbStorage[pathname].map((item) => {
      if (item.file.name === fileName) {
        return { ...item, shared: updateSharedEmployees(item.shared) };
      }
      return item;
    });

    setCheckedEmployees((prev) => {
      const newCheckedEmployees = prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId];

      // Check if "Select All" should be unchecked
      const isAllChecked =
        newCheckedEmployees.length === employees[department].length;
      setSelectAllChecked(isAllChecked);

      return newCheckedEmployees;
    });

    setTempDbStorage((prev) => {
      return { [pathname]: updatedTempDbStorage };
    });
  };
  // Select all checkboxes
  const handleSelectAll = (event, fileName) => {
    const isChecked = event.target.checked;
    let selectedEmployeeIds = [...checkedEmployees];
    const currentEmployees =
      employees[department]?.map((employee) => ({
        id: employee.id,
        name: employee.name,
      })) || [];

    let updatedTempDbStorage = [...tempDbStorage[pathname]];

    if (isChecked) {
      currentEmployees.forEach((employee) => {
        if (!selectedEmployeeIds.includes(employee.id)) {
          selectedEmployeeIds.push(employee.id);
          const sharedDate = new Date();
          updatedTempDbStorage = updatedTempDbStorage.map((item) => {
            if (item.file.name === fileName) {
              return {
                ...item,
                shared: [
                  ...item.shared,
                  {
                    employeeId: employee.id,
                    employeeName: employee.name,
                    employeeDepartment: department,
                    sharedDate,
                  },
                ],
              };
            }
            return item;
          });
        }
      });
    } else {
      currentEmployees.forEach((employee) => {
        const index = selectedEmployeeIds.indexOf(employee.id);
        if (index > -1) {
          selectedEmployeeIds.splice(index, 1);
          updatedTempDbStorage = updatedTempDbStorage.map((item) => {
            if (item.file.name === fileName) {
              return {
                ...item,
                shared: item.shared.filter(
                  (sharedEmployee) => sharedEmployee.employeeId !== employee.id
                ),
              };
            }
            return item;
          });
        }
      });
    }

    setCheckedEmployees(selectedEmployeeIds);

    setTempDbStorage({ [pathname]: updatedTempDbStorage });
    setSelectAllChecked(isChecked);
  };

  // Share button in side drawer
  const handleShareClick = () => {
    setDbStorage(tempDbStorage);
    setCheckedEmployees([]);
    setAdd(false);
    setDrawerOpen(false);
    setDepartment("");
    toast.success("File Shared Successfully");
  };

  useEffect(() => {
    setTempDbStorage(dbStorage);
  }, [dbStorage]);

  useEffect(() => {
    setSelectAllChecked(false);
  }, [department]);
  // Cancel button inside side drawer
  const handleCancel = () => {
    setAdd(false);
    setDepartment("");
  };

  return (
    <Box sx={{ backgroundColor: "rgb(238, 242, 246)", width: "85%" }}>
      <ContentPanel
        Data={Data}
        dbStorage={dbStorage}
        setDbStorage={setDbStorage}
        handleDelete={handleDelete}
        handleDownload={handleDownload}
        handleShare={handleShare}
        handleFileChange={handleFileChange}
      />

      {/* side Drawer */}
      {/* <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Box
          width={500}
          height={"100vh"}
          p={5}
          sx={{ overflow: "hidden", bgcolor: "rgb(244, 243, 245)" }}
        >
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <ArrowBackOutlinedIcon />
            </IconButton>
            <Typography variant="h6">
              Share "{selectedFileDetails?.file.name}"
            </Typography>
          </Stack>
          <Box sx={{ height: 50, mt: 3, bgcolor: "white", borderRadius: 3 }}>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              spacing={2}
            >
              <FormControl sx={{ width: 200 }}>
                <InputLabel
                  id="department-select-label"
                  sx={{ fontSize: 14, mb: 2 }}
                >
                  Select Department
                </InputLabel>
                <Select
                  labelId="department-select-label"
                  id="department-select"
                  value={department}
                  label="Select Department"
                  onChange={handleDepartmentChange}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  }}
                >
                  <MenuItem value="Full stack">Full stack</MenuItem>
                  <MenuItem value="Testing">Testing</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                </Select>
              </FormControl>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ bgcolor: "grey", height: "50px" }}
              />
              <Box>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={department.length === 0}
                        checked={selectAllChecked}
                        onChange={(e) =>
                          handleSelectAll(e, selectedFileDetails?.file.name)
                        }
                      />
                    }
                    label="Select All"
                  />
                </FormGroup>
              </Box>
            </Stack>
          </Box>
          {add ? (
            <Box mt={2}>
              <TableContainer sx={{ maxHeight: 380 }}>
                <Table sx={{ bgcolor: "white", borderRadius: 3, mt: 3 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Employee Id
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees[department].map((employee) => (
                      <TableRow
                        key={employee.id}
                        sx={{
                          "& .MuiTableCell-root": {
                            padding: 1,
                            pl: 2,
                          },
                        }}
                      >
                        <TableCell>{employee.id}</TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    handleCheckboxChange(
                                      employee.id,
                                      employee.name,
                                      department,
                                      selectedFileDetails.file.name,
                                      e.target.checked
                                    );
                                  }}
                                  checked={checkedEmployees.includes(
                                    employee.id
                                  )}
                                />
                              }
                            />
                          </FormGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack direction={"row"} justifyContent={"space-between"} mt={2}>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                  onClick={handleShareClick}
                  variant="contained"
                  sx={{ bgcolor: "rgb(103, 88, 204)" }}
                >
                  Share
                </Button>
              </Stack>
            </Box>
          ) : (
            <Scrollbar>
              <Typography
                variant="h6"
                fontWeight={700}
                textAlign={"center"}
                mt={3}
              >
                Shared File Access
              </Typography>
              <TableContainer sx={{ maxHeight: 380 }}>
                <Table
                  sx={{
                    bgcolor: "white",
                    borderRadius: 3,
                    mt: 3,
                    mb: 2,
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Shared Date
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedFileDetails?.shared.length > 0 ? (
                      selectedFileDetails?.shared.map((share, index) => (
                        <TableRow key={index}>
                          <TableCell>{share.employeeName}</TableCell>
                          <TableCell>{share.employeeDepartment}</TableCell>
                          <TableCell>
                            {new Date(share.sharedDate).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                          File Not Shared
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          )}
        </Box>
      </Drawer> */}
      <ShareDrawer
        drawerOpen={drawerOpen}
        handleDrawerClose={handleDrawerClose}
      ></ShareDrawer>
      <ToastContainer />
    </Box>
  );
}

export default ContentSection;
