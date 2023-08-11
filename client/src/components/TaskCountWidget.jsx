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
import { tokens } from "theme";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPES } from "constants";

const TaskCountWidget = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { title, count, icon, viewMoreAction, taskType } = props;

  const account_Type = useSelector((state) => state.userInfo.account_type);

  const viewTaskData = () => {
    if (
      account_Type === ACCOUNT_TYPES.MENTOR ||
      account_Type === ACCOUNT_TYPES.LECTURER
    ) {
      viewMoreAction(taskType);
    } else {
      viewMoreAction();
    }
  };
  return (
    <>
      {count > 0 && (
        <Box width="100%" m="10px 10px">
          <Box display="flex" justifyContent="space-between">
            {icon}
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
              data-testid={`${account_Type}-${taskType}`}
            >
              {count}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h3" sx={{ color: colors.greenAccent[500] }}>
              {title}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt="10px">
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "12px",
                p: "0.2rem",
                m: "0.2rem",
              }}
              onClick={viewTaskData}
            >
              View More
            </Button>
          </Box>
        </Box>
      )}
      {count === 0 && (
        <Box width="100%" m="10px 10px">
          <Box display="flex" justifyContent="space-between">
            {icon}
          </Box>
          <Box>
            <Typography variant="h3" sx={{ color: colors.greenAccent[500] }}>
              No {title}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default TaskCountWidget;
