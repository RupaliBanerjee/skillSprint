import * as React from "react";
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";

import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  colors,
} from "@mui/material";
import { tokens } from "../theme";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    margin: "10px 5px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DialogWithTitle(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { oncloseDialog, openDialog, title, showActionButton, children } =props;
  const [open, setOpen] = React.useState(openDialog);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    oncloseDialog();
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ minWidth: "50vh", overflowX: "hidden" }}>
          {children}
        </DialogContent>
        {showActionButton && (
          <DialogActions>
            <Button
              autoFocus
              onClick={handleClose}
              sx={{
                color: colors.grey[100],
                backgroundColor: colors.blueAccent[500],
              }}
            >
              Save changes
            </Button>
          </DialogActions>
        )}
      </BootstrapDialog>
    </Box>
  );
}
