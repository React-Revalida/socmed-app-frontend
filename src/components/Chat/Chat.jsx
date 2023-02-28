import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatInputs from "../ChatInputs/ChatInputs";
import FromMessage from "../FromMessage/FromMessage";
import { InfoIcon, CalenderIcon, SendIcon } from "../icons";
import BackIcon from "@mui/icons-material/ArrowBackIosNew";
import MyMessage from "../MyMessage/MyMessage";
import "./Chat.css";
import Loading from "../Loading/Loading";
import Avatar from "react-avatar";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import "../ChatInputs/ChatInputs.css";
var stompClient = null;
const Chat = ({ messages, username2Chat, profile }) => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState("");
  const [isFocus, setIsFocus] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });
  const [user, setUser] = React.useState({
    profilePic: "",
    name: "",
    username: "",
    bio: "",
    following: "",
    followers: "",
    dateJoined: "",
  });
  var id = useLocation().pathname;

  const navigate = useNavigate();
  useEffect(() => {
    if (username2Chat) {
      setUser({
        profilePic: username2Chat.profilePic,
        name: username2Chat.name,
        username: username2Chat.username,
        bio: username2Chat.bio,
        following: username2Chat.following,
        followers: username2Chat.followers,
        dateJoined: username2Chat.dateJoined,
      });
    } else {
      navigate("/messages");
    }
  }, [username2Chat]);

  useEffect(() => {
    if (id) {
      let messageid = id.split("/")[2];
      setUserData({
        ...userData,
        username: profile.username,
        receivername: messageid,
      });
      if (!privateChats.has(messageid)) {
        privateChats.set(messageid, []);
        setPrivateChats(new Map(privateChats));
      }
      setTab(messageid);
    }
  }, [id]);

  useEffect(() => {
    if (profile.username) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        username: profile.username,
      }));
    }
  }, [profile.username]);

  useEffect(() => {
    if (userData.username && !userData.connected) {
      connect();
    }
  }, [userData.username, userData.connected]);

  const connect = () => {
    let Sock = new SockJS("http://localhost:8085/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      default:
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
    }
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err) => {
    alert(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: userData.receivername,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.username !== userData.receivername) {
        privateChats.get(userData.receivername).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <div className="chat">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="chatHeader">
            <div onClick={() => navigate("/messages")}>
              <BackIcon />
            </div>
            <Avatar src={user && user.profilePic} size={40} round={true} />
            <div>
              <span>{user && user.name}</span>
              <span>@{user && user.username}</span>
            </div>
          </div>
          <div className="chatRoom">
            <div className="chatInfo">
              <div>
                <span>{user.name}</span>
                <span>@{user.username}</span>
              </div>
              <span>{user.bio}</span>
              <div>
                <span>
                  <span>{user.following}</span>
                  <span>Following</span>
                </span>
                <span>
                  <span>{user.followers}</span>
                  <span>Followers</span>
                </span>
              </div>
              <span>
                <CalenderIcon />
                Joined {user.dateJoined}
              </span>
            </div>
            <div className="chatMessages">
              {privateChats.get(tab) &&
                [...privateChats.get(tab)].map((chat, index) => (
                  <Fragment key={index}>
                    {chat.senderName !== userData.username && (
                      <FromMessage
                        message={chat.message}
                        userimage={user.profilePic}
                      />
                    )}
                    {chat.senderName === userData.username && (
                      <MyMessage message={chat.message} />
                    )}
                  </Fragment>
                ))}
            </div>
            <ChatInputs onChange={handleMessage} value={userData.message} onClick={sendPrivateValue} />
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
