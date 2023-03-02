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
import { Button, Grid, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import Joi from "joi";

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

  const postSchema = Joi.object({
    message: Joi.string().max(200).required(),
  });

  const [postFieldErrors, setPostFieldErrors] = useState({});

  const handleMessageChange = ({ currentTarget: input }) => {
    setTweet({ ...tweet, [input.name]: input.value });

    const { error } = postSchema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      setPostFieldErrors({
        ...postFieldErrors,
        [input.name]: error.details[0].message,
      });
    } else {
      delete postSchema[input.name];
      setPostFieldErrors({ ...postFieldErrors, [input.name]: "" });
    }
  };

  const isFormInvalid = () => {
    let result = postSchema.validate(tweet);
    return !!result.error;
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
              name="message"
              value={tweet.message}
              onChange={handleMessageChange}
              placeholder={`What's your tea ${name}?`}
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
                    onClick={() => [
                      setPostImage(""),
                      setProfilePicUpload(null),
                    ]}
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
                width={25}
                height={25}
                sx={{ fill: "var(--twitter-color)", mt: 1.3 }}
                onClick={() => setEmojiPicker((prev) => !prev)}
              />
            ) : (
              <>
                <EmojiEmotionsIcon
                  className="tweetboxOptionIcon"
                  width={25}
                  height={25}
                  sx={{ fill: "var(--twitter-color)", mt: 1.3 }}
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
            <Button
              type="submit"
              variant={isFormInvalid() ? "outlined" : "contained"}
              sx={
                isFormInvalid()
                  ? {
                      borderColor: "var(--twitter-color)",
                      color: "var(--twitter-color)",
                      borderRadius: 8,
                      ml: 38,
                      mt: 1,
                      textTransform: "none",
                      fontFamily: "Poppins",
                      "&:hover": {
                        cursor: "default",
                        borderColor: "var(--twitter-color)",
                      },
                    }
                  : {
                      backgroundColor: "var(--twitter-color)",
                      borderRadius: 8,
                      ml: 38,
                      mt: 1,
                      textTransform: "none",
                      fontFamily: "Poppins",
                      "&:hover": {
                        backgroundColor: "var(--twitter-color)",
                        boxShadow: 3,
                      },
                    }
              }
              // disabled={isFormInvalid()}
            >
              Spill
            </Button>
          </div>
        </div>
      </form>
      <div className="bottomBorder"></div>
    </>
  );
};

export default TweetBox;
