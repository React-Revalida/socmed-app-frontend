import React from "react";
import "./BottomSidebar.css";
import { Link, useLocation } from "react-router-dom";
import SidebarItem from "../Sidebar/SidebarItem/SidebarItem";
import HomeIcon from "@mui/icons-material/Home";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PersonIcon from "@mui/icons-material/Person";

const BottomSidebar = () => {
  const [location] = React.useState(useLocation().pathname);
  return (
    <footer className="bottomSidebar">
      <div>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <SidebarItem
            text="Home"
            Icon={HomeIcon}
            active={location === "/home" && true}
          />
        </Link>
      </div>
      <div>
        <Link to="/messages" style={{ textDecoration: "none" }}>
          <SidebarItem
            text="Chats"
            Icon={QuestionAnswerIcon}
            active={location === "/messages" && true}
          />
        </Link>
      </div>
      <div>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <SidebarItem
            text="Profile"
            Icon={PersonIcon}
            active={location === "/messages" && true}
          />
        </Link>
      </div>
    </footer>
  );
};

export default BottomSidebar;
