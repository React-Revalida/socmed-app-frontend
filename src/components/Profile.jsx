import { ArrowBack, Schedule } from "@mui/icons-material";
import { Backdrop, Button, Dialog, DialogContent } from "@mui/material";
import React from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import ProfileEditForm from "./ProfileEditForm";
const Profile = ({ profile }) => {
  const loading = useSelector((state) => state.loading);
  const [open, setOpen] = React.useState(false);
  const handleEditProfile = () => {
    setOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <Dialog
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <DialogContent>
          <ProfileEditForm profile={profile} />
        </DialogContent>
      </Dialog>
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
            <Button className="editProfile" onClick={handleEditProfile}>
              <span>Edit Profile</span>
            </Button>
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
    </div>
  );
};

export default Profile;
