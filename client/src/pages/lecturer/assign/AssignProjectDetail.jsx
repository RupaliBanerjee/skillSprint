import React from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "theme";
import AssignProjectTabs from "./AssignProjectTabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { updateActiveTaskData } from "store/lecturerTaskInfo/lecturerTaskInfoSlice";

const AssignProjectDetail = (props) => {
  const { projectDetail } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const active_assignment=useSelector(state=>state.lecturer_Task_Info.active_assignment_list);
  const active_project=useSelector(state=>state.lecturer_Task_Info.active_project_list);
  const dispatch=useDispatch();


  const updateStudentInfo=(taskMapData)=>{
    const active_assignment_withStudentDetail = active_assignment.map((task)=>{
      const studentInfo_List=[];
      const studentInfo=taskMapData.filter(t=>t.task_id===task.key);
      //studentInfo_List.push(studentInfo[0]);
      return {
        ...task,
        ["studentInfo"]:studentInfo
      }
      
    })
    const active_project_withStudentDetail=active_project.map((task)=>{
      const studentInfo_List=[];
      const studentInfo=taskMapData.filter(t=>t.task_id===task.key);
      //studentInfo_List.push(studentInfo[0]);
      return {
        ...task,
        ["studentInfo"]:studentInfo
      }
      
    })
    dispatch(updateActiveTaskData({
      active_assignment_list:active_assignment_withStudentDetail,
      active_project_list:active_project_withStudentDetail
    }))
  }

  const getTaskMap=async()=>{
    try{
     const response=await  axios.get("/getAllTaskMap");
     const taskMapData=response.data;
     updateStudentInfo(taskMapData)
    }catch(err){
      console.log("Check Get all Map error",err)
    }
  }

  useEffect(()=>{
    getTaskMap();
  },[])
  const tabInfo = [
    {
      tabName: "Project Description",
      tabData: projectDetail,
      type: "Lecturer Task",
    },
    {
      tabName: "Assign Task",
      tabData: projectDetail,
      type: "Lecturer Task",
    },
  ];
  return (
    <Box flex="1 1 100%" height="70vh" backgroundColor={colors.primary[400]}>
      <AssignProjectTabs tabInfo={tabInfo} />
    </Box>
  );
};

export default AssignProjectDetail;
