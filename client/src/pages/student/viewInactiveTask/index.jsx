import React, { useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import BasicTabs from "../../../components/BasicTabs";
import { assignmentData, projectData } from "../../../data/mockData";
import { useSelector } from "react-redux";
import { TASK_TYPES } from "constants";
import TaskDetail from "pages/student/taskDetail";
import { useNavigate, useParams } from "react-router-dom";

const ViewInactiveTask = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate =useNavigate();

  const { task_key } = useParams();
  const taskData=useSelector((state)=>{
    return (state.userTaskDetail.unAssigned_Task.filter(t=>t.key===task_key));
  });
  

  return (
    <Box m="10px 20px">
      {/* HEADER */}
      <Box
        display="flex"
        mb={"10px"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header
          title="Recently Published Task"
          subtitle="Choose your next Task"
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h3">Enroll Now!</Typography>
        <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                }}
                onClick={() => {
                  navigate(-1)
                }}
              >
                Back
              </Button>
      </Box>
      <Box  height="75vh" backgroundColor={colors.primary[400]}>
        <TaskDetail taskData={taskData[0]} activeTask={false}/>
      </Box>
    </Box>
  );
};

export default ViewInactiveTask;
