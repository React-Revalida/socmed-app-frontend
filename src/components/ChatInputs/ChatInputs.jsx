import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { EmojiIcon, GifIcon, PhotoIcon, SendIcon } from "../icons";
import "./ChatInputs.css";

const ChatInputs = ({ onChange, onClick, value }) => {
  var fromto = useLocation().pathname.split("/")[2];
  const [isFocus, setIsFocus] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const dispatch = useDispatch();
  return (
    <div className="chatInputs">
      <div
        className={
          isFocus ? "chatTextInput chatTextInputFocus" : "chatTextInput"
        }
      >
        <input
          type="text"
          placeholder="Start a new message"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={value}
          onChange={onChange}
        />
        <EmojiIcon />
      </div>
      <div onClick={onClick}>
        <SendIcon />
      </div>
    </div>
  );
};

export default ChatInputs;
