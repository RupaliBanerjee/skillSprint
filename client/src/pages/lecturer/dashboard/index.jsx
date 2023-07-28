import React, { useEffect } from "react";
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
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import TaskCountWidget from "components/TaskCountWidget";
import BarChart from "components/BarChart";
import PieChart from "components/PieChart";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskList,
  updateAssesmentData,
} from "store/lecturerTaskInfo/lecturerTaskInfoSlice";

const Lecturer_Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const userID = useSelector((state) => state.userInfo.logged_in_userId);
  const dispatch = useDispatch();
  const activeAssignmentList = useSelector(
    (state) => state.lecturer_Task_Info.active_assignment_list
  );
  const activeProjectList = useSelector(
    (state) => state.lecturer_Task_Info.active_project_list
  );
  const { assignment, project } = useSelector(
    (state) => state.lecturer_Task_Info.pending_assesment_list
  );
  const unAssignedProjectList = useSelector(
    (state) => state.lecturer_Task_Info.unAssigned_project_list
  );

  /* Get taskIDs for all pending tasks */
  const taskId_List = assignment.map((t) => t.key);
  taskId_List.push(...project.map((t) => t.key));

  const viewMoreAction = () => {
    console.log("Clicked");
  };

  let active_assignment_list = [];
  let active_project_list = [];
  let pending_assesment_list = {};
  let unAssigned_project_list = [];

  const dateInPast = (first_date) => {
    return new Date(first_date) < new Date(new Date());
  };

  const getPendingList = (assignmentList, projectList) => {
    const today = new Date();
    //console.log("Check the assignment ans project list for pending Assesment",assignmentList)
    const pending_assignment = [
      ...assignmentList.filter(
        (task) => dateInPast(task.end_date) || task.comments.student !== ""
      ),
    ];
    const pending_project = [
      ...projectList.filter(
        (task) => dateInPast(task.end_date) || task.comments.student !== ""
      ),
    ];

    return {
      assignment: pending_assignment,
      project: pending_project,
    };
  };

  /* add student detail to the pending assesment list */
  const create_student_detail_list = (studentDetailList) => {
    const updateted_assignment_list = [];
    const updateted_project_list = [];
    /* To add the details of Student Map to the assignment and project array in store */
    assignment.forEach((task) => {
      const studentData = {
        ...studentDetailList.filter(
          (t) => t.task_id === task.key && t.totalScore === 0
        )[0],
      };
      const updated_assignment_data = {
        ...task,
        studentTaskMap: studentData,
      };
      /* Only if the student Map has a total score as 0 then add in pending taskList */
      if (Object.keys(updated_assignment_data.studentTaskMap).length) {
        updateted_assignment_list.push(updated_assignment_data);
      }
    });
    project.forEach((task) => {
      const studentData = {
        ...studentDetailList.filter(
          (t) => t.task_id === task.key && t.totalScore === 0
        )[0],
      };
      const updated_project_data = {
        ...task,
        studentTaskMap: studentData,
      };
      if (Object.keys(updated_project_data.studentTaskMap).length) {
        updateted_project_list.push(updated_project_data);
      }
    });
    dispatch(
      updateAssesmentData({
        assignment: updateted_assignment_list,
        project: updateted_project_list,
      })
    );
    // console.log("Check New project List",updateted_assignment_list)
  };

  /* Update pending assesment list based on total score */
  const updatePendingAssesmentList = () => {
    axios
      .post("/lecturer/getStudentTaskMap", { taskId_List: taskId_List })
      .then((response) => {
        create_student_detail_list(response.data.taskMapData);
      });
  };

  // [...assignmentList.filter(t=>!t.active)]
  const getAllTask = (taskList) => {
    const { assignmentList, projectList } = taskList;
    active_assignment_list = [...assignmentList.filter((t) => t.active)];
    pending_assesment_list = getPendingList(
      [...assignmentList.filter((t) => !t.active)],
      [...projectList.filter((t) => !t.active)]
    );
    active_project_list = [...projectList.filter((task) => task.active)];
    unAssigned_project_list = [
      ...projectList.filter((task) => {
        if (!task.active && !dateInPast(task.end_date)) {
          return { ...task };
        }
      }),
    ];

    dispatch(
      addTaskList({
        active_assignment_list: active_assignment_list,
        active_project_list: active_project_list,
        pending_assesment_list: pending_assesment_list,
        unAssigned_project_list: unAssigned_project_list,
      })
    );
    updatePendingAssesmentList();
  };

  const createTaskList = () => {
    axios.get(`/lecturer/taskInfo/${userID}`).then((response) => {
      let tasklist = response.data;
      getAllTask(tasklist);
    });
  };

  useEffect(() => {
    createTaskList();
  }, []);

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
            title="Active Assignment"
            count={
              activeAssignmentList.length ? activeAssignmentList.length : 0
            }
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
            title="Active Projects"
            count={activeProjectList.length ? activeProjectList.length : 0}
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
            title="Pending Evaluation"
            count={assignment.length + project.length}
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
        {/* Row 3 for Pie Chart */}
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box p={"10px 0 0 10px"}>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Task Popularity
            </Typography>
          </Box>
          <PieChart />
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

export default Lecturer_Dashboard;
