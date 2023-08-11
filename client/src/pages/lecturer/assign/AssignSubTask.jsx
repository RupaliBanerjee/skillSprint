import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { tokens } from "theme";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import { EventNote } from "@mui/icons-material";
import { useMemo } from "react";

const CustomSelect = (props) => {
  const {
    rowData,
    currentRow,
    setStudentInfo,
    studentInfo,
    taskMapList,
    setTaskMapList,
  } = props;
  const [student_id, setStudent_id] = useState("");

  /* Check if entry for this student already exist in the studentInfo List */
  const studentInfoExist = (student_id) => {
    const data = studentInfo.filter((data) => data.user_id === student_id);
    return data.length > 0;
  };

  const updateTaskMapAction = (taskMapList, selected_student_id) => {
    const updatedTaskMap = taskMapList.map((subtask) => {
      // return {
      //   ...subtask,

      //   ["user_detail"]: [...subtask.user_detail, {
      //     ["user_id"]:selected_student_id,
      //     ["score"]:[],
      //     ["totalScore"]:0,
      //     ["solution_zip"]:""
      //   }],
      // };
      if (subtask.subtask_id === currentRow.task_id) {
        return {
          ...subtask,
          ["user_id"]: selected_student_id,
        };
      } else {
        return {
          ...subtask,
        };
      }
    });

    return updatedTaskMap;
  };

  const handleChange = (event) => {
    setStudent_id(event.target.value);

    setTaskMapList(updateTaskMapAction(taskMapList, event.target.value));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      {/* <InputLabel id="demo-select-small-label">Age</InputLabel> */}
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={student_id}
        onChange={handleChange}
      >
        {rowData.length > 0 &&
          rowData.map((data) => {
            return (
              <MenuItem key={data.user_id} value={data.user_id}>
                {data.user_id}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

const AssignSubTask = (props) => {
  const {
    studentTaskMapList,
    rowData,
    projectDetail,
    studentInfo,
    setStudentInfo,
    setAssignClicked,
  } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [taskMapList, setTaskMapList] = useState();

  useEffect(() => {
    const newTaskMapList = projectDetail.subTaskInfo.map((subtask) => {
      return {
        user_id: "",
        task_id: projectDetail.key,
        subtask_id: subtask.task_id,
      };
    });
    setTaskMapList(newTaskMapList);
  }, [rowData]);

  const subTaskData = projectDetail.subTaskInfo.map((task) => {
    return { ...task, ["project_key"]: projectDetail.key };
  });

  /* Add New entry to the task map collection in db */
  const addNewTaskMapData = () => {
    console.log("Check if all data available on task map", taskMapList);
    const key = "user_id";
    /* Create array of subtask IDs for each student_id */
    const studentSubTaskMap = new Map();
    taskMapList.forEach((subtask) => {
      if (studentSubTaskMap.has(subtask.user_id)) {
        studentSubTaskMap.set(subtask.user_id, [
          ...studentSubTaskMap.get(subtask.user_id),
          subtask.subtask_id,
        ]);
      } else {
        studentSubTaskMap.set(subtask.user_id, [subtask.subtask_id]);
      }
    });

    const finalTaskMapList = taskMapList.map((subtask) => {
      return {
        ["user_id"]: subtask.user_id,
        ["score"]: [],
        ["totalScore"]: 0,
        ["solution_zip"]: "",
        ["task_id"]: subtask.task_id,
        ["subtask_id"]: studentSubTaskMap.get(subtask.user_id),
      };
    });

    /* Used for removing all duplicate enteries in the list */
    const uniqueTaskMapList = [
      ...new Map(finalTaskMapList.map((item) => [item[key], item])).values(),
    ];

    /* Send data to AssignProjectDetail.jsx file to update the db */
    setStudentInfo(uniqueTaskMapList);
  };

  /* Check if all the subtasks have been assigned to student  */
  const isSubTasksAssigned = () => {
    const assignedSubtaskList = taskMapList?.filter(
      (subtask) => subtask.user_id != ""
    );
    const isAssigned = assignedSubtaskList?.length === rowData?.length;
    return isAssigned;
  };

  const columns = [
    { field: "project_key", headerName: "Project key", flex: 0.5 },
    {
      field: "task_label",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: `task_id`,
      headerName: "SubTask Id",
      flex: 0.5,
    },
    {
      field: `task_detail`,
      headerName: "Description",
      flex: 2,
    },
    {
      field: "user_id",
      headerName: "Assign Task",
      flex: 1,
      headerAlign: "center",
      align: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const rowChange = params.row;
        return (
          <CustomSelect
            rowData={rowData}
            currentRow={params.row}
            studentInfo={studentInfo}
            setStudentInfo={setStudentInfo}
            taskMapList={taskMapList}
            setTaskMapList={setTaskMapList}
          />
        );
      },
    },
  ];

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        sx={{background:"#070707"}}
      >
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            marginBottom: "1rem",
          }}
          onClick={() => {
            setAssignClicked(false);
            // addNewTaskMapData(studentInfo);
          }}
        >
          Back
        </Button>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            marginBottom: "1rem",
          }}
          disabled={!isSubTasksAssigned()}
          onClick={() => {
            addNewTaskMapData();
          }}
        >
          Save
        </Button>
      </Box>
      <Box
        height="60vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.grey[800],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.grey[800],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={subTaskData}
          columns={columns}
          getRowId={(row) => row._id}
        />
        {/* {showScoreDetail && (
        <DialogWithTitle
          oncloseDialog={oncloseDialog}
          openDialog={showScoreDetail}
          title="Score Details"
          showActionButton={false}
        >
          <ScoreCard scoreDetail={scoreDetail} showLabel={false}></ScoreCard>
        </DialogWithTitle>
      )} */}
      </Box>
    </>
  );
};

export default AssignSubTask;
