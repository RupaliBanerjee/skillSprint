import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Header from "components/Header";
import { tokens } from "theme";
import BarChart from "components/BarChart";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import TaskCountWidget from "components/TaskCountWidget";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  updateActiveTaskData,
  updatePendingTaskData,
  updateSubmittedTaskData,
} from "store/mentorTaskInfo/mentorTaskInfoSlice";
import { useNavigate } from "react-router-dom";

const MentorDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [studentCount, setStudentCount] = useState(0);
  const [studentTaskMap,setStudentTaskMap]=useState([]);
  // const [pendingAllocation,setPendingAllocation]=useState([]);
  // const [pendingCount,setPendingCount]=useState(0);

  const userID = useSelector((state) => state.userInfo.logged_in_userId);
  const activeList = useSelector((state) => state.mentorTaskInfo.active_list);
  const submittedList = useSelector(
    (state) => state.mentorTaskInfo.submitted_list
  );
  const pendingList=useSelector((state)=>state.mentorTaskInfo.pending_list)

  /* update store with student Info */
  const updateStudentInfoStore = (studentInfoList) => {
    const activeStudentList = [];
    const submittedStudentList = [];
    const pendingTaskList=[];
    /* get student count */
    const uniqueStudentIds = [
      ...new Set(studentInfoList.map((student) => student.user_id)),
    ];
    setStudentCount(uniqueStudentIds.length);
    /* Create seperate student Info list for active and submitted Task */
    studentInfoList.forEach((studentData) => {
      if (studentData.totalScore == 0 && studentData.solution_zip=="") {
        activeStudentList.push({...studentData});
      } else {
        submittedStudentList.push({...studentData});
      }
    });

    /* add student Info for the activeList */
    const active_list_with_student_data = activeList.map((task) => {
      const studentData = activeStudentList.filter(
        (data) => data.task_id === task.key
      );
      // if(studentData.length===0){
      //   pendingTaskList.push({...task})
      // }
     
        return { ...task, studentTaskMap: [ ...studentData ]};
      
      // return { ...task };
    
    });
   
    /* filter out submitted array 
    -the submitted list will only include projects 
    for which student task map entry exists */

    let submittedTaskList = submittedList.filter((task) => {
      const taskMapData = studentInfoList.filter(
        (taskMap) => taskMap.task_id === task.key
      );
      if(taskMapData.length===0){
        pendingTaskList.push({...task})
      }
      if (taskMapData.length > 0) {
        return { ...task };
      }
    });

    /* add student Info for the submitted Task */
    const submitted_list_with_student_data = submittedTaskList.map((task) => {
      const studentData = submittedStudentList.filter(
        (data) => data.task_id === task.key && data.solution_zip !== "" && data.totalScore!==0
      );
     
      return { ...task, studentTaskMap: [...studentData]  };
    });

    /* add student info to pendingTask list */
    const pending_list_with_student_data = pendingList.map((task) => {
      const studentData = submittedStudentList.filter(
        (data) => data.task_id === task.key
      );
      
      return { ...task, studentTaskMap: { ...studentData[0] } };
    });
    /* Filter out the active task that dont have studentTaskMap */
    const final_activeTaskList=active_list_with_student_data.filter((task)=>task.studentTaskMap.length>0)
    
    const pendingTaskList_final=pending_list_with_student_data.filter((task)=> Object.keys(task.studentTaskMap).length==0)
    dispatch(updatePendingTaskData([...pendingTaskList_final]))
    dispatch(updateActiveTaskData([...final_activeTaskList]));
    dispatch(updateSubmittedTaskData([...submitted_list_with_student_data]));
    
  };

  /* Api call to get the student task maps for all active and submitted projects */
  const getStudentTaskMap = async (taskIdList) => {
    try {
      const response = await axios.post("/mentor/getStudentInfo", taskIdList);
      /* Store the student taskmap list in useState and then call update Student Info only when the active and submitted value change */
     // updateStudentInfoStore(response.data.taskMapList);
     setStudentTaskMap(response.data.taskMapList)
    } catch (err) {
      console.log("get Student taskMap error", err);
    }
  };

  /* update redux store with tasks published by mentor */
  const updateMentorTaskInfo_Store = (taskInfo) => {
    const { activeList, submittedList } = taskInfo;
    const allActiveTaskIds = activeList.map((task) => task.key);
    const allSubmittedTaskIds = submittedList.map((task) => task.key);
    dispatch(updatePendingTaskData([...submittedList]));
   dispatch(updateActiveTaskData([...activeList]));
    dispatch(updateSubmittedTaskData([...submittedList]));
    getStudentTaskMap([...allActiveTaskIds, ...allSubmittedTaskIds]);
  };

  /* Get all tasks published by mentor */
  const createMentorTaskList = () => {
    axios
      .get(`/mentor/taskInfo/${userID}`)
      .then((response) => {
        const taskInfo = response.data;
        updateMentorTaskInfo_Store(taskInfo);
      })
      .catch((err) => {
        console.log("Check the errors for mentor task Info", err);
      });
  };

  useEffect(() => {
    createMentorTaskList();
    
  }, [userID]);

  const viewMoreAction = () => {
    console.log("Clicked");
  };

  /* To add student Info to all tasks in store */
  useEffect(()=>{
    if(studentTaskMap.length>0){
      updateStudentInfoStore(studentTaskMap)
    }
  },[studentTaskMap])

  /* View Task Details */
  const viewDetails = (taskData) => {
    navigate(`/mentor/taskDetails/${taskData.key}`);
  };
  return (
    <Box m="10px 10px" p="0 10px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle=" " />
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="120px"
        gap="20px"
      >
        {/* ROW 1 */}

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <TaskCountWidget
            title="Active Projects"
            count={activeList.length}
            icon={
              <AddCardOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
            viewMoreAction={viewMoreAction}
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <TaskCountWidget
            title="Submitted Projects"
            count={submittedList.length}
            icon={
              <BackupTableOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
            viewMoreAction={viewMoreAction}
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <TaskCountWidget
            title="Pending Allocation"
            count={pendingList.length}
            icon={
              <AppRegistrationOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
            viewMoreAction={viewMoreAction}
          />
        </Box>

        {/* Row 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          pt={"20px"}
          //   maxHeight="70vh"
        >
          <Typography alignSelf={"flex-start"} ml={2} variant="h3">
            Average Score
          </Typography>
          <BarChart isDashboard={true} />
        </Box>
        {/* <Box gridColumn="span 4" backgroundColor={colors.primary[400]}>
          <Box colors={colors.grey[100]} p="10px">
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Project
            </Typography>
          </Box>
          <Box display="flex" m="0 10px">
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                Job Search Portal
              </Typography>
              <Typography color={colors.grey[100]}>Mentor Name</Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" mr={"10px"}>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "10px",
              }}
              onClick={viewMoreAction}
            >
              Assign
            </Button>
          </Box>
        </Box> */}
        {/* Row 2 for Recent Submissions */}
        <Box
          backgroundColor={colors.primary[400]}
          gridColumn="span 4"
          gridRow="span 3"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Submissions
            </Typography>
          </Box>
          <Box
            overflow="auto"
            maxHeight={"50vh"}
            backgroundColor={colors.primary[400]}
          >
            {submittedList.map((task, index) => (
              <Box
                key={`${task.key}-${index}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {task.key}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {task.assigner_id}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{task.end_date}</Box>
                <Button
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    p: "5px 10px",
                    borderRadius: "4px",
                  }}
                  onClick={() => viewDetails(task)}
                >
                  View
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 6"
          
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        ></Box>
        <Box
          gridColumn="span 6"
          
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        ></Box> */}
      </Box>
    </Box>
  );
};

export default MentorDashboard;
