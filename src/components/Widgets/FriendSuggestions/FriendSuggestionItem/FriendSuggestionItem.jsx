import Avatar from "react-avatar";
import React, { useEffect } from "react";
import "./FriendSuggestionItem.css";
import * as followActions from "../../../../redux/actions/followActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { resetLoading } from "../../../../redux/actions/postActions";
import Follow from "../../../../assets/calm.png";
import Followed from "../../../../assets/spilled.png";

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
        onClick={() => {
          dispatch(resetLoading());
          navigate(`/profile/${username}`);
        }}
      >
        <Avatar src={image} name={displayName} round={true} size={50} />
      </div>
      <div className="profileCardNameCol">
        <div
          className="profileCardNameColName"
          onClick={() => {
            dispatch(resetLoading());
            navigate(`/profile/${username}`);
          }}
        >
          <span className="dname">{displayName}</span>
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
        <span>
          {userFollowed ? (
            <img
              src={Followed}
              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt="Spill"
              loading="lazy"
              className="followed-icon"
            />
          ) : (
            <img
              src={Follow}
              // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt="Spill"
              loading="lazy"
              className="follow-icon"
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default FriendSuggestionItem;
