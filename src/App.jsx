import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useContext, useEffect } from "react";
import {
  useTheme,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import Feed from "./pages/Feed";
import PostPage from "./pages/PostPage";
import SidebarWidgetLayout from "./components/SidebarWidgetLayout";
import { UserInterfaceContext } from "./contexts/UserInterfaceContext";
import { amber, deepOrange, grey } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";

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
  // const theme = createTheme({
  //   palette: {
  //     mode: darkMode ? "dark" : "light",
  //   },
  // });

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const accessToken = useSelector((state) => state.user.accessToken);

  // useEffect(() => {
  //   dispatch(fetchProfile());
  // }, [dispatch]);

  return (
    <ThemeProvider theme={darkModeTheme}>
      <div className="app">
        <CssBaseline />
        <Container sx={{ marginTop: 3 }}>
          <Routes>
            <Route
              element={
                accessToken ? <SidebarWidgetLayout /> : <Navigate to="/login" />
              }
            >
              <Route path="/" element={<Navigate to="/feed" />}></Route>
              <Route path="/feed" element={<Feed />} />
              <Route path="/post" element={<PostPage />} />
              <Route
                path="/profile/me"
                element={<ProfilePage profile={profile} />}
              />
            </Route>
            <Route
              path="/register"
              element={accessToken ? <Navigate to="/" /> : <RegisterPage />}
            />
            <Route
              path="/login"
              element={accessToken ? <Navigate to="/" /> : <LoginPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
