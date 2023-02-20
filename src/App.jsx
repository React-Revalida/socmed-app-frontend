import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useState } from "react";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import Feed from "./pages/Feed";
import Sidebar from "./components/Sidebar";
import Widget from "./components/Widget";

const theme = createTheme({
  // palette: {
  //   mode: "dark",
  // },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <Sidebar />
        <Container sx={{ marginTop: 3 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/feed" />}></Route>
            <Route path="/feed" element={<Feed />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Container>
        <Widget />
      </div>
    </ThemeProvider>
  );
}

export default App;
