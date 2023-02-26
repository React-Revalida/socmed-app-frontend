import React from "react";
import { useLocation } from "react-router-dom";
import ChatInputs from "../ChatInputs/ChatInputs";
import FromMessage from "../FromMessage/FromMessage";
import { InfoIcon, CalenderIcon } from "../icons";
import BackIcon from "@mui/icons-material/ArrowBackIosNew";
import MyMessage from "../MyMessage/MyMessage";
import "./Chat.css";
import Loading from "../Loading/Loading";
import Avatar from "react-avatar";

const Chat = ({ messages, users }) => {
  //let { id } = useParams();
  var id = useLocation().pathname;
  const [user, setUser] = React.useState({
    userimage: "",
    displayName: "",
    username: "",
    biograpfy: "",
    followingCount: "",
    followersCount: "",
    joinMonth: "",
    joinYear: "",
  });
  const [messagesData, setMessagesData] = React.useState(
  );

  const [loading, setLoading] = React.useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  React.useEffect(() => {
    if (id) {
      let userid = id.split("-")[1];
      let messageid = id.split("/")[2];
      setUser(users.find((user) => user.username === userid));
      // setMessagesData(
      //   messages.find((message) => message.fromto === messageid).messages
      // );
    }
  }, [id]);

  return (
    <div className="chat">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="chatHeader">
            <div>
              <BackIcon />
            </div>
            <Avatar src={user && user.userimage} size={40} round={true}/>
            <div>
              <span>{user && user.displayName}</span>
              <span>@{user && user.username}</span>
            </div>
            <InfoIcon />
          </div>
          <div className="chatRoom">
            <div className="chatInfo">
              <div>
                <span>{user.displayName}</span>
                <span>@{user.username}</span>
              </div>
              <span>{user.biograpfy}</span>
              <div>
                <span>
                  <span>{user.followingCount}</span>
                  <span>Following</span>
                </span>
                <span>
                  <span>{user.followersCount}</span>
                  <span>Followers</span>
                </span>
              </div>
              <span>
                <CalenderIcon />
                Joined {user.joinMonth} {user.joinYear}
              </span>
            </div>
            <div className="chatMessages">
              {messagesData &&
                messagesData.map((message) =>
                  message.from === "mucahitsahin6" ? (
                    <MyMessage message={message.message} />
                  ) : (
                    <FromMessage
                      message={message.message}
                      userimage={user.userimage}
                    />
                  )
                )}
            </div>
            <ChatInputs />
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
