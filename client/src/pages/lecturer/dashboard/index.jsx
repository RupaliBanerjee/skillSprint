import React from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Header from "components/Header";
import { tokens } from "theme";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import TaskCountWidget from "components/TaskCountWidget";
import BarChart from "components/BarChart";
import PieChart from "components/PieChart";

const Lecturer_Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const viewMoreAction = () => {
    console.log("Clicked");
  };

  return (
    <Box m="10px 10px" p="0 10px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle=" " />
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="120px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <TaskCountWidget
            title="Active Assignment"
            count="10"
            icon={
              <AddCardOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
            viewMoreAction={viewMoreAction}
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <TaskCountWidget
            title="Active Projects"
            count="5"
            icon={
              <BackupTableOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
            viewMoreAction={viewMoreAction}
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <TaskCountWidget
            title="Pending Assesments"
            count="10"
            icon={
              <AppRegistrationOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
            viewMoreAction={viewMoreAction}
          />
        </Box>
        {/* Row 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          //   maxHeight="70vh"
        >
          <BarChart isDashboard={true} />
        </Box>
        {/* <Box gridColumn="span 4" backgroundColor={colors.primary[400]}>
          <Box colors={colors.grey[100]} p="10px">
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Project
            </Typography>
          </Box>
          <Box display="flex" m="0 10px">
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                Job Search Portal
              </Typography>
              <Typography color={colors.grey[100]}>Mentor Name</Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" mr={"10px"}>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "10px",
              }}
              onClick={viewMoreAction}
            >
              Assign
            </Button>
          </Box>
        </Box> */}
        {/* Row 3 for Pie Chart */}
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box p={"10px 0 0 10px"}>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Task Popularity
            </Typography>
          </Box>
          <PieChart />
        </Box>
        {/* <Box
          gridColumn="span 6"
          
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        ></Box>
        <Box
          gridColumn="span 6"
          
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        ></Box> */}
      </Box>
    </Box>
  );
};

export default Lecturer_Dashboard;
