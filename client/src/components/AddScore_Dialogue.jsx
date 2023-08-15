import React, { useState, useEffect } from "react";
import {
  Box,
  Icon,
  Button,
  IconButton,
  useTheme,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { tokens } from "theme";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useNavigate } from "react-router-dom";

const AddScore_Dialogue = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { open, closeDialog, scoreDetail } = props;
  const navigate=useNavigate();

  const handleClose = () => {
    closeDialog();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        "& .MuiPaper-root, & .MuiDialog-paper ,& .MuiBox-root": {
          backgroundColor: colors.primary[400],
        },
      }}
    >
      <Box m={"20px"}>
        <DialogTitle
          sx={{ display: "flex", justifyContent: "space-between", p: "0" }}
        >
          <Box display="flex" justifyContent="space-between" width={"100%"}>
            <Typography
              variant="h3"
              sx={{ color: colors.grey[100], margin: "6px 0 10px 0" }}
            >
              Upload Repository
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseOutlinedIcon sx={{ color: colors.grey[100] }} />
            </IconButton>
          </Box>
        </DialogTitle>

        <Typography sx={{ color: colors.grey[100] }}>Comments:</Typography>
        <TextareaAutosize
          minRows={5}
          style={{
            width: "100%",
            backgroundColor: colors.grey[700],
            color: colors.greenAccent[500],
          }}
        />

        <Button
          autoFocus
          sx={{
            float: "right",
            margin: "10px 0",
            backgroundColor: colors.primary[500],
            color: colors.grey[100],
          }}
          onClick={()=>{
            navigate("/lecturer/dashboard")
          }}
        >
          Save changes
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddScore_Dialogue;
