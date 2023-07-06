import React, { useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BasicTabs from "../../components/BasicTabs";
import { assignmentData, projectData } from "../../data/mockData";
import { useSelector } from "react-redux";
import { TASK_TYPES } from "constants";

const ViewTask = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { active_Task, submitted_Task } = useSelector(
    (state) => state.userTaskDetail
  );
  const active_projects = [];
  const active_assignment = [];

  /* Create seperate array for Project and Assignment */
  active_Task.forEach((task) => {
    if (task.task_detail.task_type === TASK_TYPES.PROJECT) {
      active_projects.push(task);
    } else {
      active_assignment.push(task);
    }
  });

  

  const tabInfo = [
    {
      tabName: "Assignments",
      tabData: active_assignment,
      type: "Student Task",
    },
    {
      tabName: "Projects",
      tabData: active_projects,
      type: "Student Task",
    },
    {
      tabName: "History",
      tabData: submitted_Task,
      type: "Student Task",
    },
  ];
  //const tabNames = ["Assignments", "Projects", "History"];
  return (
    <Box m="10px 20px">
      {/* HEADER */}
      <Box
        display="flex"
        mb={"10px"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title="View All Task" subtitle="Welcome to your Task List" />
      </Box>
      <Box flex="1 1 100%" height="75vh" backgroundColor={colors.primary[400]}>
        <BasicTabs tabInfo={tabInfo} />
      </Box>
    </Box>
  );
};

export default ViewTask;
