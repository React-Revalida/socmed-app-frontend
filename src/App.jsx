import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useTheme, createTheme, ThemeProvider } from "@mui/material";
import { UserInterfaceContext } from "./contexts/UserInterfaceContext";
import { grey } from "@mui/material/colors";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import SignupPage from "./pages/Signup/SignupPage";
import "react-toastify/dist/ReactToastify.css";
import PostPage from "./pages/Post/PostPage";

import Messages from "./pages/Messages/Messages";
import LoginPage from "./pages/Login/LoginPage";
import { useSelector } from "react-redux";
import SidebarWidgetLayout from "./components/Feed/Layout/SidebarWidgetLayout";
import Feed from "./components/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import jwtDecode from "jwt-decode";

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
  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const otherLoc = window.location.href;

  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route
          element={
            accessToken ? (
              <SidebarWidgetLayout otherLoc={otherLoc} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="/home" element={<Feed />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:username" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/posts/:postId" element={<PostPage />} />
        </Route>

        <Route
          path="/"
          element={accessToken ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/login"
          element={accessToken ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={accessToken ? <Navigate to="/home" /> : <SignupPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
