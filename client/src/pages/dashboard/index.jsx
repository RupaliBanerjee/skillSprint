import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import NotificationWidget from "../../components/NotificationWidget";
import AssignmentDetail from "../assignmentDetail";
import ScoreCard from "../../components/ScoreCard";
import StatBox from "../../components/StatBox";
import { assignmentData } from "../../data/mockData";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {id}=useParams()

  const getTaskIds=async()=>{
    try{
     const response= axios.get(`/taskMap/${id}`);
     console.log("Check response",response)
    }catch(err){
      console.log("Task Map Error",err)
    }
  }

  useEffect(()=>{
    getTaskIds()
  },[])

  return (
    <Box m="10px 20px" p="10px 20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="120px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box gridColumn="span 6" backgroundColor={colors.primary[400]}>
          <NotificationWidget />
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          {/* All Latest published projects */}

          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Latest Assignments
              </Typography>
            </Box>
            {assignmentData.map((assignment, i) => (
              <Box
                key={`${assignment.id}-${i}`}
                display="grid"
                gridTemplateColumns={"2fr 1fr 0.5fr"}
                flex={1}
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {assignment.title}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{assignment.startDate}</Box>
                <Box
                  
                  borderRadius="4px"
                >
                  <Button
                    sx={{
                      backgroundColor: colors.blueAccent[700],
                      color: colors.grey[100],
                    }}
                    endIcon={<SendIcon />}
                  >
                    Details
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Row 2 */}
        <Box gridColumn="span 6" backgroundColor={colors.primary[400]}>
          <AssignmentDetail />
        </Box>
        {/* Row 3 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2 "
          backgroundColor={colors.primary[400]}
          width={"100%"}
        >
          <ScoreCard></ScoreCard>
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
