import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./common/Topbar";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./common/Sidebar";
import Dashboard from "./pages/dashboard";
import GlobalStyles from "./styles/Global.styled";

import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Calendar from "./pages/calendar";
import Forum from "./pages/forum";
import ViewTask from "./pages/viewTask";
import ScorePage from "./pages/ScorePage";
import ProfilePage from "./pages/profilePage";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPES } from "../src/constants";

function App() {
  const [theme, colorMode] = useMode();
  const accountType = useSelector((state) => state?.userInfo.userData.role);

  console.log("accountType", accountType);

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
            <Routes>
              <Route path="/dashboard/:id" element={<Dashboard />} />

              <Route path="/calendar" element={<Calendar />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/viewTask" element={<ViewTask />} />
              <Route path="/score" element={<ScorePage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
        )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
