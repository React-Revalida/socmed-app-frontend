import "../styles/Widget.css";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const Widget = () => {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__SearchIcon" />
        <input placeholder="Search OnlyPosts" type="text" />
      </div>
      <div className="widgets__widgetContainer">
        <h2>Whats'happening</h2>
        <TwitterTweetEmbed tweetId={"1508838714180612100"} />

        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="reactjs"
          options={{ height: 400 }}
        />

        {/* <TwitterShareButton
          url={"https://facebook.com/akkyProjects"}
          options={{
            text: "Subscribe my Youtube Channel #CodeWithAkky",
            via: "akkyProjects",
          }}
        /> */}
      </div>
    </div>
  );
};

export default Widget;
