import React, { useEffect, useState } from "react";
import "./PostBox.css";
import Avatar from "react-avatar";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import * as profileActions from "../../../redux/actions/profileActions";
import * as postActions from "../../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box } from "@mui/system";
import { Grid, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

const TweetBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileImg = useSelector((state) => state.user.profile.profilePic);
  const name = useSelector(
    (state) => state.user.profile.firstname + " " + state.user.profile.lastname
  );
  const success = useSelector((state) => state.post.success);

  useEffect(() => {
    if (success) {
      dispatch(postActions.resetSuccess());
      dispatch(profileActions.fetchProfile());
    }
  }, [success, dispatch]);

  const [tweet, setTweet] = useState({
    message: "",
  });

  const [profilePicUpload, setProfilePicUpload] = useState(null);
  const [postImage, setPostImage] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(null);

  const uploadImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setProfilePicUpload(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPostImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const tweetSubmit = (e) => {
    e.preventDefault();
    dispatch(postActions.addPost(tweet, profilePicUpload));
    setTweet({ ...tweet, message: "" });
    setProfilePicUpload(null);
    setPostImage("");
    dispatch(postActions.resetSuccess());
  };
  return (
    <>
      <form className="tweetbox" onSubmit={(e) => tweetSubmit(e)}>
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
              placeholder="What's happening?"
              style={{ height: "auto" }}
            />
          </div>
        </div>
        {postImage === "" ? (
          <div></div>
        ) : (
          <div className="uploadImage">
            <div className="uploadedImage">
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
              >
                <img src={postImage} alt="no picture"></img>
                <div className="tweetboxOptions">
                  <Close
                    className="uploadedImage-closeButton"
                    onClick={() => setPostImage("")}
                  />
                </div>
              </Box>
            </div>
          </div>
        )}
        <div className="tweetboxRow">
          <div style={{ flex: 0.1 }}></div>
          <div className="tweetboxOptions">
            <label htmlFor="profilePicInput">
              <AddPhotoAlternateIcon
                className="tweetboxOptionIcon"
                sx={{ fill: "var(--twitter-color)" }}
              />
              <input
                id="profilePicInput"
                onChange={uploadImage}
                type="file"
                style={{ display: "none" }}
              />
            </label>
            {/* To be implemented <GifIcon className="tweetboxOptionIcon" width={22} height={22} /> */}
            {!emojiPicker ? (
              <EmojiEmotionsIcon
                className="tweetboxOptionIcon"
                width={22}
                height={22}
                onClick={() => setEmojiPicker((prev) => !prev)}
                sx={{ marginBottom: 0.5 }}
              />
            ) : (
              <>
                <EmojiEmotionsIcon
                  className="tweetboxOptionIcon"
                  width={22}
                  height={22}
                  onClick={() => setEmojiPicker((prev) => !prev)}
                />
                <EmojiPicker
                  // searchDisabled="true"
                  previewConfig={{ showPreview: false }}
                  // emojiStyle="google"
                  suggestedEmojisMode="recent"
                  onEmojiClick={(e) =>
                    setTweet({
                      ...tweet,
                      message: tweet.message + e.emoji,
                    })
                  }
                />
              </>
            )}
            <button
              type="submit"
              className="tweetbox-button tweetboxOptionIcon"
              style={{ cursor: "pointer" }}
            >
              Post
            </button>
          </div>
        </div>
      </form>
      <div className="bottomBorder"></div>
    </>
  );
};

export default TweetBox;
