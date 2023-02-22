import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Profile from "../components/Profile";
import "../styles/Profile.css";
import * as profileActions from "../store/actions";

const ProfilePage = () => {
  const [isMe, setIsMe] = React.useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.username) {
      dispatch(profileActions.fetchOtherProfile(params.username));
      setIsMe(false);
    } else {
      dispatch(profileActions.fetchProfile());
      setIsMe(true);
    }
  }, [params, dispatch]);
  
  const profile = useSelector((state) => state.profile);
  return (
    <>
      <Profile profile={profile} isMe={isMe} />
    </>
  );
};

export default ProfilePage;
