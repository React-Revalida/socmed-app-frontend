import React from "react";
import Profile from "../components/Profile";
import "../styles/Profile.css";

const ProfilePage = ({ profile }) => {
  return (
    <>
      <Profile profile={profile} />
    </>
  );
};

export default ProfilePage;
