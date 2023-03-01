import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatInputs from "../ChatInputs/ChatInputs";
import FromMessage from "../FromMessage/FromMessage";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BackIcon from "@mui/icons-material/ArrowBackIosNew";
import MyMessage from "../MyMessage/MyMessage";
import "./Chat.css";
import Loading from "../Loading/Loading";
import Avatar from "react-avatar";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import "../ChatInputs/ChatInputs.css";
import { chatURI, getMessages } from "../../services/chat";
import * as chatActions from "../../redux/actions/chatActions";
import { useDispatch, useSelector } from "react-redux";
var stompClient = null;
const Chat = ({ messages, username2Chat, profile }) => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [receiver, setReceiver] = useState("");
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
      const messageid = id.split("/")[2];
      setUserData({
        ...userData,
        username: profile.username,
        receivername: messageid,
      });
      if (!privateChats.has(messageid)) {
        privateChats.set(messageid, []);
        setPrivateChats(new Map(privateChats));
      }
      setReceiver(messageid);
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

  const connect = () => {
    let Sock = new SockJS(chatURI);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const dispatch = useDispatch();
  const selectChatMessages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    if (userData.username && !userData.connected) {
      connect();
    }
  }, [userData.username]);

  useEffect(() => {
    if (userData.username && !userData.connected) {
      dispatch(chatActions.getMessages(userData.username, userData.receivername));
      loadMessages();
    }
  }, [userData.connected, userData.receivername, selectChatMessages]);

  useEffect(() => {
    if (userData.connected) {
      privateChats.set(userData.receivername, selectChatMessages);
      setPrivateChats(new Map(privateChats));
    }
  }, [selectChatMessages]);

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    userJoin();
    loadMessages();
  };

  const loadMessages = () => {
    const messages = privateChats.get(userData.receivername);
    if (messages.length === 0) {
      privateChats.set(userData.receivername, selectChatMessages);
      setPrivateChats(new Map(privateChats));
    }
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
                <CalendarMonthIcon />
                Joined {user.dateJoined}
              </span>
            </div>
            <div className="chatMessages">
              {privateChats.get(receiver) &&
                [...privateChats.get(receiver)].map((chat, index) => (
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
            <ChatInputs
              onChange={handleMessage}
              value={userData.message}
              onClick={sendPrivateValue}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
