import { ArrowBack, Schedule } from "@mui/icons-material";
import React from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
const Profile = ({ profile }) => {
  const loading = useSelector((state) => state.loading);
  if (loading) return <div>Loading...</div>;

  return (
    <section className="feed">
      <div className="profileHeader">
        <div>
          <ArrowBack />
        </div>
        <div>
          <span>{profile.name}</span>
          <span>Tweets</span>
        </div>
      </div>
      <div className="profile">
        <div className="backgroundImage"></div>
        <div className="profileTitle">
          <div className="profileImage">
            <Avatar
              name={profile.name}
              src={profile.profilePic}
              round={true}
              size="120"
            ></Avatar>
          </div>
          <div className="editProfile">
            <span>Edit Profile</span>
          </div>
        </div>
        <div className="profileBiography">
          <span>{profile.name}</span>
          <span>{profile.email}</span>
          <span>{profile.bio}</span>
          <span>
            <Schedule />
            {profile.dateJoined}
          </span>
        </div>
        <div>
          <span>
            <span>{profile.following}</span>
            <span>Following</span>
          </span>
          <span>
            <span>{profile.followers}</span>
            <span>Followers</span>
          </span>
        </div>
      </div>
      <article className="profilePosts"></article>
    </section>
  );
};

export default Profile;
