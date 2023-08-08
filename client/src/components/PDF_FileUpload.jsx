import React, { useState, useEffect } from "react";
import {
  Box,
  Icon,
  Button,
  IconButton,
  useTheme,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
//import fileUpload from "../store/action";
import PropTypes from "prop-types";
import { tokens } from "../theme";
import { styled } from "@mui/material/styles";

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
// import FileUpload from "react-material-file-upload";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TextareaAutosize from "@mui/base/TextareaAutosize";

import DropboxChooser from "react-dropbox-chooser";

const emails = ["username@gmail.com", "user02@gmail.com"];
const APP_KEY = "tfswtn37byg2azt";
const accessToken =
  "sl.BizCGl_QorgJig-_nOLge4jqiyh20UIVnY872WbAlQsL90qXjgp_vE7Kn3SesUE2xT92Oor5VdSi0dJU5EtGYWLKIixtA6GWeBRoV_3S5NQTuFbpA6MKAymS2lMcX5W3ibD-sdj9x8pJ";

function SimpleDialog(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    onClose,
    selectedValue,
    open,
    filesList,
    fileUpload,
    saveStudentSubmission,
  } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  const [uploadfiles, setUploadFiles] = useState([]);
  const [comment, setComment] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const filesJsonData = [];

  const saveFiles = () => {
    //filesJsonData.push(...uploadfiles);
    //Add new files to the filesList prop from the redux data store
    //filesList.push(...uploadfiles);
    //fileUpload(filesList);
    /* Send Data to Task link */
    saveStudentSubmission(comment, repoLink);

    //Close Upload Dialog
    handleClose();
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: colors.primary[400],
        color: colors.grey[100],
        "& .MuiPaper-root": {
          backgroundColor: colors.primary[400],
        },
      }}
    >
      <BootstrapDialog onClose={handleClose} open={open}>
        <Box m={"20px"} sx={{ minWidth: "80vh", height: "40vh" }}>
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
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: colors.grey[700],
              color: colors.grey[100],
            }}
          />
          <TextField
            label="Add repository Link here"
            value={repoLink}
            onChange={(e) => {
              setRepoLink(e.target.value);
            }}
            sx={{ width: "100%" }}
            variant="outlined"
          ></TextField>

          {/* <FileUpload value={uploadfiles} onChange={setUploadFiles} /> */}

          {/* <DropboxChooser
          appKey={APP_KEY}
          accessToken={accessToken}
          success={(files) => this.onSuccess(files)}
          cancel={() => this.onCancel()}
          multiselect={true}
          extensions={[".mp4"]}
        >
          <div className="dropbox-button">Click me!</div>
        </DropboxChooser> */}
          <Button
            autoFocus
            onClick={saveFiles}
            sx={{
              float: "right",
              margin: "10px 0",
              color: colors.grey[100],
              backgroundColor: colors.blueAccent[700],
            }}
          >
            Save changes
          </Button>
        </Box>
      </BootstrapDialog>
    </Box>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function PDF_FileUpload(props) {
  const { filesList, fileUpload, saveStudentSubmission } = props;
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
        filesList={filesList}
        fileUpload={fileUpload}
        saveStudentSubmission={saveStudentSubmission}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({ filesList: state.filesList });

const mapDispatchToProps = (dispatch) => {
  return {
    fileUpload: (filesList) => dispatch({ type: "UPLOAD", payload: filesList }),
  };
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root":{
    backgroundColor:"#010101"
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    margin: "10px 5px",
    color: "#858585",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogTitle-root": {
    fontSize: "18px",
    color: "#e0e0e0",
  },
}));

export default connect(mapStateToProps, mapDispatchToProps)(PDF_FileUpload);
