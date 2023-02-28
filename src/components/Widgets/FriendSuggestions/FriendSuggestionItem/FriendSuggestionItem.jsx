import Avatar from "react-avatar";
import React from "react";
import "./FriendSuggestionItem.css";
import * as followActions from "../../../../redux/actions/followActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const FriendSuggestionItem = ({ image, displayName, username }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userFollowed, setUserFollowed] = React.useState(false);

  const handleToggleFollow = () => {
    if (userFollowed) {
      dispatch(followActions.unfollowUser(username)).then(() => {
        setUserFollowed(false);
      });
    } else {
      dispatch(followActions.followUser(username)).then(() => {
        setUserFollowed(true);
      });
    }
  };

  return (
    <div className="friendSuggestionsItem">
      <div
        className="friendSuggestionImage"
        onClick={() => navigate(`/profile/${username}`)}
      >
        <Avatar src={image} name={displayName} round={true} size={50} />
      </div>
      <div className="profileCardNameCol">
        <div
          className="profileCardNameColName"
          onClick={() => navigate(`/profile/${username}`)}
        >
          <span>{displayName}</span>
        </div>
        <div className="profileCardNameColuserName">
          <span>@{username}</span>
        </div>
      </div>
      <div
        className="friendFollowButton"
        style={{ cursor: "pointer" }}
        onClick={handleToggleFollow}
      >
        <span>{userFollowed ? "Following" : "Follow"}</span>
      </div>
    </div>
  );
};

export default FriendSuggestionItem;
