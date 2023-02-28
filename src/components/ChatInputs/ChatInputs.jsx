import { IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { EmojiIcon, SendIcon } from "../icons";
import "./ChatInputs.css";
import EmojiPicker from "emoji-picker-react";

const ChatInputs = ({ onChange, onClick, value }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && message) {
      onClick();
    }
  };

  const handleSubmit = () => {
    if (message) {
      onClick();
    }
  };

  const handleSelectEmoji = (emoji) => {
    const newMessage = message + emoji.emoji;
    setMessage(newMessage);
    onChange({ target: { value: newMessage } });
  };

  useEffect(() => {
    setMessage(value);
  }, [value]);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleDocumentClick = (e) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
      setShowPicker(false);
    }
  };
  return (
    <>
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
            value={message}
            onChange={onChange}
          />
          <EmojiIcon
            onClick={(e) => {
              e.stopPropagation();
              setShowPicker(!showPicker);
            }}
          />
        </div>
        <IconButton onClick={handleSubmit} disabled={!message.trim()}>
          <SendIcon />
        </IconButton>
      </div>
      {showPicker && (
        <div className="emojiPicker" ref={emojiPickerRef}>
          <EmojiPicker
            onEmojiClick={handleSelectEmoji}
            disableSearchBar
            disableSkinTonePicker
          />
        </div>
      )}
    </>
  );
};

export default ChatInputs;
