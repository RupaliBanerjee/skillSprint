import React, { useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "theme";
import Header from "common/Header";
import TaskList from "./taskList";
import TaskDetail from "pages/student/taskDetail";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const TaskListMainPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { project_type } = useParams();
  const navigate = useNavigate();

  const [showTaskList, setShowTaskList] = useState(true);
  const [taskDetailData, setTaskdetailData] = useState();
  // const [showTaskListPage, setShowTaskListPage] = useState(false);

  const { active_list, submitted_list, pending_list } = useSelector(
    (state) => state.mentorTaskInfo
  );

  /* get project data for view More Button click */
  const getTaskDetailData = () => {
    if (project_type === "ACTIVE") {
      return active_list;
    } else if (project_type === "SUBMITTED") {
      return submitted_list;
    } else if (project_type === "pending_allocation") {
      return pending_list;
    } else {
      return [];
    }
  };

  const getTitle = () => {
    if (project_type === "ACTIVE") {
      return "All Active Projects";
    } else if (project_type === "SUBMITTED") {
      return "All Submitted Projects";
    } else {
      return "All pending projects";
    }
  };
  const getSubTitle = () => {
    if (project_type === "ACTIVE") {
      return "View the list of Projects in progress";
    } else if (project_type === "SUBMITTED") {
      return "View the list of previously submitted projects";
    } else {
      return "View the list of projects pending allocation";
    }
  };

  const viewTaskDetail = (projectData) => {
    setShowTaskList(false);
    setTaskdetailData(projectData);
    // console.log("Check Project Data", projectData);
  };
  return (
    <Box m="10px 20px">
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box
          display="flex"
          mb={"10px"}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* HEADER */}
          <Header title={getTitle()} subtitle={getSubTitle()} />
        </Box>
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              marginTop: "2rem",
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </Box>
      </Box>
      {showTaskList ? (
        <Box
          flex="1 1 100%"
          height="75vh"
          p={"2rem 0"}
          backgroundColor={colors.primary[400]}
        >
          <TaskList taskData={getTaskDetailData()} viewTaskDetail={viewTaskDetail} />
        </Box>
      ) : (
        <Box
          flex="1 1 100%"
          height="75vh"
          backgroundColor={colors.primary[400]}
        >
          <TaskDetail  activeTask={false}
            taskData={taskDetailData}/>
        </Box>
      )}
    </Box>
  );
};

export default TaskListMainPage;
