import Avatar from "react-avatar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import BottomSidebar from "../../components/BottomSidebar/BottomSidebar";
import Chat from "../../components/Chat/Chat";
import DrawerBar from "../../components/DrawerBar/DrawerBar";
import { MessagesIcon } from "../../components/icons";
import LastChat from "../../components/LastChat/LastChat";
import SearchInput from "../../components/Widgets/SearchInput/SearchInput";
import "./Messages.css";
import NotSelectedMessage from "../../components/NotSelectedMessage/NotSelectedMessage";
import * as chatActions from "../../redux/actions/chatActions";
const Messages = () => {
  document.title = "Messages";
  const dispatch = useDispatch();

  const selectMutuals = useSelector((state) => state.mutuals.mutuals);
  const profile = useSelector((state) => state.user.profile);
  const [mutuals, setMutuals] = React.useState([]);

  useEffect(() => {
    dispatch(chatActions.getMutualFollows());
  }, [dispatch]);

  useEffect(() => {
    setMutuals(selectMutuals);
    console.log(selectMutuals);
  }, [selectMutuals, mutuals]);

  const [isDrawerBar, setIsDrawerBar] = React.useState(false);
  const [messages, setMessages] = React.useState([]);

  let path = useLocation().pathname;

  return (
    <>
      <div className={`messages ${path !== "/messages" && "messagesNone"}`}>
        {isDrawerBar && (
          <div
            onClick={() => setIsDrawerBar(false)}
            className="drawerBarPanel"
          />
        )}
        <DrawerBar active={isDrawerBar} />
        <div className="messagesHeader">
          <div onClick={() => setIsDrawerBar(true)}>
            <Avatar round={true} size={40} src={profile.profilePic} />
          </div>
          <span>&nbsp;Messages</span>
          <MessagesIcon />
        </div>
        <div className="messagesSearchInput">
          <SearchInput placeholder="Search for people and groups" />
        </div>
        <div className="lastMessages">
          {mutuals.map((mutual) => {
            return (
              <LastChat
                key={mutual.userId}
                username={mutual.username}
                displayName={mutual.name}
                datetime={mutual.dateJoined}
                userimage={mutual.profilePic}
              />
            );
          })}
        </div>
        <BottomSidebar />
      </div>
      {path === "/messages" ? (
        <NotSelectedMessage />
      ) : (
        <Chat messages={messages} mutuals={mutuals} />
      )}
    </>
  );
};

export default Messages;
