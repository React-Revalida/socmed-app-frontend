import Avatar from "react-avatar";
import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ active, user }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <div
      className={
        active || isVisible ? "profileDetailCard" : "profileDetailCardActive"
      }
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div>
        <Avatar
          src={user.profilePic}
          name={user.firstname + " " + user.lastname}
          round={true}
          size={60}
        />
        <div>
          <span>Follow</span>
        </div>
      </div>
      <div>
        <span>{user.firstname + " " + user.lastname}</span>
      </div>
      <div>
        <span>@{user.username}</span>
      </div>
      <div>
        <span>{user.dateJoined}</span>
      </div>
      <div>
        <span>
          <span>{}</span>
          <span>Following</span>
        </span>
        <span>
          <span>{}</span>
          <span>Followers</span>
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
