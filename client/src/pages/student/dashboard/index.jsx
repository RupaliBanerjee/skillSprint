import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import NotificationWidget from "../../../components/NotificationWidget";
import AssignmentDetail from "../assignmentDetail";
import ScoreCard from "../../../components/ScoreCard";
import StatBox from "../../../components/StatBox";
import { assignmentData } from "../../../data/mockData";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTaskMap } from "store/userTaskMap/userTaskMapSlice";
import { updateTask } from "store/userTaskDetail/userTaskDetailSlice";
import { TASK_TYPES } from "constants";
import { useState } from "react";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const all_assigned_task_ids = [];
  const navigate = useNavigate();

  /* Send the deadline and task info for task that needs to be completed before next 100 days */
  const [difference_In_Days, setDifference_In_Days] = useState(100);
  const [current_task, setCurrent_task] = useState();
  const [recent_score_data, set_recent_score_data] = useState();

  const dispatch = useDispatch();
  /* Data from userTaskMap redux data store*/
  const active_task = useSelector((state) => state.userTaskMap.active_task);
  const submitted_task = useSelector(
    (state) => state.userTaskMap.submitted_task
  );
  const taskMapLoading = useSelector((state) => state.userTaskMap.loading);
  /* Data from userTaskDetail redux store */
  const active_task_detail = useSelector(
    (state) => state.userTaskDetail.active_Task
  );
  const submitted_task_detail = useSelector(
    (state) => state.userTaskDetail.submitted_Task
  );
  const unassigned_task = useSelector(
    (state) => state.userTaskDetail.unAssigned_Task
  );
  const { id } = useParams();

  const find_recent_submission_score = () => {
    submitted_task_detail.map((task) => {
      let min_diff = 100;
      let diff_days;
      let end_date = new Date(task.task_detail.end_date);
      let timeDiff = end_date.getTime() - new Date().getTime();
      diff_days = timeDiff / (1000 * 3600 * 24);

      if (diff_days < min_diff) {
        min_diff = diff_days;
        set_recent_score_data(task.score);
      }
    });
  };

  /* Display recent deadline and current Active assignment */
  const findCurrentAssignment_deadline = () => {
    let difference_In_Time;
    let latestDate;

    /* Get current Date string  in YYYY/MM/DD format */
    const current_date = new Date();
    // var current_dateString =
    //   current_date.getUTCFullYear() +
    //   "/" +
    //   ("0" + (current_date.getUTCMonth() + 1)).slice(-2) +
    //   "/" +
    //   ("0" + current_date.getUTCDate()).slice(-2);

    active_task_detail.map((task) => {
      if (task.task_detail.task_type === TASK_TYPES.ASSIGNMENT) {
        let diff_days;
        let end_date = new Date(task.task_detail.end_date);
        let timeDiff = end_date.getTime() - current_date.getTime();
        diff_days = timeDiff / (1000 * 3600 * 24);

        if (diff_days < difference_In_Days) {
          setDifference_In_Days(diff_days);
          latestDate = end_date;
          setCurrent_task({ ...task });
        }
      }
    });
  };

  /* Get all the Latest assignments that have not been enrolled by the student */
  const getAllLatestTasks = async (taskData) => {
    const all_assigned_task_ids = [];
    all_assigned_task_ids.push(...active_task.map((task) => task.task_id));
    all_assigned_task_ids.push(...submitted_task.map((task) => task.task_id));

    try {
      const response = await axios.post("/latestTask", {
        all_assigned_task_ids: all_assigned_task_ids,
      });
      const assignmentType = response.data.filter(
        (task) => task.task_type === TASK_TYPES.ASSIGNMENT
      );

      dispatch(
        updateTask({
          active_Task: taskData.activeTaskWithDetail,
          submitted_Task: taskData.submittedTaskWithDetail,
          unAssigned_Task: [...assignmentType],
        })
      );
    } catch (err) {
      console.log("get Latest Task client error", err);
    }
  };

  const getTaskDetails = () => {
    axios
      .post("/taskDetails", {
        activeTask: active_task,
        submittedTask: submitted_task,
      })
      .then((response) => {
        const taskData = response.data;
        dispatch(
          updateTask({
            active_Task: taskData.activeTaskWithDetail,
            submitted_Task: taskData.submittedTaskWithDetail,
            unAssigned_Task: [],
          })
        );
        getAllLatestTasks(taskData);
      })
      .catch((err) => {
        console.log("Task detail Error Client", err);
      });
  };

  useEffect(() => {
    getTaskDetails();
  }, [active_task]);

  useEffect(() => {
    findCurrentAssignment_deadline();
    find_recent_submission_score();
  }, [active_task_detail, submitted_task_detail]);

  return (
    <>
      {taskMapLoading && (
        <div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "#46454580",
            }}
            open={taskMapLoading && active_task_detail.length === 0}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      )}

      <Box m="10px 20px" p="10px 20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="120px"
          gap="20px"
        >
          {/* ROW 1 */}
          <Box gridColumn="span 6" backgroundColor={colors.primary[400]}>
            {active_task_detail.length && (
              <NotificationWidget
                taskdata={current_task}
                dateInfo={difference_In_Days}
              />
            )}
          </Box>
          <Box
            gridColumn="span 6"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            {/* All Latest published projects */}

            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography
                  color={colors.grey[100]}
                  variant="h4"
                  fontWeight="600"
                >
                  Latest Assignments
                </Typography>
              </Box>
              <Box maxHeight={"70vh"} overflow={"auto"}>
                {unassigned_task.map((task, i) => (
                  <Box
                    key={`${task._id}-${i}`}
                    display="grid"
                    gridTemplateColumns={"2fr 1fr 0.5fr"}
                    flex={1}
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
                        {task.title}
                      </Typography>
                    </Box>
                    <Box color={colors.grey[100]}>{task.start_date}</Box>
                    <Box borderRadius="4px">
                      <Button
                        sx={{
                          backgroundColor: colors.blueAccent[700],
                          color: colors.grey[100],
                        }}
                        endIcon={<SendIcon />}
                        onClick={() => {
                          navigate(`/latestTask/${task.key}`);
                        }}
                      >
                        Details
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Row 2 */}
          <Box
            gridColumn="span 6"
            gridRow="span 1.5"
            backgroundColor={colors.primary[400]}
          >
            {active_task_detail.length && (
              <AssignmentDetail taskInfo={current_task} />
            )}
          </Box>
          {/* Row 3 */}
          <Box
            gridColumn="span 6"
            gridRow="span 2 "
            backgroundColor={colors.primary[400]}
            width={"100%"}
          >
            <ScoreCard
              scoreDetail={recent_score_data}
              showLablel={true}
            ></ScoreCard>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Dashboard;
