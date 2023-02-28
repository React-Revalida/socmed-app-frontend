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

import {
  CustomDialog,
  CustomOutlinedTextField,
} from "../../../custom/CustomFieldComponents";
import * as postActions from "../../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { Close } from "@mui/icons-material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const PostEditForm = ({ post, onOpenDialog, isDialogOpen }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = React.useState(0);
  const [postState, setPostState] = React.useState({
    message: "",
  });

  const [profilePicUpload, setProfilePicUpload] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    setPostState({
      message: post.message ? post.message : "",
    });

    setCurrentImage(post.imageUrl ? post.imageUrl : "");
  }, [post]);

  // const [postImageUpload, setPostImageUpload] = useState(null);

  const postSchema = Joi.object({
    message: Joi.string().max(200).required(),
  });

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
      onOpenDialog(false);
      dispatch(postActions.resetSuccess());
    }
  }, [success, dispatch, onOpenDialog]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postActions.editPost(post.postId, postState, profilePicUpload));
    dispatch(postActions.resetSuccess());
    onOpenDialog(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePicUpload(file);
    const reader = new FileReader();
    reader.onload = () => {
      setCurrentImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <CustomDialog
      open={isDialogOpen}
      onClose={() => onOpenDialog(false)}
      fullWidth
    >
      <Tabs value={tab} textColor="inherit" variant="fullWidth">
        <Tab label="Edit Post" {...a11yProps(0)} />
      </Tabs>
      <DialogContent sx={{ bgcolor: "background.paper" }}>
        <Grid component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <div className="profile">
                <div className="profileTitle">
                  <label htmlFor="profilePicInput">
                    <Avatar
                      round={true}
                      size="50"
                      src={post.user.profilePic}
                    ></Avatar>
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
                    {post.user.firstname}&ensp;{post.user.lastname}
                    <Typography color={"gray"}>
                      @{post.user.username}
                    </Typography>
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{ bgcolor: "background.paper" }}
                marginLeft={3}
                marginRight={3}
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
                  {currentImage === "" ? (
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
                                onClick={() => setCurrentImage("")}
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
                <Button
                  type="submit"
                  disabled={isFormInvalid()}
                  className="editProfile"
                  variant="contained"
                  sx={{ float: "right", mt: 3, mb: 2, mr: 2 }}
                >
                  Save Changes
                </Button>
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
