import React, { useEffect, useState } from "react";
import "./CommentBox.css";
import Avatar from "react-avatar";
// import GifIcon from "../../icons/GifIcon";
// import EmojiIcon from "../../icons/EmojiIcon";
import * as profileActions from "../../../redux/actions/profileActions";
import * as commentActions from "../../../redux/actions/commentActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box } from "@mui/system";
import { Grid, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

const CommentBox = ({ postUser, pid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileImg = useSelector((state) => state.user.profile.profilePic);
  const name = useSelector(
    (state) => state.user.profile.firstname + " " + state.user.profile.lastname
  );
  const usern = useSelector((state) => state.user.profile.username);
  const uid = useSelector((state) => state.user.profile.userId);
  const success = useSelector((state) => state.post.success);

  useEffect(() => {
    if (success) {
      // dispatch(postActions.resetSuccess());
      // dispatch(profileActions.fetchProfile());
    }
  }, [success, dispatch]);

  const [tweet, setTweet] = useState({
    message: "",
  });

  const [profilePicUpload, setProfilePicUpload] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(null);

  const uploadImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setProfilePicUpload(file);
    const reader = new FileReader();
    reader.onload = () => {
      setCurrentImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const today = new Date();
  const whosPost = postUser.username === usern ? "you" : postUser.username;
  const tweetSubmit = (e) => {
    e.preventDefault();
    const user = { userId: uid, username: usern };
    const comment = {
      message: tweet.message,
      timestamp: today.toLocaleString("en-US"),
      post: pid,
      user,
    };
    dispatch(commentActions.commentPost(comment, pid));
    console.log(comment);
    // dispatch(postActions.addPost(tweet, profilePicUpload));
    // setTweet({ ...tweet, message: "" });
    // setProfilePicUpload(null);
    // setCurrentImage("");
    // dispatch(postActions.resetSuccess());
  };
  return (
    <>
      <form className="commentBox" onSubmit={(e) => tweetSubmit(e)}>
        <div className="tweetboxRow">
          <div className="tweetboxUserIcon">
            <Avatar round={true} size={40} src={profileImg} name={name} />
          </div>
          <div className="tweetbox-input-row">
            <textarea
              className="tweetbox-input"
              rows={2}
              cols={5}
              value={tweet.message}
              onChange={(e) => setTweet({ ...tweet, message: e.target.value })}
              placeholder={"Replying to @" + whosPost}
              style={{ height: "auto" }}
            />
          </div>
        </div>

        <div className="tweetboxRow">
          <div style={{ flex: 0.1 }}></div>
          <div className="tweetboxOptions">
            <button
              type="submit"
              className="tweetbox-button tweetboxOptionIcon"
              style={{ cursor: "pointer", fontFamily: "Poppins" }}
            >
              Reply
            </button>
          </div>
        </div>
      </form>
      <div className="bottomBorder"></div>
    </>
  );
};

export default CommentBox;
