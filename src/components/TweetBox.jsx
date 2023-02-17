import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import "../styles/TweetBox.css";
import EmojiPicker from "emoji-picker-react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const TweetBox = () => {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const sendTweet = (e) => {
    // e.preventDefault();
    // db.collection('posts').add({
    //     displayName : "CodeWithAkky",
    //     username: "akky_im",
    //     verified: true,
    //     text: tweetMessage,
    //     image: tweetImage,
    //     avatar: "https://pbs.twimg.com/profile_images/1266938830608875520/f-eajIjB_400x400.jpg"
    // })
    // setTweetMessage("")
    // setTweetImage("")
  };

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emojiPicker, setEmojiPicker] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    console.log(emojiObject);
  };
  return (
    <>
      <div className="tweetBox emoji">
        <form>
          <div className="tweetBox__input">
            <Avatar src="https://pbs.twimg.com/profile_images/1266938830608875520/f-eajIjB_400x400.jpg" />
            <input
              onChange={(e) => setTweetMessage(e.target.value)}
              value={tweetMessage}
              placeholder="What's happening"
              type="text"
            />
          </div>
          <input
            onChange={(e) => setTweetImage(e.target.value)}
            value={tweetImage}
            className="tweetBox__imageInput"
            placeholder="Optional : Enter Image URL"
            type="text"
          />
          {/* <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={10}> */}
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
                  setTweetMessage((tweetMessage) => tweetMessage + e.emoji)
                }
                height={400}
                width="60%"
              />
            </>
          )}
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
