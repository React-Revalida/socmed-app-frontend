import { Typography } from "@mui/material";
import Avatar from "react-avatar";
import React from "react";
import FavoriteIcon from "../icons/FavoriteIcon";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CommentIcon from "../icons/CommentIcon";
import { MillToDate } from "../../utils/MillToDate";
import ProfileCard from "../ProfileCard/ProfileCard";
import * as likeActions from "../../redux/actions/likeActions";
import { useDispatch, useSelector } from "react-redux";
import * as profileActions from "../../redux/actions/profileActions";
import * as postActions from "../../redux/actions/postActions";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { CardActionArea, Menu, MenuItem } from "@mui/material";
import FollowsModal from "../../components/Profile/FollowsModal";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";

const Comment = ({ comment }) => {
  return (
    <div className="post">
      <div className="comment__avatar">
        <div>
          <Avatar
            src={comment.user.profilePic}
            name={comment.user.name}
            round={true}
            size={40}
            style={{ margin: 10 }}
          />
        </div>
      </div>
      <div className="post-content-col">
        <div className="post-header">
          <span
            className="post-header-displayname"
            // onMouseEnter={() => setIsVisibleProfileCard(true)}
            // onMouseLeave={() => {
            //   setTimeout(function () {
            //     setIsVisibleProfileCard(false);
            //   }, 1000);
            // }}
          >
            {comment.user.name}
          </span>
          <span className="post-header-username">
            {"@" + comment.user.username}
          </span>
          <span className="post-header-date">
            {MillToDate(comment.timestamp)}
          </span>
        </div>
        <CardActionArea>
          <div className="post-content">{comment.message}</div>
        </CardActionArea>
        <div className="post-event">
          <div></div>
        </div>
      </div>
      {/* <div className="comment__body">
        <div className="comment__header">
          <div className="comment__headerText">
            <h3>
              {comment.user.name}
              <span className="comment__headerSpecial">
              </span>
            </h3>
          </div>
          <div className="comment__headerDescription">
            <p>{comment.message}</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Comment;
