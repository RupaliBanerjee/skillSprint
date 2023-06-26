import React from "react";
import { Typography, Box, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import CelebrationIcon from "@mui/icons-material/Celebration";
import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";

const NotificationWidget = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      {/* Message Title */}
      <Box
        display="flex"
        gap={1}
        m="20px 0 10px 20px"
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
        <Typography variant="h3">2 DAYS</Typography>
        <Box display="flex"  justifyContent="space-between">
          <Typography>25-06-23</Typography>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "12px",
              marginRight: "10px",
            }}
            variant="contained"
          >
            View Tasks
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationWidget;
