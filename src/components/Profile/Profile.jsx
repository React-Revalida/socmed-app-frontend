import React, { useEffect } from "react";
import "./Profile.css";
import BottomSidebar from "../../components/BottomSidebar/BottomSidebar";
import Post from "../../components/Feed/Post/Post";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "@mui/icons-material/ArrowBackIosNew";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Avatar from "react-avatar";
import Loading from "../../components/Loading/Loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as profileActions from "../../redux/actions/profileActions";
import * as postActions from "../../redux/actions/postActions";
import * as followActions from "../../redux/actions/followActions";
import Widgets from "../../components/Widgets/Widgets";
import ProfileEditForm from "../../components/Profile/ProfileEditForm";
import { CardActionArea } from "@mui/material";
import FollowsModal from "./FollowsModal";

const Profile = () => {
  const [category, setCategory] = React.useState(1);
  const [followTab, setFollowTab] = React.useState(1);
  const [posts, setPosts] = React.useState([]);
  const [isMe, setIsMe] = React.useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpenEditDialog = (isOpen) => {
    setOpen(isOpen);
  };

  const [openFollows, setOpenFollows] = React.useState(false);
  const handleOpenFollowsDialog = (isOpen) => {
    setOpenFollows(isOpen);
  };

  const profile = useSelector((state) => state.user.profile);

  const dispatch = useDispatch();
  useEffect(() => {
    if (params.username) {
      dispatch(profileActions.fetchOtherProfile(params.username));
      dispatch(postActions.fetchUserPosts(params.username));
      dispatch(followActions.getUserFollowers(params.username));
      dispatch(followActions.getUserFollowing(params.username));
      setIsMe(false);
    } else {
      dispatch(profileActions.fetchProfile());
      dispatch(postActions.fetchUserPosts(profile.username));
      dispatch(followActions.getUserFollowers(profile.username));
      dispatch(followActions.getUserFollowing(profile.username));
      setIsMe(true);
    }
  }, [params, dispatch]);

  const userPosts = useSelector((state) => state.post.userPosts);
  const loading = useSelector((state) => state.post.loading);

  const followers = useSelector((state) => state.follow.followers);
  const following = useSelector((state) => state.follow.following);
  console.log(loading, userPosts);

  return (
    <>
      <ProfileEditForm
        profile={profile}
        isDialogOpen={open}
        onOpenDialog={handleOpenEditDialog}
      />
      <FollowsModal
        isDialogOpen={openFollows}
        onOpenDialog={handleOpenFollowsDialog}
        followTab={followTab}
        data={followTab === 1 ? following : followers}
      />
      <section className="feed">
        <div className="profileHeader">
          <div>
            <BackIcon />
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
            <span
              className={followTab === 1 && "followTabActive"}
              onClick={() => {
                handleOpenFollowsDialog(true);
                setFollowTab(1);
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <span>{profile.following}</span>
              <span>Following</span>
            </span>
            <span
              className={followTab === 2 && "followTabActive"}
              onClick={() => {
                handleOpenFollowsDialog(true);
                setFollowTab(2);
              }}
              style={{
                cursor: "pointer",
              }}
            >
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
          {loading === false ? (
            userPosts.map((post) => (
              <CardActionArea
                onClick={() => [
                  navigate(`/post/${post.postId}`),
                  dispatch(postActions.resetLoading()),
                ]}
              >
                <Post key={post.postId} post={post} />
              </CardActionArea>
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
