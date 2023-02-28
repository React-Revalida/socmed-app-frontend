import Avatar from "react-avatar";
import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import { useDispatch, useSelector } from "react-redux";
import * as followActions from "../../redux/actions/followActions";
import { useNavigate } from "react-router";

const ProfileCard = ({ active, profile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userFollowed, setUserFollowed] = React.useState(false);

  const selectLoggedInUserFollowing = useSelector(
    (state) => state.follow.loggedInUserFollowing
  );
  const [loggedInUserFollowing, setLoggedInUserFollowing] = useState(
    selectLoggedInUserFollowing
  );

  useEffect(() => {
    dispatch(followActions.getLoggedInUserFollowing());
  }, [dispatch]);

  useEffect(() => {
    setLoggedInUserFollowing(selectLoggedInUserFollowing);
    checkIfUserFollowed();
  }, [selectLoggedInUserFollowing]);

  const checkIfUserFollowed = () => {
    if (loggedInUserFollowing) {
      loggedInUserFollowing.map((user) => {
        if (user.username == profile.username) {
          setUserFollowed(true);
        }
      });
    }
  };

  const handleToggleFollow = () => {
    if (userFollowed) {
      dispatch(followActions.unfollowUser(profile.username)).then(() => {
        setUserFollowed(false);
      });
    } else {
      dispatch(followActions.followUser(profile.username)).then(() => {
        setUserFollowed(true);
      });
    }
  };

  const redirectToProfile = () => {
    navigate("/profile/" + profile.username);
  };

  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <div
      className={
        active || isVisible ? "profileDetailCard" : "profileDetailCardActive"
      }
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div>
        <Avatar
          src={profile.profilePic}
          name={profile.firstname + " " + profile.lastname}
          round={true}
          size={60}
          onClick={redirectToProfile}
          style={{ cursor: "pointer" }}
        />
        <div onClick={handleToggleFollow} style={{ cursor: "pointer" }}>
          <span>{userFollowed ? "Following" : "Follow"}</span>
        </div>
      </div>
      <div onClick={redirectToProfile} style={{ cursor: "pointer" }}>
        <span>{profile.firstname + " " + profile.lastname}</span>
      </div>
      <div>
        <span>@{profile.username}</span>
      </div>
      <div>
        <span>{profile.dateJoined}</span>
      </div>
      <div>
        <span>
          <span>{}</span>
          <span>Following</span>
        </span>
        <span>
          <span>{}</span>
          <span>Followers</span>
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
