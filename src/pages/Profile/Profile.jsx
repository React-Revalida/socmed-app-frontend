import React, { useEffect, useState } from "react";
import "./Profile.css";
import BottomSidebar from "../../components/BottomSidebar/BottomSidebar";
import Post from "../../components/Feed/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "@mui/icons-material/ArrowBackIosNew";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Avatar from "react-avatar";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import * as profileActions from "../../redux/actions/profileActions";
import Widgets from "../../components/Widgets/Widgets";
import ProfileEditForm from "../../components/Profile/ProfileEditForm";

const Profile = () => {
  const [category, setCategory] = React.useState(1);
  const [posts, setPosts] = React.useState([]);
  const [isMe, setIsMe] = React.useState(false);
  const params = useParams();
  const [loading, setLoading] = React.useState(true);

  const [open, setOpen] = React.useState(false);
  const handleOpenEditDialog = (isOpen) => {
    setOpen(isOpen);
  };

  const dispatch = useDispatch();
  
  const selectProfile = useSelector((state) => state.user.profile);
  const selectOtherProfile = useSelector((state) => state.user.otherProfile);
  const [profile, setProfile] = useState(selectProfile);

  useEffect(() => {
    if (params.username) {
      dispatch(profileActions.fetchOtherProfile(params.username));
      setProfile(selectOtherProfile);
      setIsMe(false);
    } else {
      dispatch(profileActions.fetchProfile());
      setProfile(selectProfile);
      setIsMe(true);
    }
  }, [params, dispatch, selectProfile, selectOtherProfile]);

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
            <BackIcon />
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
                size={134}
              />
            </div>
            <div
              className="editProfile"
              onClick={() => handleOpenEditDialog(true)}
            >
              <span>Edit Profile</span>
            </div>
          </div>
          <div className="profileBiography">
            <span>{profile.name}</span>
            <span>{profile.email}</span>
            <span>{profile.bio}</span>
            <span>
              <ScheduleIcon />
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
          <div className="profileCategory">
            <div
              className={category === 1 && "profileCategoryActive"}
              onClick={() => setCategory(1)}
            >
              <span>Posts</span>
            </div>
            <div
              className={category === 2 && "profileCategoryActive"}
              onClick={() => setCategory(2)}
            >
              <span>Liked Posts</span>
            </div>
          </div>
        </div>
        <article className="profilePosts">
          {!loading ? (
            posts.map((post) => (
              <Post
                key={post.id}
                username={post.username}
                userimage={post.userimage}
                date={post.date}
                displayName={post.displayName}
                text={post.text}
                shareImage={post.shareImage}
              />
            ))
          ) : (
            <Loading />
          )}
        </article>
        <BottomSidebar />
      </section>
      <Widgets />
    </>
  );
};

export default Profile;
