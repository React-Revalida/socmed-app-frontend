import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import Feed from "./pages/Feed";
import Sidebar from "./components/Sidebar";
import Widget from "./components/Widget";
import PostPage from "./pages/PostPage";
import SidebarWidgetLayout from "./components/SidebarWidgetLayout";

function App() {
  return (
    <div className="app">
      <CssBaseline />
      <Container sx={{ marginTop: 3 }}>
        <Routes>
          <Route element={<SidebarWidgetLayout />}>
            <Route path="/" element={<Navigate to="/feed" />}></Route>
            <Route path="/feed" element={<Feed />} />
            <Route path="/post" element={<PostPage />} />
          </Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
