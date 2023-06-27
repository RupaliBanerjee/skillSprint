import React, { useState } from "react";
import PropTypes from "prop-types";
import TaskList from "../pages/taskList";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import { tokens } from "../theme";
import TaskDetail from "../pages/taskDetail";
import ShowHistory from "../pages/showHistory";

function TabPanel(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { children, value, index, data, name, ...other } = props;
  const [taskData, setTaskData] = React.useState();
  const [showBackButton, setShowBackButton] = useState(false);

  const viewTaskDetail = (task) => {
    setTaskData(task);
    setShowBackButton(true);
  };

  console.log("Name", name);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              {children}
            </Typography>
            {showBackButton && (
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                }}
                onClick={() => {
                  setShowBackButton(false);
                  setTaskData(undefined);
                }}
              >
                Back
              </Button>
            )}
          </Box>
          {/* ALL Three tabs have the same task list
                on click of the of view task assignment and project will show the same page
                 and History will have different layout */}
          {taskData == undefined && !showBackButton && name !== "HISTORY" ? (
            <TaskList data={data} viewTaskDetail={viewTaskDetail} />
          ) : name !== "HISTORY" ? (
            <TaskDetail taskData={taskData} />
          ) : (
            <ShowHistory />
          )}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  //Tab Names from Parent Component
  const tabInfo = props.tabInfo;

  const [value, setValue] = React.useState(0);
  const [currentTab, setCurrentTab] = useState("ASSIGNMNENTS");

  const handleChange = (event, newValue) => {
    setCurrentTab(event.target.innerText);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {/* Display Tab Names */}
        <Tabs
          value={value}
          textColor="secondary"
          indicatorColor="secondary"
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabInfo.map((tabItem, i) => {
            return <Tab label={tabItem.tabName} {...a11yProps(i)} />;
          })}
        </Tabs>
      </Box>
      {/* Display Tab Pages */}
      {tabInfo.map((tabItem, i) => {
        return (
          <TabPanel
            value={value}
            index={i}
            data={tabItem.tabData}
            name={currentTab}
          >
            {tabItem.tabName !== "History" && ` Active ${tabItem.tabName}`}
            {tabItem.tabName === "History" && "Previously Submitted Tasks"}
          </TabPanel>
        );
      })}
    </Box>
  );
}
