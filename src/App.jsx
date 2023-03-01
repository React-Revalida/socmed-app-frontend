import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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

function App() {
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("darkMode", "light");
  };

  const setTheme = (theme) => {
    document.querySelector("body").setAttribute("data-theme", theme);
    localStorage.setItem("darkMode", theme);
  };

  const [appTheme, setAppTheme] = useState();

  const toggleTheme = (e) => {
    const datatheme = localStorage.getItem("darkMode");
    console.log(e.target.checked);
    if (datatheme === "light") {
      setTheme("dark");
      setAppTheme("dark");
    } else {
      setTheme("light");
      setAppTheme("light");
    }
  };

  const selectToken = useSelector((state) => state.auth.accessToken);
  const accessToken = localStorage.getItem("accessToken") || selectToken;
  const navigate = useNavigate();
  useEffect(() => {
    const datatheme = localStorage.getItem("darkMode");
    setTheme(datatheme);
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const { handleDisableCardAction } = useContext(UserInterfaceContext);

  const handleOnPostPage = (url) => {
    if (url.includes("/post")) {
      handleDisableCardAction(true);
    } else {
      handleDisableCardAction(false);
    }
    return url;
  };

  const otherLoc = handleOnPostPage(window.location.href);

  return (
    <Routes>
      <Route
        element={
          accessToken ? (
            <SidebarWidgetLayout
              appTheme
              switchTheme={toggleTheme}
              otherLoc={otherLoc}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route path="/home" element={<Feed switchTheme={toggleTheme} />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:username" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/posts/:postId" element={<PostPage />} />
      </Route>

      <Route
        element={
          accessToken ? (
            <SidebarWidgetLayout
              switchTheme={toggleTheme}
              otherLoc={otherLoc}
            />
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
  );
}

export default App;
