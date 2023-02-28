import React, { useEffect } from "react";
import "./Widgets.css";
import SearchInput from "./SearchInput/SearchInput";
import FriendSuggestions from "./FriendSuggestions/FriendSuggestions";

const Widgets = () => {
  return (
    <div className="widgets">
      <SearchInput placeholder="Search" />
      <FriendSuggestions />
    </div>
  );
};

export default Widgets;
