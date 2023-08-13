import React, { useState } from "react";
import {
  Box,
  Icon,
  Button,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import { InputBase } from "@mui/material";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "store/userInfo/userInfoSlice";
//import { useTheme } from "@emotion/react";
import theme from "../theme";
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClose = () => {
    setShowProfileOptions(false);
  };

  const signOut = () => {
    // setShowProfileOptions(false);
    navigate("/");
    dispatch(reset());
  };

  //const showProfileOptions = () => {};
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      p={1}
      sx={{ color: colors.grey[100] }}
    >
      {/* Search Bar Currently not functional */}
      <Box
        display={"flex"}
        sx={{ backgroundColor: colors.primary[400], borderRadius: "3px" }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1, color: colors.grey[100] }}
          placeholder="Search"
        />
        <IconButton type="button" sx={{ p: 1, color: colors.grey[100] }}>
          <SearchIcon />
        </IconButton>
      </Box>
      {/* Icons for top left corner */}
      <Box display={"flex"}>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={(e) => {
            setShowProfileOptions(true);
            setSelectedOption(e.currentTarget);
          }}
        >
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          selectedOption={selectedOption}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(showProfileOptions)}
          onClose={handleClose}
        >
          <MenuItem onClick={signOut}>Sign out</MenuItem>
          {/* The activity tracker is in future scope */}
          <MenuItem onClick={handleClose}>Activity Tracker</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
