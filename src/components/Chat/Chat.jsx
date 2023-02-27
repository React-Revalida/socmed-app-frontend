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

const Chat = ({ messages, mutuals }) => {
  //let { id } = useParams();
  var id = useLocation().pathname;
  const [user, setUser] = React.useState({
    profilePic: "",
    name: "",
    username: "",
    bio: "",
    following: "",
    followers: "",
    dateJoined: "",
  });
  const [messagesData, setMessagesData] = React.useState(
  );

  const [loading, setLoading] = React.useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  React.useEffect(() => {
    if (id) {
      let messageid = id.split("/")[2];
      console.log(messageid);
      setUser(mutuals.find((user) => user.username === messageid));
      // setMessagesData(
      //   messages.find((message) => message.fromto === messageid).messages
      // );
    }
  }, [id, mutuals, messages]);

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
            <Avatar src={user && user.profilePic} size={40} round={true}/>
            <div>
              <span>{user && user.name}</span>
              <span>@{user && user.username}</span>
            </div>
            <InfoIcon />
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
