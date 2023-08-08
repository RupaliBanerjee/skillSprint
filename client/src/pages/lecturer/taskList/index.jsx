import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "theme";
import Header from "common/Header";
import TaskDetail from "pages/student/taskDetail";
import TaskList from "pages/mentor/taskList/taskList";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const LecturerTaskListMainPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { taskType } = useParams();
  const navigate = useNavigate();

  const [showTaskList, setShowTaskList] = useState(true);
  const [taskDetailData, setTaskdetailData] = useState();

  const {active_assignment_list,active_project_list}=useSelector((state)=>state.lecturer_Task_Info);

  const [taskList,setTaskList]=useState([])

//   const [assignmentList,setAssignmentList]=useState([]);
//   const [projectList,setProjectList]=useState([]);

  useEffect(()=>{
    if (taskType === "active_assignments") {
        setTaskList(active_assignment_list)
    }
    if (taskType === "active_projects") {
        setTaskList(active_project_list);
    }
  },[])

   /* get project data for view More Button click */
//    const getTaskDetailData = () => {
//     console.log("Check taskType",taskType)
    
//   };

  const getTitle = () => {
    if (taskType === "active_assignments") {
      return "All Active Assignments";
    } else if (taskType === "active_projects") {
      return "All Active Projects";
    } else {
      return "All pending projects";
    }
  };
  const getSubTitle = () => {
    if (taskType === "active_assignments") {
      return "View the list of in-progress assignments";
    } else if (taskType === "active_projects") {
      return "View the list of in-progress projects";
    } else {
      return "View the list of tasks";
    }
  };

  const viewTaskDetail = (taskData) => {
    setShowTaskList(false);
    setTaskdetailData(taskData);
    // console.log("Check Project Data", projectData);
  };
  //console.log("Check Data retrieved for taskDetail Page",getTaskDetailData());

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
          <TaskList taskData={taskList} viewTaskDetail={viewTaskDetail} />
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

export default LecturerTaskListMainPage;
