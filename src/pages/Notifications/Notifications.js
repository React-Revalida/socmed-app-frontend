import React from "react";
import "./Notifications.css";
import Widgets from "../../components/Widgets/Widgets";
import SettingsIcon from "@mui/icons-material/Settings";
import Post from "../../components/Feed/Post/Post";
import FollowedYou from "../../components/FollowedYou/FollowedYou";
import LikedYou from "../../components/LikedYou/LikedYou";
import BottomSidebar from "../../components/BottomSidebar/BottomSidebar";
import Avatar from "react-avatar";
import DrawerBar from "../../components/DrawerBar/DrawerBar";
import HomeBox from "../../components/HomeBox/HomeBox";
import Loading from "../../components/Loading/Loading";

function Notifications() {
  const [isAll, setIsAll] = React.useState(true);
  const [isDrawerBar, setIsDrawerBar] = React.useState(false);
  document.title = "Notifications / Twitter";
  const [loading, setLoading] = React.useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  return (
    <>
      <div className="feed">
        {isDrawerBar && (
          <div
            onClick={() => setIsDrawerBar(false)}
            className="drawerBarPanel"
          />
        )}
        <DrawerBar active={isDrawerBar} />
        <div className="notificationsHeader">
          <div className="notificationsTitle">
            <div onClick={() => setIsDrawerBar(true)}>
              <Avatar
                round={true}
                size={40}
                src="https://avatars.githubusercontent.com/u/38807255?s=460&u=deb087d587be7f6a4000e4e710ec4d1daa6fde84&v=4"
              />
            </div>
            <span>&nbsp;Notifications</span>
            <SettingsIcon />
          </div>
          <div className="notificationsCategory">
            <div
              className={isAll && "notificationActive"}
              onClick={() => setIsAll(true)}
            >
              <span>All</span>
            </div>
            <div
              className={!isAll && "notificationActive"}
              onClick={() => setIsAll(false)}
            >
              <span>Mentions</span>
            </div>
          </div>
        </div>
        <article>
          {!loading ? (
            isAll ? (
              <>
                <FollowedYou
                  followingUser={{
                    userImage:
                      "https://pbs.twimg.com/profile_images/1348390204810407937/BmUVaYGD_400x400.jpg",
                    displayName: "Cihat Necati",
                  }}
                />
              </>
            ) : (
              <>
                <Post
                  username="cnecati"
                  userimage="https://pbs.twimg.com/profile_images/1348390204810407937/BmUVaYGD_400x400.jpg"
                  displayName="Cihat Necati"
                  text="@mucahitsahin Projelerine github.com/mucahit-sahin adresinden ulaşabilirsiniz"
                  date="1614077764184"
                />
              </>
            )
          ) : (
            <Loading />
          )}
        </article>
        <BottomSidebar />
      </div>
      <Widgets />
    </>
  );
}

export default Notifications;
