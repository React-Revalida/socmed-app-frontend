import Avatar from "react-avatar";
import React from "react";
import "./FriendSuggestionItem.css";

const FriendSuggestionItem = ({ image, displayName, username }) => {
  return (
    <div className="friendSuggestionsItem">
      <div className="friendSuggestionImage">
        <Avatar src={image} round={true} size={50} />
      </div>
      <div className="profileCardNameCol">
        <div className="profileCardNameColName">
          <span>{displayName}</span>
        </div>
        <div className="profileCardNameColuserName">
          <span>@{username}</span>
        </div>
      </div>
      <div className="friendFollowButton">
        <span>Follow</span>
      </div>
    </div>
  );
};

export default FriendSuggestionItem;
