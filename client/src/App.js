import { ColorModeContext, useDarkMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./common/Topbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./common/Sidebar";
import Dashboard from "./pages/student/dashboard";
import GlobalStyles from "./styles/Global.styled";

import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Calendar from "./pages/student/calendar";
import Forum from "./pages/student/forum";
import ViewTask from "./pages/student/viewTask";
import ScorePage from "./pages/student/ScorePage";
import ProfilePage from "./pages/student/profilePage";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPES } from "../src/constants";
import ViewInactiveTask from "pages/student/viewInactiveTask";
import Lecturer_Dashboard from "pages/lecturer/dashboard";
import EvaluateMainPage from "./pages/lecturer/evaluate/EvaluateMainPage";
import AssignProjectMainPage from "pages/lecturer/assign/AssignProjectMainPage";
import PublishAssignmentPage from "pages/lecturer/publish/PublishAssignmentPage";
import MentorDashboard from "pages/mentor/dashboard";
import MentorTaskDetails from "pages/mentor/taskDetail";
import SubmissionGrid from "pages/mentor/submissionGrid"
import TaskListMainPage from "pages/mentor/taskList";
import ActiveProjectGrid from "pages/mentor/activeProjectPage/activeProjectGrid";
import LecturerTaskListMainPage from "pages/lecturer/taskList";
import StudentDetailGrid from "pages/lecturer/taskList/studentDetailGrid";
import { useEffect } from "react";
import theme from "./theme";

function App() {
  const [theme, colorMode] = useDarkMode();
  const accountType = useSelector((state) => state?.userInfo.userData.role);
  const navigate=useNavigate()
  useEffect(() => {
    navigate("/", { replace: true });
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {accountType == undefined && (
            // <div className="content">
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
            // </div>
          )}
          {accountType && <Sidebar />}
          {accountType && (
            <main className="content">
              <Topbar />
              {accountType === ACCOUNT_TYPES.STUDENT && (
                <Routes>
                  <Route path="/dashboard/:id" element={<Dashboard />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/forum" element={<Forum />} />
                  <Route path="/viewTask" element={<ViewTask />} />
                  <Route path="/score" element={<ScorePage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route
                    path="/latestTask/:task_key"
                    element={<ViewInactiveTask />}
                  />
                </Routes>
              )}
              {accountType === ACCOUNT_TYPES.LECTURER && (
                <Routes>
                  <Route
                    path="/lecturer/dashboard"
                    element={<Lecturer_Dashboard />}
                  />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/evaluate/:pageType" element={<EvaluateMainPage />} />
                  <Route path="/assign" element={<AssignProjectMainPage />} />
                  <Route
                    path="/publish/assignment"
                    element={<PublishAssignmentPage />}
                  />
                    <Route path="/lecturer/studentTaskDetail/:task_type/:task_key" element={<StudentDetailGrid/>}/>
                  <Route path="/lecturer/dashboard/taskList/:taskType" element={<LecturerTaskListMainPage/>}/>
                </Routes>
              )}
              {accountType === ACCOUNT_TYPES.MENTOR && (
                <Routes>
                  <Route
                    path="/mentor/dashboard"
                    element={<MentorDashboard />}
                  />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/mentor/taskDetails/:task_key" element={<MentorTaskDetails/>}/>
                  <Route path="/mentor/studentSubmission/:task_key" element={<SubmissionGrid/>}/>
                  <Route
                    path="/publish/project"
                    element={<PublishAssignmentPage />}
                  />
                  <Route path="/mentor/project/:project_type" element={<TaskListMainPage/>}/>
                  <Route path="/studentTaskDetail/:task_key" element={<ActiveProjectGrid/>}/>
                </Routes>
              )}
            </main>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
