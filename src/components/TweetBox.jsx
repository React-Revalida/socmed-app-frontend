import { Avatar, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../styles/TweetBox.css";
import EmojiPicker from "emoji-picker-react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../redux/actions/postActions";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";

const TweetBox = () => {
  const [newPost, setNewPost] = React.useState({
    message: "",
  });
  const [profilePicUpload, setProfilePicUpload] = useState(null);

  const [currentImage, setCurrentImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const success = useSelector((state) => state.post.success);

  useEffect(() => {
    if (success) {
      dispatch(postActions.resetSuccess());
    }
  }, [success, dispatch]);

  const sendTweet = (e) => {
    e.preventDefault();
    dispatch(postActions.addPost(newPost, profilePicUpload));

    // db.collection('posts').add({
    //     displayName : "CodeWithAkky",
    //     username: "akky_im",
    //     verified: true,
    //     text: tweetMessage,
    //     image: tweetImage,
    //     avatar: "https://pbs.twimg.com/profile_images/1266938830608875520/f-eajIjB_400x400.jpg"
    // })
    navigate("/");
  };

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

  const [emojiPicker, setEmojiPicker] = useState(null);

  return (
    <>
      <div className="tweetBox emoji">
        <form>
          <div className="tweetBox__input">
            <Avatar src="https://pbs.twimg.com/profile_images/1266938830608875520/f-eajIjB_400x400.jpg" />
            <input
              onChange={(e) =>
                setNewPost({ ...newPost, message: e.target.value })
              }
              value={newPost.message}
              placeholder="What's happening"
              type="text"
            />
          </div>
          {!emojiPicker ? (
            <InsertEmoticonIcon
              onClick={() => setEmojiPicker((prev) => !prev)}
            />
          ) : (
            <>
              <InsertEmoticonIcon
                onClick={() => setEmojiPicker((prev) => !prev)}
              />
              <EmojiPicker
                // searchDisabled="true"
                previewConfig={{ showPreview: false }}
                // emojiStyle="google"
                suggestedEmojisMode="recent"
                onEmojiClick={(e) =>
                  setNewPost({
                    ...newPost,
                    message: newPost.message + e.emoji,
                  })
                }
                height={400}
                width="60%"
              />
            </>
          )}

          {currentImage === "" ? (
            <input
              onChange={uploadImage}
              className="tweetBox__imageInput"
              placeholder="Optional : Enter Image URL"
              type="file"
            />
          ) : (
            <div className="tweetBox__imageInput">
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
                marginLeft={5}
              >
                <img src={currentImage} alt="no picture"></img>
                <Grid>
                  <IconButton onClick={() => setCurrentImage("")}>
                    <Close />
                  </IconButton>
                </Grid>
              </Box>
            </div>
          )}

          {/* <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={10}> */}

          {/* </Grid>
            <Grid item xs={2}> */}
          <Button onClick={sendTweet} className="tweetBox__tweetButton">
            Tweet
          </Button>
          {/* </Grid>
          </Grid> */}
        </form>
      </div>
    </>
  );
};

export default TweetBox;
