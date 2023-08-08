import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  Dialog,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "theme";
import Header from "common/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TASK_TYPES } from "constants";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const StudentDetailGrid = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { task_key, task_type } = useParams();
  const navigate = useNavigate();

  let diff_days;
  const [tableData, setTableData] = useState([]);

  const taskList = useSelector((state) => {
    if (task_type === TASK_TYPES.ASSIGNMENT) {
      return state.lecturer_Task_Info.active_assignment_list;
    } else {
      return state.lecturer_Task_Info.active_project_list;
    }
  });

  let data = taskList?.filter((task) => task.key === task_key);
  data = data[0]?.studentTaskMap.map((task) => {
    const current_date = new Date();
    let end_date = new Date(data[0].end_date);
    let timeDiff = end_date.getTime() - current_date.getTime();
    diff_days = parseInt(timeDiff / (1000 * 3600 * 24));
    return {
      ...task,
      end_date: diff_days,
    };
  });

  const downloadRepoCode = (rowData) => {
    window.open(`${rowData.solution_zip}`);
  };

  let columns = [
    { field: "task_id", headerName: "Task ID", flex: 0.5 },
    {
      field: "user_id",
      headerName: "Student ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "end_date",
      headerName: "Days Remaining",
      flex: 1,
    },
    {
      field: "solution_zip",
      headerName: "Code Repository",
      flex: 1,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        // Show Score Detail on click of view button
        const onViewSubmission = (e) => {
          downloadRepoCode(params.row);
          //setScoreDetail(params?.row?.score);
        };
        console.log("Check Row params", params);
        return (
          <Box
            width="60%"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px"
          >
            {/* Button to view Score details */}
            <Button
              size="small"
              sx={{ color: colors.grey[100] }}
              startIcon={<FileDownloadOutlinedIcon />}
              onClick={onViewSubmission}
              disabled={params.row.solution_zip === ""}
            >
              Code Repo
            </Button>
          </Box>
        );
      },
    },
  ];

  if (tableData?.subtask_id?.length > 0) {
    columns.push({
      field: `subtask_id`,
      headerName: "Subtask ID",
      flex: 0.5,
    });
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
        <Header title="View All Task" subtitle="All in-progress tasks" />
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
      <Box flex="1 1 100%" height="75vh" backgroundColor={colors.primary[400]}>
        <Box
          m="10px 0 0 0"
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
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
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
            rows={data}
            columns={columns}
            getRowId={(row) => row.user_id}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StudentDetailGrid;
