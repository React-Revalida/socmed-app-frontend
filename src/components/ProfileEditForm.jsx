import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Tab,
  Tabs,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import "../styles/EditProfile.css";
import PropTypes from "prop-types";
import {
  CustomOutlinedTextField,
  CustomSelect,
} from "../custom/CustomFieldComponents";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import * as profileActions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
const ProfileEditForm = ({ profile, onOpenDialog, isDialogOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [tab, setTab] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    firstname: profile.firstname,
    middlename: profile.middlename ? profile.middlename : "",
    lastname: profile.lastname,
    gender: profile.gender,
    birthdate: profile.birthdate,
    phone: profile.phone ? profile.phone : "",
    bio: profile.bio ? profile.bio : "",
  });
  const [profilePic, setProfilePic] = React.useState(profile.profilePic);
  const [profilePicUpload, setProfilePicUpload] = useState(null);

  const schema = Joi.object({
    firstname: Joi.string().max(50).required(),
    middlename: Joi.string().max(20),
    lastname: Joi.string().max(50).required(),
    gender: Joi.string(),
    birthdate: Joi.date().allow(null),
    phone: Joi.string().pattern(new RegExp("^(09)\\d{9}$")).max(11).messages({
      "string.pattern.base": "Phone number must start with 09",
    }),
    bio: Joi.string().max(160),
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const handleChange = ({ currentTarget: input }) => {
    if (input.name === "phone") {
      const newValue = input.value;
      const numericValue = newValue.replace(/\D/g, ""); // Remove any non-numeric characters
      setState({ ...state, phone: numericValue });
      console.log("Phone: ", numericValue);
    } else {
      setState({
        ...state,
        [input.name]: input.value,
      });
    }

    const { error } = schema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      setFieldErrors({
        ...fieldErrors,
        [input.name]: error.details[0].message,
      });
    } else {
      delete fieldErrors[input.name];
      setFieldErrors({ ...fieldErrors, [input.name]: "" });
    }
  };
  const isFormInvalid = () => {
    const result = schema.validate(state);

    return !!result.error;
  };

  const handleGenderClose = () => {
    setOpen(false);
  };

  const handleGenderOpen = () => {
    setOpen(true);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const success = useSelector((state) => state.success);

  useEffect(() => {
    if (success) {
      onOpenDialog(false);
      dispatch(profileActions.resetSuccess());
    }
  }, [success, dispatch, onOpenDialog]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (tab === 0) {
      dispatch(profileActions.updateProfile(state, profilePicUpload));
    } else if (tab === 1) {
      alert("Address");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePicUpload(file);
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <Dialog open={isDialogOpen} onClose={() => onOpenDialog(false)} fullWidth>
      <DialogContent>
        <Grid component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="profile">
                <div className="profileTitle">
                  <label htmlFor="profilePicInput">
                    <Avatar
                      round={true}
                      size="120"
                      name={profile.name}
                      src={profilePic}
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
            <Grid item xs={12}>
              <Box sx={{ bgcolor: "background.paper" }}>
                <Tabs
                  value={tab}
                  onChange={handleTabChange}
                  textColor="inherit"
                  variant="fullWidth"
                >
                  <Tab label="Profile" {...a11yProps(0)} />
                  <Tab label="Address" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={tab} index={0} dir={theme.direction}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomOutlinedTextField
                        name="firstname"
                        error={!!fieldErrors.firstname}
                        helperText={fieldErrors.firstname}
                        label="First Name"
                        fullWidth
                        value={state.firstname}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomOutlinedTextField
                        name="middlename"
                        label="Middle Name"
                        fullWidth
                        value={state.middlename}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomOutlinedTextField
                        name="lastname"
                        label="Last Name"
                        error={!!fieldErrors.lastname}
                        helperText={fieldErrors.lastname}
                        fullWidth
                        value={state.lastname}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="gender">Gender</InputLabel>
                        <CustomSelect
                          labelId="gender"
                          id="gender"
                          open={open}
                          onClose={handleGenderClose}
                          onOpen={handleGenderOpen}
                          value={state.gender}
                          label="Gender"
                          onChange={(event) => {
                            setState({ ...state, gender: event.target.value });
                          }}
                        >
                          <MenuItem value="MALE">Male</MenuItem>
                          <MenuItem value="FEMALE">Female</MenuItem>
                          <MenuItem value="OTHERS">Others</MenuItem>
                        </CustomSelect>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                          label="Birthday"
                          inputFormat="MMMM DD, yyyy"
                          value={state.birthdate}
                          disableMaskedInput={true}
                          onChange={(newValue) => {
                            let format = "yyyy-MM-DD";
                            const date = newValue
                              ? moment(newValue).format(format)
                              : null;
                            setState({ ...state, birthdate: date });
                          }}
                          renderInput={(params) => (
                            <CustomOutlinedTextField
                              error={!!fieldErrors.birthdate}
                              helperText={fieldErrors.birthdate}
                              fullWidth
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <CustomOutlinedTextField
                        name="phone"
                        label="Phone"
                        error={!!fieldErrors.phone}
                        helperText={fieldErrors.phone}
                        fullWidth
                        value={state.phone}
                        onChange={handleChange}
                        inputProps={{
                          maxLength: 11,
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomOutlinedTextField
                        name="bio"
                        label="Bio"
                        fullWidth
                        multiline
                        rows={4}
                        value={state.bio}
                        error={!!fieldErrors.bio}
                        helperText={fieldErrors.bio}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={tab} index={1} dir={theme.direction}>
                  Item Two
                </TabPanel>
              </Box>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  disabled={isFormInvalid()}
                  className="editProfile"
                  sx={{ float: "right", mt: 3, mb: 2, mr: 2 }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
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

export default ProfileEditForm;
