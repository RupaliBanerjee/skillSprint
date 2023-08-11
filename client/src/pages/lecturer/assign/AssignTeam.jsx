import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "theme";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";

const AssignTeam = (props) => {
  const { taskData, studentSelection, numberOfSubTasks, enableNext } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rowDataList, setRowDataList] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  let selectedIDs = [];
  const key = "user_id";
  /* Get all unique user_ids */
  const data = [...new Map(taskData.map((item) => [item[key], item])).values()];

  //console.log("Check the task Data",data);

  useEffect(()=>{
    setRowDataList([]);
  },[])

  const columns = [
    { field: "user_id", headerName: "Student ID", flex: 0.5 },
    {
      field: "overAllScore",
      headerName: "Total Score",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    { field: "active_task_count", headerName: "Active Task", flex: 0.5 },
    {
      field: `task_id_list`,
      headerName: "Task ID List",
      flex: 2,
    },
  ];

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      width={"100%"}
      backgroundColor={colors.primary[400]}
    >
      {rowDataList.length>0 && (
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              marginBottom: "0.5rem",
            }}
            onClick={() => {
              setRowSelectionModel([]);
              studentSelection([]);
              // setShowBackButton(false);
              // setTaskData(undefined);
            }}
          >
            Clear
          </Button>
        </Box>
      )}

      <Box
        maxHeight="55vh"
        width={"100%"}
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
          checkboxSelection
          rows={data}
          columns={columns}
          getRowId={(row) => row._id}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
            selectedIDs = new Set(newRowSelectionModel);
            const selectedRowData = data.filter((row) =>
              selectedIDs.has(row._id.toString())
            );
            studentSelection(selectedRowData);
            setRowDataList([...selectedRowData]);
          }}
          rowSelectionModel={rowSelectionModel}
        />
      </Box>
    </Box>
  );
};

export default AssignTeam;
