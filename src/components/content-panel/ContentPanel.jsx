import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useLocation, useParams } from "react-router-dom";

import ToolBar from "../toolbar/ToolBar";
import MenuItems from "../menuItems/MenuItems";
import FilesTable from "../filesTable/FilesTable";
import { ToastContainer, toast } from "react-toastify";
import ShareDrawer from "../shareDrawer/ShareDrawer";
import DashboardService from "./ContentPanelService";

const DataChange = {
  Sample1: {
    "Level-10": [],
    "Level-2": [],
    "Level-3": [],
  },
  Sample2: {
    "Level-1": [],
    "Level-2": [],
    "Level-3": [],
  },
};

const Data = {
  Development: {
    "Front-End": {
      Planning: ["Davose", "Aapmor-360", "Nexus-360"],
      Designing: ["Project-1", "Project-2", "Project-3"],
      Developing: ["Project-1", "Project-2", "Project-3"],
    },
    "Back-end": {
      Planning: ["Project-1", "Project-2", "Project-3"],
      Designing: ["Project-1", "Project-2", "Project-3"],
      Developing: ["Project-1", "Project-2", "Project-3"],
    },
  },
  Testing: {
    Manual: {
      "Lv3-1": ["Lv4-1", "Lv4-2", "Lv4-3"],
      "Lv3-2": ["Lv4-1", "Lv4-2", "Lv4-3"],
      "Lv3-3": ["Lv4-1", "Lv4-2", "Lv4-3"],
    },
    Automation: {
      "Lv3-x": ["Lv4-1", "Lv4-2", "Lv4-3"],
      "Lv3-y": ["Lv4-1", "Lv4-2", "Lv4-3"],
      "Lv3-z": ["Lv4-1", "Lv4-2", "Lv4-3"],
    },
  },
  HumanResource: {
    Hiring: {
      "Lv3-1": ["Lv4-1", "Lv4-2", "Lv4-3"],
      "Lv3-2": ["Lv4-1", "Lv4-2", "Lv4-3"],
      "Lv3-3": ["Lv4-1", "Lv4-2", "Lv4-3"],
    },
    Salary: {
      "Lv3-x": ["Lv4-1", "Lv4-2", "Lv4-3"],
      "Lv3-y": ["Lv4-1", "Lv4-2", "Lv4-3"],
      "Lv3-z": ["Lv4-1", "Lv4-2", "Lv4-3"],
    },
  },
  Sample: {
    select: {
      "Level-1": [],
      "Level-2": [],
      "Level-3": [],
    },
  },
};

// const departments = [
//   { name: "HR", members: ["Emp 1", "Emp 2", "Emp 3"] },
//   { name: "Testing", members: ["Emp 1", "Emp 2", "Emp 3"] },
//   { name: "Full Stack", members: ["Emp 1", "Emp 2", "Emp 3"] },
// ];

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

const ContentPanel = () => {
  const location = useLocation();
  const isSelected = (path) => location.pathname.includes(path);

  // const { item1, level1, tab1, year, itemOne } = useParams();
  const pathname = location.pathname;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dbStorage, setDbStorage] = useState({});
  const [selectedFileDetails, setSelectedFileDetails] = useState(null);
  const [department, setDepartment] = useState("");
  const [add, setAdd] = useState(false);
  const [checkedEmployees, setCheckedEmployees] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleDrawerClose = () => setDrawerOpen(false);

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
    DashboardService.getUsers();
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
    <Box bgcolor={"white"} mx={5} borderRadius={3}>
      {/*Top Tool bar  */}
      <ToolBar
        Data={Data}
        isSelected={isSelected}
        params={useParams()}
        DataChange={DataChange}
        handleFileChange={handleFileChange}
      />
      {/* Bottom Box under the top toolbar */}
      <Box
        sx={{
          minHeight: "75vh",
          display: "flex",
          overflowY: "auto",
          borderTop: "1px solid rgb(203, 213, 225)",
        }}
      >
        {/* Menu items */}
        <MenuItems params={useParams()} location={location} Data={Data} />

        {/* Upload Files Table */}
        <FilesTable
          location={location}
          dbStorage={dbStorage}
          setDbStorage={setDbStorage}
          handleDelete={handleDelete}
          handleDownload={handleDownload}
          handleShare={handleShare}
          handleFileChange={handleFileChange}
        ></FilesTable>
      </Box>
      <ToastContainer />
      <ShareDrawer
        drawerOpen={drawerOpen}
        handleDrawerClose={handleDrawerClose}
        setDrawerOpen={setDrawerOpen}
        selectedFileDetails={selectedFileDetails}
        department={department}
        handleDepartmentChange={handleDepartmentChange}
        selectAllChecked={selectAllChecked}
        handleSelectAll={handleSelectAll}
        add={add}
        employees={employees}
        handleCheckboxChange={handleCheckboxChange}
        handleCancel={handleCancel}
        handleShareClick={handleShareClick}
        checkedEmployees={checkedEmployees}
      />
    </Box>
  );
};

export default ContentPanel;
