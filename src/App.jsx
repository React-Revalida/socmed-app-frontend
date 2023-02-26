import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useTheme, createTheme, ThemeProvider } from "@mui/material";
// import SidebarWidgetLayout from "./components/SidebarWidgetLayout";
import { UserInterfaceContext } from "./contexts/UserInterfaceContext";
import { grey } from "@mui/material/colors";
// import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import "react-toastify/dist/ReactToastify.css";

import Notifications from "./pages/Notifications/Notifications";
import Profile from "./pages/Profile/Profile";
import Messages from "./pages/Messages/Messages";
import LoginPage from "./pages/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginSuccess } from "./redux/types";
import SidebarWidgetLayout from "./components/SidebarWidgetLayout";
import Feed from "./components/Feed/Feed";
const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      light: "#f5f8fa",
      main: "#3f50b5",
      dark: "#17202a",
      contrastText: "#fff",
    },
    ...(mode === "dark" && {
      background: {
        default: "#17202a",
        paper: "#17202a",
      },
    }),
    text: {
      ...(mode === "light"
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: "#fff",
            secondary: grey[500],
          }),
    },
  },
});

function App() {
  const { darkMode } = useContext(UserInterfaceContext);

  const theme = useTheme();
  const mode = darkMode ? "dark" : "light";
  const darkModeTheme = createTheme(getDesignTokens(mode));

  const selectToken = useSelector((state) => state.auth.accessToken);
  const accessToken = localStorage.getItem("accessToken") || selectToken;
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route
          element={
            accessToken ? <SidebarWidgetLayout /> : <Navigate to="/login" />
          }
        >
          <Route path="/home" element={<Feed />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/Messages/:username" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Route>

        <Route
          path="/login"
          element={accessToken ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={accessToken ? <Navigate to="/home" /> : <RegisterPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
