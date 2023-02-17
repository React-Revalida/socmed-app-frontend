import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import Feed from "./pages/Feed";
import Sidebar from "./components/Sidebar";

function App() {
  return (
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
    </div>
  );
}

export default App;
