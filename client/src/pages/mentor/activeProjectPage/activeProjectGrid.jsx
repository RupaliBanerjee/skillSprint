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
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const ActiveProjectGrid = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { task_key } = useParams();
  const navigate = useNavigate();

  const activeList = useSelector((state) => {
    return state.mentorTaskInfo.active_list.filter(
      (task) => task.key === task_key
    );
  });
  let diff_days,
    tableData = [];

  tableData = activeList[0].studentTaskMap.map((task) => {
    const current_date = new Date();
    let end_date = new Date(activeList[0].end_date);
    let timeDiff = end_date.getTime() - current_date.getTime();
    diff_days = parseInt(timeDiff / (1000 * 3600 * 24));
    return { ...task, end_date: diff_days };
  });

  //   const updateActiveTaskData = (diff_days) => {

  //     console.log("Check Table Data", tableData);
  //   };

  //   useEffect(() => {
  //     if (activeList[0].studentTaskMap.length>0) {
  //       const current_date = new Date();
  //       let end_date = new Date(activeList[0].end_date);
  //       let timeDiff = end_date.getTime() - current_date.getTime();
  //       diff_days = parseInt(timeDiff / (1000 * 3600 * 24));
  //       //console.log("Check Diff days",diff_days)
  //       updateActiveTaskData(diff_days);
  //     }
  //   },[activeList]);
  const downloadRepoCode = (rowData) => {
    window.open(`${rowData.solution_zip}`);
  };
  
  const columns = [
    { field: "task_id", headerName: "Task ID", flex: 0.5 },
    {
      field: "user_id",
      headerName: "Student ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: `subtask_id`,
      headerName: "Subtask ID",
      flex: 0.5,
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
          title="View All Task"
          subtitle="All Student evaluation information"
        />
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
            rows={tableData}
            columns={columns}
            getRowId={(row) => row.user_id}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ActiveProjectGrid;
