import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useSelector } from "react-redux";
import profileImage from "../assets/images/profileIcon.png";
import pbl_logo from "../assets/images/pbl_logo.png";
import { ACCOUNT_TYPES } from "constants";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //const account_type=useSelector(state=>state?.userInfo.userData.role);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSlected] = useState("Dashboard");

  const user_id = useSelector((state) => state?.userInfo?.logged_in_userId);
  const userInfo = useSelector((state) => state.userInfo.userData);
  const accountType = useSelector((state) => state?.userInfo.userData.role);

  const generateInitials = (fname, lname) => {
    const firstName = fname.toUpperCase().split("")[0];
    const lastName = lname.toUpperCase().split("")[0];
    return firstName + lastName;
  };

  const initials = userInfo
    ? generateInitials(userInfo.first_name, userInfo.last_name)
    : "";

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "0px 35px 5px 20px !important",
        },
        "& .pro-menu > ul >li:first-chid > .pro-inner-item": {
          padding: " 0px 10px 10px 0px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}

          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display={"flex"}
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Box>
                  <img
                    alt="profile-User"
                    width="50px"
                    height="50px"
                    src={pbl_logo}
                    style={{
                      cursor: "pointer",
                      float: "left",
                      marginRight: "1rem",
                    }}
                  />
                  <Typography
                    variant="h3"
                    color={colors.grey[100]}
                    sx={{ textTransform: "capitalize", marginTop: "1rem" }}
                  >
                    {userInfo.role}
                  </Typography>
                </Box>

                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* User */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display={"flex"} justifyContent="center" alignItems="center">
                <img
                  alt="profile-User"
                  width="100px"
                  height="100px"
                  src={profileImage}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {initials}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {userInfo?.first_name} {userInfo?.last_name}
                </Typography>
              </Box>
            </Box>
          )}
          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to={
                accountType === ACCOUNT_TYPES.STUDENT
                  ? `/dashboard/${user_id}`
                  : accountType === ACCOUNT_TYPES.LECTURER
                  ? "/lecturer/dashboard"
                  : "/mentor/dashboard"
              }
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSlected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Profile"
              to="/profile"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSlected}
            />
            {/* <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSlected}
            /> */}
            {/* <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSlected}
            /> */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            {/* FOR STUDENT ACCOUNT */}
            {accountType === ACCOUNT_TYPES.STUDENT && (
              <>
                <Item
                  title="View Task"
                  to="/viewTask"
                  icon={<AssignmentOutlinedIcon />}
                  selected={selected}
                  setSelected={setSlected}
                />
                <Item
                  title="Calendar"
                  to="/calendar"
                  icon={<CalendarTodayOutlinedIcon />}
                  selected={selected}
                  setSelected={setSlected}
                />
                <Item
                  title="Forum"
                  to="/forum"
                  icon={<HelpOutlinedIcon />}
                  selected={selected}
                  setSelected={setSlected}
                />
              </>
            )}
            {/* FOR LECTURER ACCOUNT */}
            {accountType === ACCOUNT_TYPES.LECTURER && (
              <>
                <Item
                  title="Evaluate"
                  to="/evaluate"
                  icon={<EditNoteOutlinedIcon />}
                  selected={selected}
                  setSelected={setSlected}
                />
                <Item
                  title="Assign"
                  to="/assign"
                  icon={<InputOutlinedIcon />}
                  selected={selected}
                  setSelected={setSlected}
                />
                <Item
                  title="Publish"
                  to="/publish/assignment"
                  icon={<AssignmentOutlinedIcon />}
                  selected={selected}
                  setSelected={setSlected}
                />
              </>
            )}
            {accountType === ACCOUNT_TYPES.MENTOR && (
              <Item
                title="Publish"
                to="/publish/assignment"
                icon={<AssignmentOutlinedIcon />}
                selected={selected}
                setSelected={setSlected}
              />
            )}
            {accountType === ACCOUNT_TYPES.STUDENT && (
              <>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Charts
                </Typography>
                <Item
                  title="Score Card"
                  to="/score"
                  icon={<BarChartOutlinedIcon />}
                  selected={selected}
                  setSelected={setSlected}
                />
              </>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
