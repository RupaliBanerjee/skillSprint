import React, { useState, useEffect } from "react";
import { Box, Icon, Button, IconButton, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { tokens } from "../theme";

import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import FileUpload from "react-material-file-upload";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TextareaAutosize from "@mui/base/TextareaAutosize";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  const [files, setFiles] = useState([]);
  const filesJsonData = [];

  console.log("File Data", files);
  const saveFiles = () => {
    filesJsonData.push(...files);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box m={"20px"} sx={{ minWidth: "60vh" }}>
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

        <FileUpload value={files} onChange={setFiles} />
        <Button
          autoFocus
          onClick={saveFiles}
          sx={{
            float: "right",
            margin: "10px 0",
            backgroundColor: colors.primary[500],
            color: colors.grey[100],
          }}
        >
          Save changes
        </Button>
      </Box>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function PDF_FileUpload(props) {
  const [open, setOpen] = React.useState(false);
  const openDialog = props.open;

  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  useEffect(() => {
    setOpen(openDialog);
  }, [props]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    props.closeDialog();
  };

  return (
    <div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
