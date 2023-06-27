import { Box, IconButton, Typography, Button, Dialog } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { student_data } from "../../data/mockData";

import { useTheme } from "@mui/material";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import React, { useState } from "react";
import ScoreCard from "../../components/ScoreCard";

import DialogWithTitle from "../../common/DialogWithTitle";
const ShowHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showScoreDetail, setShowScoreDetail] = useState(false);

  const [scoreDetail, setScoreDetail] = useState({});

  const rowDataOnClick = (rowData) => {
    console.log("Check Value here", rowData);
    const key = rowData.key;
    setScoreDetail({ rowData });
    //setScoreDetail({...scoreDetail, "data": "abc" });
    setShowScoreDetail(true);
    console.log("Show The new obj", scoreDetail);
  };

  const oncloseDialog = () => {
    setShowScoreDetail(false);
  };

  const columns = [
    { field: "key", headerName: "KEY", flex: 0.5 },
    { field: "type", headerName: "TYPE", flex: 1 },
    {
      field: "title",
      headerName: "Title",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "scoreTotal",
      headerName: "Total Score",
      type: "number",
      headerAlign: "left",
      align: "left",
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
      <DataGrid
        rows={student_data[0].task_list}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
      {showScoreDetail && (
        <DialogWithTitle 
          oncloseDialog={oncloseDialog}
          openDialog={showScoreDetail}
          title="Score Details"
          showActionButton={false}
        >
          <ScoreCard scoreDetail={scoreDetail}></ScoreCard>
        </DialogWithTitle>
      )}
    </Box>
  );
};

export default ShowHistory;
