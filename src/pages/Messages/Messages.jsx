import Avatar from "react-avatar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import BottomSidebar from "../../components/BottomSidebar/BottomSidebar";
import Chat from "../../components/Chat/Chat";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LastChat from "../../components/LastChat/LastChat";
import SearchInput from "../../components/Widgets/SearchInput/SearchInput";
import "./Messages.css";
import NotSelectedMessage from "../../components/NotSelectedMessage/NotSelectedMessage";
import * as chatActions from "../../redux/actions/chatActions";
import * as profileActions from "../../redux/actions/profileActions";
const Messages = () => {
  document.title = "Messages";
  const dispatch = useDispatch();

  const selectMutuals = useSelector((state) => state.mutuals.mutuals);
  const selectProfile = useSelector((state) => state.user.profile);
  const [mutuals, setMutuals] = React.useState([]);
  const [profile, setProfile] = React.useState(selectProfile);

  useEffect(() => {
    dispatch(chatActions.getMutualFollows());
    dispatch(profileActions.fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    setMutuals(selectMutuals);
    setProfile(selectProfile);
  }, [selectMutuals, selectProfile]);

  const [isDrawerBar, setIsDrawerBar] = React.useState(false);
  const [messages, setMessages] = React.useState([]);

  let path = useLocation().pathname;
  const [username2Chat, setUsername2Chat] = React.useState();

  const handleGetUsername2Chat = (username) => {
    let mutual = mutuals.find((mutual) => mutual.username === username);
    setUsername2Chat(mutual);
  };

  let id = useLocation().pathname;
  React.useEffect(() => {
    if (id) {
      let messageid = id.split("/")[2];
      let mutual = mutuals.find((mutual) => mutual.username === messageid);
      setUsername2Chat(mutual);
    }
  }, [id, mutuals]);

  return (
    <>
      <div className={`messages ${path !== "/messages" && "messagesNone"}`}>
        <div className="messagesHeader">
          <span>&nbsp;Messages</span>
          <QuestionAnswerIcon />
        </div>
        {/* <div className="messagesSearchInput">
          <SearchInput placeholder="Search for people and groups" />
        </div> */}
        <div className="lastMessages">
          {mutuals.map((mutual) => {
            return (
              <LastChat
                key={mutual.userId}
                username={mutual.username}
                displayName={mutual.name}
                datetime={mutual.dateJoined}
                userimage={mutual.profilePic}
                onChoose={handleGetUsername2Chat}
              />
            );
          })}
        </div>
        <BottomSidebar />
      </div>
      {path === "/messages" ? (
        <NotSelectedMessage />
      ) : (
        <Chat
          messages={messages}
          profile={profile}
          username2Chat={username2Chat}
        />
      )}
    </>
  );
};

export default Messages;
