import React, { useEffect } from "react";
import "./FriendSuggestions.css";
import FriendSuggestionItem from "./FriendSuggestionItem/FriendSuggestionItem";
import { useDispatch, useSelector } from "react-redux";
import * as followActions from "../../../redux/actions/followActions";

const FriendSuggestions = () => {
  const dispatch = useDispatch();
  const whoToFollow = useSelector((state) => state.follow.whoToFollow);

  useEffect(() => {
    dispatch(followActions.getWhoToFollow());
  }, [dispatch]);

  return (
    <div className="friendSuggestions">
      <div className="friendSuggestionsHeader">
        <span>Have a tea with...</span>
      </div>
      {whoToFollow.map((user) => (
        <FriendSuggestionItem
          key={user.userId}
          username={user.username}
          displayName={user.name}
          image={user.profilePic}
        />
      ))}
    </div>
  );
};

export default FriendSuggestions;
