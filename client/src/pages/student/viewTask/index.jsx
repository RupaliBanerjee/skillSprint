import React, { useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import BasicTabs from "../../../components/BasicTabs";
import { assignmentData, projectData } from "../../../data/mockData";
import { useDispatch, useSelector } from "react-redux";
import { TASK_TYPES } from "constants";
import axios from "axios";
import { updateTask } from "store/userTaskDetail/userTaskDetailSlice";

const ViewTask = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { active_Task, submitted_Task,unAssigned_Task } = useSelector(
    (state) => state.userTaskDetail
  );
  const active_projects = [];
  const active_assignment = [];
  const dispatch = useDispatch();

  /* Create seperate array for Project and Assignment */
  active_Task.forEach((task) => {
    if (task.task_detail.task_type === TASK_TYPES.PROJECT) {
      active_projects.push(task);
    } else {
      active_assignment.push(task);
    }
  });

  /* Update TaskMap in DB */
  const updateTaskMapSolution = (task_id, solution) => {
    try {
      axios.post("/updateTaskMap/solution", {
        task_id: task_id,
        solution_zip: solution,
      });
    } catch (err) {
      console.log("Check taskMapUpdate Error", err);
    }
  };

  /* Update TaskDetail in DB */
  const updateTaskDetailComments = (task_id, comments) => {
    try {
      axios.post("/updateTaskDetail/comments", {
        task_id: task_id,
        student_comments: comments,
      });
    } catch (err) {
      console.log("Check taskDetailUpdate Error", err);
    }
  };

  /* Update Redux store after DB changes for solution submission */
  const updateReduxStoreTaskMap = (taskData) => {
    const newActiveTaskList = active_Task.filter(
      (task) => task.task_id !== taskData.task_id
    );
    const newSubmittedTaskList = [...submitted_Task];
    newSubmittedTaskList.push(taskData);
    
    dispatch(
      updateTask({
        active_Task: newActiveTaskList,
        submitted_Task: newSubmittedTaskList,
        unAssigned_Task:unAssigned_Task
      })
    );
  };

  /* Update Student Submission Data for active task */
  const updateTaskDataStudent = async (taskData) => {
    
    updateTaskMapSolution(taskData.task_id, taskData.solution_zip);
    updateTaskDetailComments(
      taskData.task_id,
      taskData.task_detail.comments.student
    );
    updateReduxStoreTaskMap(taskData);
  };
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
      tabName: "Submitted Task",
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
        <BasicTabs
          tabInfo={tabInfo}
          updateTaskDataStudent={updateTaskDataStudent}
        />
      </Box>
    </Box>
  );
};

export default ViewTask;
