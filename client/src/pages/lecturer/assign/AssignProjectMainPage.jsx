import React from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "theme";
import { useSelector } from "react-redux";
import Header from "components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import AssignProjectGrid from "./AssignProjectGrid";
import { useState } from "react";
import AssignProjectDetail from "./AssignProjectDetail";

const AssignProjectMainPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [assignClicked, setAssignClicked] = useState(false);
  const [projectDetail,setProjectDetail]=useState();

  const projectList = useSelector(
    (state) => state.lecturer_Task_Info.unAssigned_project_list
  );

  /* Share project detail with AssignProjectDetail Component */
  const viewProjectDetail=(taskData)=>{
    setProjectDetail(taskData);
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
        <Header title="View All Projects" subtitle="Assign new Projects" />
      </Box>
      <Box
        flex="1 1 100%"
        maxHeight={"79vh"}
        backgroundColor={colors.primary[400]}
      >
        {!assignClicked && (
          <AssignProjectGrid
            data={projectList}
            assignClicked={assignClicked}
            setAssignClicked={setAssignClicked}
            viewProjectDetail={viewProjectDetail}
          />
        )}
        {assignClicked && (
          <>
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
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
            </Box>
            <AssignProjectDetail projectDetail={projectDetail} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default AssignProjectMainPage;
