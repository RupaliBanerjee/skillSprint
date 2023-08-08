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
import { tokens } from "theme";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "common/Header";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import DialogWithTitle from "common/DialogWithTitle";
import ScoreCard from "components/ScoreCard";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const SubmissionGrid = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { task_key } = useParams();
  const navigate = useNavigate();

  const [showScoreDetail, setShowScoreDetail] = useState(false);

  const [scoreDetail, setScoreDetail] = useState({});

  const submittedList = useSelector((state) => {
    return state.mentorTaskInfo.submitted_list.filter(
      (task) => task.key === task_key
    );
  });

  const rowDataOnClick = (rowData) => {
    const scoreList = rowData.score;
    setScoreDetail(scoreList);
    //setScoreDetail({...scoreDetail, "data": "abc" });
    setShowScoreDetail(true);
  };

  const downloadRepoCode=(rowData)=>{
    window.open(`${rowData.solution_zip}`);
  }

  const oncloseDialog = () => {
    setShowScoreDetail(false);
  };
  // console.log("Check Data",submittedList)
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
      field: "totalScore",
      headerName: "Total Score",
      flex: 1,
    },
    {
      field: "score",
      headerName: "Detail Score",
      flex: 1,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        // Show Score Detail on click of view button
        const onViewClick = (e) => {
          rowDataOnClick(params.row);
          //setScoreDetail(params?.row?.score);
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
              View
            </Button>
            
          </Box>
        );
      },
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
            rows={submittedList[0].studentTaskMap}
            columns={columns}
            getRowId={(row) => row.user_id}
          />
          {showScoreDetail && (
        <DialogWithTitle
          oncloseDialog={oncloseDialog}
          openDialog={showScoreDetail}
          title="Score Details"
          showActionButton={false}
        >
          <ScoreCard scoreDetail={scoreDetail} showLabel={false}></ScoreCard>
        </DialogWithTitle>
      )}
        </Box>
      </Box>
    </Box>
  );
};

export default SubmissionGrid;
