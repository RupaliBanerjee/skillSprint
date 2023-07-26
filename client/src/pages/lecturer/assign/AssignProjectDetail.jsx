import React, { useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "theme";
import AssignProjectTabs from "./AssignProjectTabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import AssignSubTask from "./AssignSubTask";
import {
  updateActiveTaskData,
  addStudentTaskMap,
} from "store/lecturerTaskInfo/lecturerTaskInfoSlice";
import { useNavigate } from "react-router-dom";

const AssignProjectDetail = (props) => {
  const { projectDetail, assignClicked, setAssignClicked } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  /* For the subtask assign grid */
  const [enableNext, setEnableNext] = useState(false);
  const [showSubTask, setShowSubTask] = useState(false);
  const [rowData, setSelectedRowData] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);

  const active_assignment = useSelector(
    (state) => state.lecturer_Task_Info.active_assignment_list
  );
  const active_project = useSelector(
    (state) => state.lecturer_Task_Info.active_project_list
  );
  const dispatch = useDispatch();

  const studentTaskMapList = useSelector(
    (state) => state.lecturer_Task_Info.student_taskMap
  );

  /* To add student info data for the active projects and assignments in Lecturer_Task_Info */
  const updateStudentInfo = (taskMapData) => {
    const active_assignment_withStudentDetail = active_assignment.map(
      (task) => {
        const studentInfo_List = [];
        const studentInfo = taskMapData.filter((t) => t.task_id === task.key);
        //studentInfo_List.push(studentInfo[0]);
        return {
          ...task,
          ["studentInfo"]: studentInfo,
        };
      }
    );
    const active_project_withStudentDetail = active_project.map((task) => {
      const studentInfo_List = [];
      const studentInfo = taskMapData.filter((t) => t.task_id === task.key);
      //studentInfo_List.push(studentInfo[0]);
      return {
        ...task,
        ["studentInfo"]: studentInfo,
      };
    });
    dispatch(
      updateActiveTaskData({
        active_assignment_list: active_assignment_withStudentDetail,
        active_project_list: active_project_withStudentDetail,
      })
    );
  };

  const getOverAllScore = (user_id, taskMapData) => {
    const getAllData = taskMapData.filter((t) => t.user_id === user_id);
    let score = 0;
    getAllData.forEach((student) => {
      score += student.totalScore;
    });
    return score;
  };

  const getTaskId_list = (user_id, taskMapData) => {
    const StudentTaskList = taskMapData.filter(
      (user) => user.user_id === user_id
    );
    let allTaskIds = [];
    StudentTaskList.forEach((student) => {
      allTaskIds.push(student.task_id);
    });
    return allTaskIds;
  };

  const getTaskDataList = (user_id, taskDetailList, taskMapData) => {
    const taskIds = getTaskId_list(user_id, taskMapData);
    const getTaskData = taskDetailList.filter(
      (t) => taskIds.indexOf(t.key) !== -1
    );
    return getTaskData;
  };

  const getTaskDetails = async (TaskIdList) => {
    try {
      const response = await axios.post("/lecturer/getAllTaskDetail", {
        taskId: TaskIdList,
      });
      return response.data.taskDetailList;
    } catch (err) {}
  };

  /* Get active task count */
  const getActiveTaskCount = (user_id, taskDetailList, taskMapData) => {
    const taskIds = getTaskId_list(user_id, taskMapData);
    const taskList = taskDetailList.filter(
      (task) => taskIds.indexOf(task.key) !== -1
    );
    const taskCount = taskList.filter((task) => task.active).length;
    return taskCount;
  };

  /* To create a new store for complete Student Info map in redux */
  const addStudentInfoMap = async (taskMapData) => {
    const TaskIdList = taskMapData.map((task) => task.task_id);
    /* Get Task Details from DB for the tasks mentioned in taskMap */
    const taskDetailList = await getTaskDetails(TaskIdList);

    const studentIdList = taskMapData.map((task) => task.user_id);
    let studentId = new Map();
    /* Check user_id Duplication for taskMap */
    studentIdList.forEach((id) => {
      if (studentId.has(id)) {
        studentId.set(id, studentId.get(id) + 1);
      } else {
        studentId.set(id, 1);
      }
    });
    /* Get the student total score data for project assign grid */
    const newStudentTaskMap = taskMapData.map((task) => {
      const taskDetail = taskDetailList.filter(
        (t) => t.key === task.task_id
      )[0];
      // if (studentId.get(task.user_id) > 1) {
      //Duplicate exist
      const studentMap = {
        ...task,
        ["overAllScore"]: getOverAllScore(task.user_id, taskMapData),
        ["task_id_list"]: getTaskId_list(task.user_id, taskMapData),
        ["task_data_list"]: getTaskDataList(
          task.user_id,
          taskDetailList,
          taskMapData
        ),
        ["active_task_count"]: getActiveTaskCount(
          task.user_id,
          taskDetailList,
          taskMapData
        ),
      };
      return studentMap;
    });
    dispatch(addStudentTaskMap({ student_taskMap: [...newStudentTaskMap] }));
    //console.log("Check New Task Map", newStudentTaskMap);
  };

  const getTaskMap = async () => {
    try {
      const response = await axios.get("/lecturer/getAllTaskMap");
      const taskMapData = response.data;

      updateStudentInfo(taskMapData);
      addStudentInfoMap(taskMapData);
    } catch (err) {
      console.log("Check Get all Map error", err);
    }
  };

  useEffect(() => {
    getTaskMap();
  }, []);
  const tabInfo = [
    {
      tabName: "Project Description",
      tabData: projectDetail,
      type: "Lecturer Task",
    },
    {
      tabName: "Assign Task",
      tabData: studentTaskMapList,
      type: "Lecturer Task",
    },
  ];
  /* On Student Selection show next page for assigning subtask */
  const studentSelection = (selectedRowData) => {
    setSelectedRowData(selectedRowData);
    setEnableNext(selectedRowData.length > 0);
  };

  const updateTaskMap = async (taskMapList) => {
    try {
      const getTaskIidList=taskMapList.map((task)=>(task.task_id))
      const response = await axios.post("/lecturer/setTaskMap", taskMapList);
      const taskDetailUpdate=await axios.post("/lecturer/updateTaskDetail",getTaskIidList)
      navigate("/lecturer/dashboard");
    } catch (err) {
      console.log("updateTaskMap client error", err);
    }
  };

  /* On Project Assignment to students save the new records in taskMap collection */
  useEffect(() => {
    if (studentInfo.length > 0) {
      updateTaskMap(studentInfo);
    }
  }, [studentInfo]);

  return (
    <>
      {assignClicked && !showSubTask && (
        <Box
          display={"flex"}
          justifyContent="space-between"
          backgroundColor={colors.primary[500]}
        >
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              marginBottom: "1rem",
            }}
            onClick={() => {
              setAssignClicked(false);
              // setShowBackButton(false);
              // setTaskData(undefined);
            }}
          >
            Back
          </Button>
          {!showSubTask && (
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                marginBottom: "1rem",
              }}
              disabled={!enableNext}
              onClick={() => {
                setShowSubTask(true);
                // setAssignClicked(false);
                // setShowBackButton(false);
                // setTaskData(undefined);
              }}
            >
              Next
            </Button>
          )}
        </Box>
      )}

      <Box flex="1 1 100%" height="70vh" backgroundColor={colors.primary[400]}>
        {!showSubTask ? (
          <AssignProjectTabs
            tabInfo={tabInfo}
            enableNext={enableNext}
            studentSelection={studentSelection}
            numberOfSubTasks={projectDetail.subTaskInfo.length}
          />
        ) : (
          <AssignSubTask
            studentTaskMapList={studentTaskMapList}
            rowData={rowData}
            projectDetail={projectDetail}
            studentInfo={studentInfo}
            setStudentInfo={setStudentInfo}
            setAssignClicked={setAssignClicked}
          />
        )}
      </Box>
    </>
  );
};

export default AssignProjectDetail;
