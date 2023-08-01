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

const TaskCountWidget = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { title, count, icon, viewMoreAction } = props;
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
              onClick={viewMoreAction}
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
