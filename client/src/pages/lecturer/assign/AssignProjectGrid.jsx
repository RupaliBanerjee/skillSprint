import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "theme";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";

const AssignProjectGrid = (props) => {
  const { data, assignClicked, setAssignClicked, viewProjectDetail } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "key", headerName: "KEY", flex: 0.5 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: `publisher_id`,
      headerName: "Mentor Id",
      flex: 1,
    },
    {
      field: "end_date",
      headerName: "Completion Date",
      flex: 1,
    },
    {
      field: "assigner_id",
      headerName: "Assign task",
      flex: 1,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        // Show Task Detail on click of view button
        const onViewClick = (e) => {
          setAssignClicked(!assignClicked);
        viewProjectDetail(params?.row);
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
              endIcon={<InputOutlinedIcon />}
              onClick={onViewClick}
            >
              Assign
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
      mt="40px"
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
      <DataGrid rows={data} columns={columns} getRowId={(row) => row._id} />
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

export default AssignProjectGrid;
