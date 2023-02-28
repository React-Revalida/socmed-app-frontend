import {
  Button,
  DialogContent,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import "./PostEditForm.css";
import PropTypes from "prop-types";
import EmojiIcon from "../../icons/EmojiIcon";
import EmojiPicker from "emoji-picker-react";
import {
  CustomDialog,
  CustomOutlinedTextField,
} from "../../../custom/CustomFieldComponents";
import * as postActions from "../../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { Close } from "@mui/icons-material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";

const PostEditForm = ({ profile, post, onOpenPostModal, isPostModalOpen }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = React.useState(0);
  const [postState, setPostState] = React.useState(
    post
      ? { message: post.message }
      : {
          message: "",
        }
  );

  const [newPicUpload, setNewPicUpload] = useState(null);
  const [currentImage, setCurrentImage] = useState(post ? post.imageUrl : "");

  const navigate = useNavigate();

  // useEffect(() => {
  //   setPostState({
  //     message: post.message != null ? post.message : "",
  //   });

  //   setCurrentImage(post.imageUrl != null ? post.imageUrl : "");
  // }, [post]);

  // const [postImageUpload, setPostImageUpload] = useState(null);

  const postSchema = Joi.object({
    message: Joi.string().max(200).required(),
  });

  const [emojiPicker, setEmojiPicker] = useState(null);

  const [profileFieldErrors, setProfileFieldErrors] = useState({});

  const handleProfileChange = ({ currentTarget: input }) => {
    setPostState({
      ...postState,
      [input.name]: input.value,
    });

    const { error } = postSchema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      setProfileFieldErrors({
        ...profileFieldErrors,
        [input.name]: error.details[0].message,
      });
    } else {
      delete postSchema[input.name];
      setProfileFieldErrors({ ...profileFieldErrors, [input.name]: "" });
    }
  };

  const isFormInvalid = () => {
    let result = postSchema.validate(postState);
    return !!result.error;
  };

  const success = useSelector((state) => state.user.success);

  useEffect(() => {
    if (success) {
      onOpenPostModal(false);
      dispatch(postActions.resetSuccess());
    }
  }, [success, dispatch, onOpenPostModal]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (post) {
      dispatch(postActions.editPost(post.postId, postState, newPicUpload));
      dispatch(postActions.resetSuccess());
    } else {
      dispatch(postActions.addPost(postState, newPicUpload));
      dispatch(postActions.resetSuccess());
      setPostState({ ...postState, message: "" });
      setNewPicUpload(null);
      setCurrentImage("");
    }
    onOpenPostModal(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewPicUpload(file);
    const reader = new FileReader();
    reader.onload = () => {
      setCurrentImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <CustomDialog
      open={isPostModalOpen}
      onClose={() => onOpenPostModal(false)}
      fullWidth
    >
      <Tabs value={tab} textColor="inherit" variant="fullWidth">
        <Tab label={post ? "Edit Post" : "Create Post"} {...a11yProps(0)} />
      </Tabs>
      <DialogContent sx={{ bgcolor: "background.paper", position: "relative" }}>
        <Grid component="form" onSubmit={handleSubmit} position={"relative"}>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <div className="profile">
                <div className="profileTitle">
                  <label htmlFor="profilePicInput">
                    <div>
                      <Avatar
                        round={true}
                        size="50"
                        src={profile.profilePic}
                        name={profile.firstname + " " + profile.lastname}
                      ></Avatar>
                    </div>
                    <input
                      type="file"
                      id="profilePicInput"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            </Grid>
            <Grid item xs={11}>
              <div className="profile">
                <div className="profileTitle">
                  <Typography sx={{ ml: 2, mb: 1, fontStyle: "inherit" }}>
                    {profile.firstname}&ensp;{profile.lastname}
                    <Typography color={"gray"}>@{profile.username}</Typography>
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{ bgcolor: "background.paper" }}
                marginLeft={3}
                marginRight={3}
                position={"relative"}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomOutlinedTextField
                      name="message"
                      error={!!profileFieldErrors.message}
                      helperText={profileFieldErrors.message}
                      label="Message"
                      fullWidth
                      value={postState.message}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    {!emojiPicker ? (
                      <EmojiIcon
                        className="emojiOption"
                        width={22}
                        height={22}
                        onClick={() => setEmojiPicker((prev) => !prev)}
                      />
                    ) : (
                      <>
                        <EmojiIcon
                          className="emojiOption"
                          width={22}
                          height={22}
                          onClick={() => setEmojiPicker((prev) => !prev)}
                        />
                        <EmojiPicker
                          // searchDisabled="true"
                          previewConfig={{ showPreview: false }}
                          // emojiStyle="google"
                          suggestedEmojisMode="recent"
                          onEmojiClick={(e) =>
                            setPostState({
                              ...postState,
                              message: postState.message + e.emoji,
                            })
                          }
                        />
                      </>
                    )}
                  </Grid>

                  {currentImage === "" || currentImage === null ? (
                    <label htmlFor="profilePicInput">
                      <div className="tweetboxOptionIcon">
                        <AddPhotoAlternateIcon />
                        <text>Add Photo</text>
                      </div>
                      <input
                        id="profilePicInput"
                        onChange={handleFileChange}
                        type="file"
                        style={{ display: "none" }}
                      />
                    </label>
                  ) : (
                    <Grid item xs={12}>
                      <div className="uploadImage">
                        <div className="uploadedImage">
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignContent={"center"}
                          >
                            <img src={currentImage} alt="no picture"></img>
                            <div className="tweetboxOptions">
                              <Close
                                sx={{ mt: 1, ml: 1 }}
                                className="uploadedImage-closeButton"
                                onClick={() => {
                                  setCurrentImage("");
                                  setNewPicUpload(null);
                                }}
                              />
                            </div>
                          </Box>
                        </div>
                      </div>
                    </Grid>
                  )}
                </Grid>
              </Box>
              <Grid item xs={12}>
                {post ? (
                  <Button
                    type="submit"
                    disabled={isFormInvalid()}
                    className="editProfile"
                    variant="contained"
                    sx={{ float: "right", mt: 3, mb: 2, mr: 2 }}
                  >
                    Save Changes
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="editProfile"
                    variant="contained"
                    disabled={isFormInvalid()}
                    sx={{ float: "right", mt: 3, mb: 2, mr: 2 }}
                  >
                    Add Post
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </CustomDialog>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default PostEditForm;
