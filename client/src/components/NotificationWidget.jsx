import React from "react";
import { Typography, Box, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import CelebrationIcon from "@mui/icons-material/Celebration";
import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import { useNavigate } from "react-router-dom";

const NotificationWidget = (props) => {

  const{taskdata,dateInfo}=props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate= useNavigate();
  return (
    <Box>
      {/* Message Title */}
      <Box
        display="flex"
        gap={1}
        m="10px 0 10px 20px"
        justifyContent="flex-start"
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          Assignment Due In
        </Typography>
        <AccessAlarmsOutlinedIcon />
      </Box>
      {/* Message Content */}
      <Box marginLeft="20px">
        <Typography variant="h3">{parseInt(dateInfo)} DAYS</Typography>
        <Box display="flex"  justifyContent="space-between">
          <Typography>{taskdata?.task_detail?.end_date}</Typography>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "12px",
              marginRight: "10px",
            }}
            variant="contained"
            onClick={()=>navigate('/viewTask')}
          >
            View Tasks
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationWidget;
