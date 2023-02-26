import Avatar from "react-avatar";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import BottomSidebar from "../../components/BottomSidebar/BottomSidebar";
import Chat from "../../components/Chat/Chat";
import DrawerBar from "../../components/DrawerBar/DrawerBar";
import HomeBox from "../../components/HomeBox/HomeBox";
import { MessagesIcon } from "../../components/icons";
import LastChat from "../../components/LastChat/LastChat";
import SearchInput from "../../components/Widgets/SearchInput/SearchInput";
import "./Messages.css";

const Messages = () => {
  const [isDrawerBar, setIsDrawerBar] = React.useState(false);
  const [messages, setMessages] = React.useState([
    {
      fromto: "user1-user2",
      messages: [
        {
          from: "user1",
          message: "Hello World",
          time: "12:00",
        },
      ],
    },
  ]);
  const [users, setUsers] = React.useState([
    {
      username: "user1",
      displayName: "User 1",
      userimage:
        "https://avatars.githubusercontent.com/u/38807255?s=460&u=deb087d587be7f6a4000e4e710ec4d1daa6fde84&v=4",
      joinMonth: "Jan",
      joinYear: "2021",
    },
    {
      username: "user2",
      displayName: "User 2",
      userimage:
        "https://avatars.githubusercontent.com/u/38807255?s=460&u=deb087d587be7f6a4000e4e710ec4d1daa6fde84&v=4",
      joinMonth: "Jan",
      joinYear: "2021",
    },
  ]);
  let path = useLocation().pathname;
  document.title = "Messages / Twitter";

  return (
    <>
      <div className={`messages ${path !== "/Messages" && "messagesNone"}`}>
        {isDrawerBar && (
          <div
            onClick={() => setIsDrawerBar(false)}
            className="drawerBarPanel"
          />
        )}
        <DrawerBar active={isDrawerBar} />
        <div className="messagesHeader">
          <div onClick={() => setIsDrawerBar(true)}>
            <Avatar
              round={true}
              size={40}
              src="https://avatars.githubusercontent.com/u/38807255?s=460&u=deb087d587be7f6a4000e4e710ec4d1daa6fde84&v=4"
            />
          </div>
          <span>&nbsp;Messages</span>
          <MessagesIcon />
        </div>
        <div className="messagesSearchInput">
          <SearchInput placeholder="Search for people and groups" />
        </div>
        <div className="lastMessages">
          {messages.map((message) => {
            let user = users.find(
              (user) => user.username === message.fromto.split("-")[1]
            );
            return (
              <LastChat
                username={user.username}
                displayName={user.displayName}
                datetime={user.joinMonth + " " + user.joinYear}
                userimage={user.userimage}
                lastMessage={message.messages.slice(-1)[0].message}
                verified={true}
              />
            );
          })}
        </div>
        <BottomSidebar />
      </div>
      {path === "/messages" ? (
        <h1>Walang Message</h1>
      ) : (
        <Chat messages={messages} users={users} />
      )}
    </>
  );
};

export default Messages;
