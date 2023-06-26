import React from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BasicTabs from "../../components/BasicTabs";
import { assignmentData,projectData } from "../../data/mockData";

const ViewTask = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tabInfo = [
    {
      tabName: "Assignments",
      tabData: assignmentData,
      type: "Student Task",
    },
    {
      tabName: "Projects",
      tabData: projectData,
      type: "Student Task",
    },
    {
      tabName: "History",
      tabData: assignmentData,
      type: "Student Task",
    },
  ];
  //const tabNames = ["Assignments", "Projects", "History"];
  return (
    <Box m="10px 20px">
      {/* HEADER */}
      <Box display="flex"  mb={"10px"} justifyContent="space-between" alignItems="center">
        <Header title="View All Task" subtitle="Welcome to your Task List" />
      </Box>
      <Box flex="1 1 100%" height="75vh" backgroundColor={colors.primary[400]}>
        <BasicTabs tabInfo={tabInfo} />
      </Box>
    </Box>
  );
};

export default ViewTask;
