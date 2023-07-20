import React, { useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import BasicTabs from "../../../components/BasicTabs";
import { assignmentData, projectData } from "../../../data/mockData";
import { useDispatch, useSelector } from "react-redux";
import { TASK_TYPES } from "constants";
import TaskDetail from "pages/student/taskDetail";
import { useNavigate, useParams } from "react-router-dom";
import { addTask } from "store/userTaskMap/userTaskMapSlice";
import axios from "axios";

const ViewInactiveTask = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const userId=useSelector((state)=>state?.userInfo?.userData.user_id);
  const dispatch=useDispatch();

  const { task_key } = useParams();
  const taskData = useSelector((state) => {
    return state.userTaskDetail.unAssigned_Task.filter(
      (t) => t.key === task_key
    );
  });


  const updateTaskDetail=async(task_id)=>{
    try{
      const response=await axios.post("/updateTaskDetail/status",{task_id:task_id});
      if(response.status===200){
        navigate(-1)
      }
    }catch(err){
      console.log("TaskDetail update",err)
    }
  }


   /* After enroll update taskDetails and TaskMap DB and redux store */
  const updateTaskMap=async(taskData)=>{
    try{
      const response=await axios.post("/updateTaskMap",taskData);
      if(response.status===200){
        dispatch(addTask(taskData));
        updateTaskDetail(taskData.task_id)
      }
    }catch(err){
      console.log("Update task map Error",err)
    }
    
  }

 
  const enrollTask=()=>{
    const scoreList=taskData[0].assesment_criteria.map((criteria)=>({name:criteria,weightage:0}))
    
    const taskMapEntry={
      user_id:userId,
      task_id:taskData[0].key,
      score:scoreList,
      solution_zip:'',
      totalScore:0
    }
    console.log("Check taskMapEntry for score criteria",taskMapEntry)
   //updateTaskMap(taskMapEntry)
  }
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
          subtitle="Start your next Task"
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        {/* <Typography variant="h3">Enroll Now!</Typography> */}
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          }}
          onClick={enrollTask}
        >
          Enroll
        </Button>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          }}
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </Box>
      <Box height="75vh" backgroundColor={colors.primary[400]}>
        <TaskDetail taskData={taskData[0]} activeTask={false} />
      </Box>
    </Box>
  );
};

export default ViewInactiveTask;
