import React, { useEffect, useState } from "react";
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
import FollowsModal from "../../components/Profile/FollowsModal";

const Profile = () => {
  const [category, setCategory] = React.useState(1);
  const [followTab, setFollowTab] = React.useState(1);
  const [userFollowed, setUserFollowed] = React.useState(false);
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

  const checkIfUserFollowed = (username) => {
    loggedInUserFollowing.map((user) => {
      if (user.username == username) {
        console.log(user.username);
        setUserFollowed(true);
      }
    });
  };

  const handleToggleFollow = () => {
    if (userFollowed) {
      dispatch(followActions.unfollowUser(params.username));
    } else {
      dispatch(followActions.followUser(params.username));
    }
    setUserFollowed(!userFollowed);
  };

  const dispatch = useDispatch();

  const selectLoading = useSelector((state) => state.post.loading);
  const [loading, setLoading] = useState(selectLoading);

  const selectUserPosts = useSelector((state) => state.post.userPosts);
  const [userPosts, setUserPosts] = useState(selectUserPosts);

  const selectLoggedInUserFollowing = useSelector(
    (state) => state.follow.loggedInUserFollowing
  );
  const [loggedInUserFollowing, setLoggedInUserFollowing] = useState(
    selectLoggedInUserFollowing
  );

  const selectFollowers = useSelector((state) => state.follow.followers);
  const [followers, setFollowers] = useState(selectFollowers);

  const selectFollowing = useSelector((state) => state.follow.following);
  const [following, setFollowing] = useState(selectFollowing);

  const selectProfile = useSelector((state) => state.user.profile);
  const selectOtherProfile = useSelector((state) => state.user.otherProfile);
  const [profile, setProfile] = useState(selectProfile);

  useEffect(() => {
    if (params.username) {
      dispatch(profileActions.fetchOtherProfile(params.username));
      dispatch(postActions.fetchUserPosts(params.username));
      dispatch(followActions.getUserFollowers(params.username));
      dispatch(followActions.getUserFollowing(params.username));
    } else {
      dispatch(profileActions.fetchProfile());
      dispatch(postActions.fetchUserPosts(profile.username));
      dispatch(followActions.getUserFollowers(profile.username));
      dispatch(followActions.getUserFollowing(profile.username));
      dispatch(followActions.getLoggedInUserFollowing(profile.username));
    }
  }, [params, dispatch, profile.username]);

  useEffect(() => {
    if (params.username) {
      setProfile(selectOtherProfile);
      setUserPosts(selectUserPosts);
      setFollowers(selectFollowers);
      setFollowing(selectFollowing);
      setIsMe(false);
      checkIfUserFollowed(params.username);
    } else {
      setProfile(selectProfile);
      setUserPosts(selectUserPosts);
      setFollowers(selectFollowers);
      setFollowing(selectFollowing);
      setLoggedInUserFollowing(selectLoggedInUserFollowing);
      setIsMe(true);
    }
  }, [
    params.username,
    selectProfile,
    selectOtherProfile,
    selectUserPosts,
    selectFollowers,
    selectFollowing,
    selectLoggedInUserFollowing,
  ]);

  useEffect(() => {
    setLoading(selectLoading);
  }, [selectLoading]);

  const handleDeletePost = (postId) => {
    dispatch(postActions.deletePost(postId));
    dispatch(postActions.resetSuccess());
  };

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
            <BackIcon
              onClick={() => navigate("/home")}
              sx={{ "&:hover": { cursor: "pointer" } }}
            />
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
            {isMe ? (
              <div
                className="editProfile"
                onClick={() => handleOpenEditDialog(true)}
              >
                <span>Edit Profile</span>
              </div>
            ) : (
              <div className="followBtn" onClick={() => handleToggleFollow()}>
                <span>{userFollowed ? "Following" : "Follow"}</span>
              </div>
            )}
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
              <>
                <Post
                  key={post.postId}
                  post={post}
                  from={"profile"}
                  onDelete={handleDeletePost}
                />
              </>
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
