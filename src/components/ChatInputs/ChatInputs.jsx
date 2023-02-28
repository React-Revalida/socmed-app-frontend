import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { EmojiIcon, SendIcon } from "../icons";
import "./ChatInputs.css";

const ChatInputs = ({ onChange, onClick, value }) => {
  const [isFocus, setIsFocus] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && message.trim()) {
      onClick();
    }
  };

  const handleSubmit = () => {
    if (message.trim()) {
      onClick();
    }
  };

  useEffect(() => {
    setMessage(value);
  }, [value]);

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
          onKeyDown={handleKeyDown}
          value={value}
          onChange={onChange}
        />
        <EmojiIcon />
      </div>
      <IconButton onClick={handleSubmit} disabled={!message.trim()}>
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default ChatInputs;
