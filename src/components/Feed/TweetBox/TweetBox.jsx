import React, { useEffect, useState } from "react";
import "./TweetBox.css";
import Avatar from "react-avatar";
import PhotoIcon from "../../icons/PhotoIcon";
import GifIcon from "../../icons/GifIcon";
import EmojiIcon from "../../icons/EmojiIcon";
import * as profileActions from "../../../redux/actions/profileActions";
import * as postActions from "../../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Box } from "@mui/system";
import { Grid, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const TweetBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileImg = useSelector((state) => state.user.profile.profileImg);
  const success = useSelector((state) => state.post.success);

  useEffect(() => {
    if (success) {
      dispatch(postActions.resetSuccess());
      dispatch(profileActions.fetchProfile());
    }
  }, [success, dispatch]);

  const [tweet, setTweet] = useState({
    message: " ",
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

  const tweetSubmit = (e) => {
    e.preventDefault();
    dispatch(postActions.addPost(tweet, profilePicUpload));
    // Workaround for bug in feed after adding a post

    setTweet("");
    setProfilePicUpload(null);
    setCurrentImage("");
    dispatch(postActions.resetSuccess());
    navigate("/home");
  };
  return (
    <>
      <form className="tweetbox" onSubmit={(e) => tweetSubmit(e)}>
        <div className="tweetboxRow">
          <div className="tweetboxUserIcon">
            <Avatar round={true} size={40} />
          </div>
          <div className="tweetbox-input-row">
            <input
              value={tweet.message}
              onChange={(e) => setTweet({ ...tweet, message: e.target.value })}
              className="tweetbox-input"
              placeholder="What's happening?"
              type="text"
              style={{ outline: "none" }}
            />
          </div>
          {currentImage === "" ? (
            <div></div>
          ) : (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
              marginLeft={5}
            >
              <img
                src={currentImage}
                alt="no picture"
                height={100}
                width={100}
              ></img>
              <Grid>
                <IconButton onClick={() => setCurrentImage("")}>
                  <Close />
                </IconButton>
              </Grid>
            </Box>
          )}
        </div>
        <div className="tweetboxRow">
          <div style={{ flex: 0.1 }}></div>
          <div className="tweetboxOptions">
            <label htmlFor="profilePicInput">
              <AddPhotoAlternateIcon
                className="tweetboxOptionIcon"
                width={25}
                height={25}
                sx={{ fill: "var(--blue)", mt: 0.5, cursor: "pointer" }}
              />
              <input
                id="profilePicInput"
                onChange={uploadImage}
                type="file"
                style={{ display: "none" }}
              />
            </label>
            <GifIcon className="tweetboxOptionIcon" width={22} height={22} />
            {!emojiPicker ? (
              <EmojiIcon
                className="tweetboxOptionIcon"
                width={22}
                height={22}
                onClick={() => setEmojiPicker((prev) => !prev)}
              />
            ) : (
              <>
                <EmojiIcon
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
                  height={400}
                  width="60%"
                />
              </>
            )}
            <button
              type="submit"
              className="tweetbox-button tweetboxOptionIcon"
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
