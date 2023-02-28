import Avatar from "react-avatar";
import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import { useDispatch, useSelector } from "react-redux";
import * as followActions from "../../redux/actions/followActions";
import { useNavigate } from "react-router";

const ProfileCard = ({ active, profile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.profile.username);
  const [userFollowed, setUserFollowed] = React.useState(false);
  const [followsUser, setFollowsUser] = React.useState(false);

  const selectLoggedInUserFollowing = useSelector(
    (state) => state.follow.loggedInUserFollowing
  );
  const [loggedInUserFollowing, setLoggedInUserFollowing] = useState(
    selectLoggedInUserFollowing
  );

  const selectLoggedInUserFollowers = useSelector(
    (state) => state.follow.loggedInUserFollowers
  );
  const [loggedInUserFollowers, setLoggedInUserFollowers] = useState(
    selectLoggedInUserFollowers
  );

  useEffect(() => {
    dispatch(followActions.getLoggedInUserFollowing());
    dispatch(followActions.getLoggedInUserFollowers());
  }, [dispatch]);

  useEffect(() => {
    setLoggedInUserFollowing(selectLoggedInUserFollowing);
    setLoggedInUserFollowers(selectLoggedInUserFollowers);
    checkIfUserFollowed();
    handleFollowsUser();
  }, [selectLoggedInUserFollowing, selectLoggedInUserFollowers]);

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

  const handleFollowsUser = () => {
    loggedInUserFollowers.map((user) => {
      if (user.username == profile.username) {
        setFollowsUser(true);
        return;
      }
    });
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
          onClick={() => navigate("/profile/" + profile.username)}
          style={{ cursor: "pointer" }}
        />
        {user !== profile.username ? (
          <div onClick={handleToggleFollow} style={{ cursor: "pointer" }}>
            <span>{userFollowed ? "Following" : "Follow"}</span>
          </div>
        ) : (
          <> </>
        )}
      </div>
      <div
        onClick={() => navigate("/profile/" + profile.username)}
        style={{ cursor: "pointer" }}
      >
        <span>{profile.firstname + " " + profile.lastname}</span>
      </div>
      <div>
        <span>@{profile.username}</span>
      </div>
      <div>
        <span></span>
        <span></span>
      </div>
      <div>
        <span>
          <span></span>
          <span>{profile.email}</span>
        </span>
        <span>
          <span></span>
          <span>{followsUser ? "Follows you" : ""}</span>
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
