import { ArrowBack, Schedule } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import Avatar from "react-avatar";
import ProfileEditForm from "./ProfileEditForm";
const Profile = ({ profile, isMe, loading }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpenEditDialog = (isOpen) => {
    setOpen(isOpen);
  };

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <ProfileEditForm
        profile={profile}
        isDialogOpen={open}
        onOpenDialog={handleOpenEditDialog}
      />
      <section className="feed">
        <div className="profileHeader">
          <div>
            <ArrowBack />
          </div>
          <div>
            <span>{profile.name}</span>
            <span>Posts</span>
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
            {isMe ? (
              <Button
                className="editProfile"
                onClick={() => handleOpenEditDialog(true)}
              >
                <span>Edit Profile</span>
              </Button>
            ) : (
              // to be implemented
              <Button className="editProfile">
                <span>Follow</span>
              </Button>
            )}
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
    </>
  );
};

export default Profile;
