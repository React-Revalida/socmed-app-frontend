import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Profile from "../components/Profile";
import "../styles/Profile.css";
import * as profileActions from "../redux/actions/userActions";
const ProfilePage = () => {
  const [isMe, setIsMe] = React.useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (params.username) {
      dispatch(profileActions.fetchOtherProfile(params.username));
      setIsMe(false);
    } else {
      dispatch(profileActions.fetchProfile());
      setIsMe(true);
    }
  }, [params, dispatch]);

  const profile = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.user.loading);
  return (
    <>
      <Profile profile={profile} isMe={isMe} loading={loading} />
    </>
  );
};

export default ProfilePage;
