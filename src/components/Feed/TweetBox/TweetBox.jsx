import React, { useEffect, useState } from "react";
import "./TweetBox.css";
import Avatar from "react-avatar";
import PhotoIcon from "../../icons/PhotoIcon";
import GifIcon from "../../icons/GifIcon";
import EmojiIcon from "../../icons/EmojiIcon";
import * as profileActions from "../../../redux/actions/profileActions";
import { useDispatch, useSelector } from "react-redux";

const TweetBox = () => {
  const dispatch = useDispatch();
  const profileImg = useSelector((state) => state.user.profile.profileImg);

  useEffect(() => {
    dispatch(profileActions.fetchProfile());
  }, [dispatch]);

  const [tweet, setTweet] = useState({
    id: Date.now(),
    userimage: profileImg,
    username: "",
    displayName: "",
    text: "",
    shareImage: "",
    date: Date.now(),
  });

  const tweetSubmit = (e) => {
    e.preventDefault();
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
              value={tweet.text}
              onChange={(e) => setTweet({ ...tweet, text: e.target.value })}
              className="tweetbox-input"
              placeholder="What's happening?"
              type="text"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="tweetboxRow">
          <div style={{ flex: 0.1 }}></div>
          <div className="tweetboxOptions">
            <PhotoIcon className="tweetboxOptionIcon" width={22} height={22} />
            <GifIcon className="tweetboxOptionIcon" width={22} height={22} />
            <EmojiIcon className="tweetboxOptionIcon" width={22} height={22} />
            <button type="submit" className="tweetbox-button">
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
