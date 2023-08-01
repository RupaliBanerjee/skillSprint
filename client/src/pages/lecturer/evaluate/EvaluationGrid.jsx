import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  Dialog,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useSelector } from "react-redux";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import NoRecordsPage from "common/NoRecordsPage";

const EvaluationGrid = (props) => {
  const { data, tabName, viewTaskDetail } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const taskData = [];
  const [rowDataOnclick, setRowDataOnClick] = useState();

  //const data=useSelector(state=>state.lecturer_Task_Info)
  /* Destructure the data object for TAskDetails */
  data.map((task) => {
    const taskObj = Object.assign({}, task, task.studentTaskMap);
    taskData.push({ ...taskObj });
  });
  const columns = [
    { field: "key", headerName: "KEY", flex: 0.5 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: `user_id`,
      headerName: "Student Id",
      flex: 1,
    },
    {
      field: "end_date",
      headerName: "Completion Date",
      flex: 1,
    },
    {
      field: "score",
      headerName: "Add Score",
      flex: 1,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        // Show Task Detail on click of view button
        const onViewClick = (e) => {
          viewTaskDetail(params?.row);
        };

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
              startIcon={<AssessmentOutlinedIcon />}
              onClick={onViewClick}
            >
              Evaluate
            </Button>
            {/* <AssessmentOutlinedIcon />
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Score Card
            </Typography> */}
          </Box>
        );
      },
    },
  ];

  return (
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
      {taskData.length > 0 ? (
        <DataGrid
          rows={taskData}
          columns={columns}
          getRowId={(row) => row._id}
        />
      ) : (
        <NoRecordsPage />
      )}

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
  );
};

export default EvaluationGrid;
