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
import "./EditProfile.css";
import PropTypes from "prop-types";
import {
  CustomDialog,
  CustomOutlinedTextField,
  CustomSelect,
} from "../../custom/CustomFieldComponents";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import * as profileActions from "../../redux/actions/profileActions";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { toast } from "react-toastify";
import { Edit, Photo, PhotoCamera } from "@mui/icons-material";

const ProfileEditForm = ({ profile, address, onOpenDialog, isDialogOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [tab, setTab] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [profileState, setProfileState] = React.useState({
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "",
    birthdate: null,
    phone: "",
    bio: "",
  });
  const [addressState, setAddressState] = React.useState({
    houseNo: "",
    street: "",
    subdivision: "",
    barangay: "",
    city: "",
    province: "",
    zip: "",
  });
  const [profilePic, setProfilePic] = React.useState(null);
  useEffect(() => {
    setProfileState({
      firstname: profile.firstname,
      middlename: profile.middlename ? profile.middlename : "",
      lastname: profile.lastname,
      gender: profile.gender,
      birthdate: profile.birthdate,
      phone: profile.phone ? profile.phone : "",
      bio: profile.bio ? profile.bio : "",
    });
    setAddressState({
      houseNo: address.houseNo,
      street: address.street,
      subdivision: address.subdivision,
      barangay: address.barangay,
      city: address.city,
      province: address.province,
      zip: address.zip,
    });
    setProfilePic(profile.profilePic);
  }, [profile, address]);

  const [profilePicUpload, setProfilePicUpload] = useState(null);

  const profileSchema = Joi.object({
    firstname: Joi.string().max(50).required(),
    middlename: Joi.string().max(20).allow(""),
    lastname: Joi.string().max(50).required(),
    gender: Joi.string(),
    birthdate: Joi.date().allow(null),
    phone: Joi.string()
      .pattern(new RegExp("^(09)\\d{9}$"))
      .max(11)
      .messages({
        "string.pattern.base": "Phone number must start with 09",
      })
      .allow(""),
    bio: Joi.string().max(160).allow(""),
  });

  const addressSchema = Joi.object({
    houseNo: Joi.string().max(20).allow(""),
    street: Joi.string().max(20).required(),
    subdivision: Joi.string().max(25).required(),
    barangay: Joi.string().max(25).required(),
    city: Joi.string().max(25).required(),
    province: Joi.string().max(20).required(),
    zip: Joi.number().integer().required(),
  });

  const [profileFieldErrors, setProfileFieldErrors] = useState({});
  const [addressFieldErrors, setAddressFieldErrors] = useState({});
  const handleProfileChange = ({ currentTarget: input }) => {
    if (input.name === "phone") {
      const newValue = input.value;
      const numericValue = newValue.replace(/\D/g, ""); // Remove any non-numeric characters
      setProfileState({ ...profileState, phone: numericValue });
      console.log("Phone: ", numericValue);
    } else {
      setProfileState({
        ...profileState,
        [input.name]: input.value,
      });
    }

    const { error } = profileSchema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      setProfileFieldErrors({
        ...profileFieldErrors,
        [input.name]: error.details[0].message,
      });
    } else {
      delete profileFieldErrors[input.name];
      setProfileFieldErrors({ ...profileFieldErrors, [input.name]: "" });
    }
  };

  const handleAddressChange = ({ currentTarget: input }) => {
    setAddressState({
      ...addressState,
      [input.name]: input.value,
    });

    const { error } = addressSchema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      setAddressFieldErrors({
        ...addressFieldErrors,
        [input.name]: error.details[0].message,
      });
    } else {
      delete addressFieldErrors[input.name];
      setAddressFieldErrors({ ...addressFieldErrors, [input.name]: "" });
    }
  };

  const isFormInvalid = () => {
    let result = profileSchema.validate(profileState);
    if (tab === 1) {
      result = addressSchema.validate(addressState);
    }
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

  const success = useSelector((state) => state.user.success);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    if (success) {
      onOpenDialog(false);
      toast.success("Profile updated successfully!");
      dispatch(profileActions.resetSuccess());
    }
    if (error) {
      toast.error(error);
    }
  }, [success, dispatch, onOpenDialog, error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (tab === 0) {
      dispatch(profileActions.updateProfile(profileState, profilePicUpload));
    } else if (tab === 1) {
      dispatch(profileActions.updateAddress(addressState));
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
    <CustomDialog
      open={isDialogOpen}
      onClose={() => onOpenDialog(false)}
      fullWidth
    >
      <DialogContent sx={{ bgcolor: "background.paper" }}>
        <Grid component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="profile">
                <div className="profileTitle">
                  <label htmlFor="profilePicInput">
                    <div className="avatar-container">
                      <Avatar
                        round={true}
                        size="120"
                        name={profile.name}
                        src={profilePic}
                      />
                      <div className="overlay">
                        <PhotoCamera className="overlay-image"/>
                      </div>
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
                        error={!!profileFieldErrors.firstname}
                        helperText={profileFieldErrors.firstname}
                        label="First Name"
                        fullWidth
                        value={profileState.firstname}
                        onChange={handleProfileChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomOutlinedTextField
                        name="middlename"
                        label="Middle Name"
                        fullWidth
                        value={profileState.middlename}
                        onChange={handleProfileChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomOutlinedTextField
                        name="lastname"
                        label="Last Name"
                        error={!!profileFieldErrors.lastname}
                        helperText={profileFieldErrors.lastname}
                        fullWidth
                        value={profileState.lastname}
                        onChange={handleProfileChange}
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
                          value={profileState.gender}
                          label="Gender"
                          onChange={(event) => {
                            setProfileState({
                              ...profileState,
                              gender: event.target.value,
                            });
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
                          value={profileState.birthdate}
                          disableMaskedInput={true}
                          onChange={(newValue) => {
                            let format = "yyyy-MM-DD";
                            const date = newValue
                              ? moment(newValue).format(format)
                              : null;
                            setProfileState({
                              ...profileState,
                              birthdate: date,
                            });
                          }}
                          renderInput={(params) => (
                            <CustomOutlinedTextField
                              error={!!profileFieldErrors.birthdate}
                              helperText={profileFieldErrors.birthdate}
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
                        error={!!profileFieldErrors.phone}
                        helperText={profileFieldErrors.phone}
                        fullWidth
                        value={profileState.phone}
                        onChange={handleProfileChange}
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
                        value={profileState.bio}
                        error={!!profileFieldErrors.bio}
                        helperText={profileFieldErrors.bio}
                        onChange={handleProfileChange}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={tab} index={1} dir={theme.direction}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomOutlinedTextField
                        name="houseNo"
                        label="House No."
                        fullWidth
                        value={addressState.houseNo}
                        onChange={handleAddressChange}
                        error={!!addressFieldErrors.houseNo}
                        helperText={addressFieldErrors.houseNo}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomOutlinedTextField
                        name="street"
                        label="Street"
                        fullWidth
                        value={addressState.street}
                        onChange={handleAddressChange}
                        error={!!addressFieldErrors.street}
                        helperText={addressFieldErrors.street}
                      />
                    </Grid>
                    {/* subdivision */}
                    <Grid item xs={12}>
                      <CustomOutlinedTextField
                        name="subdivision"
                        label="Subdivision"
                        fullWidth
                        value={addressState.subdivision}
                        onChange={handleAddressChange}
                        error={!!addressFieldErrors.subdivision}
                        helperText={addressFieldErrors.subdivision}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomOutlinedTextField
                        name="barangay"
                        label="Barangay"
                        fullWidth
                        value={addressState.barangay}
                        onChange={handleAddressChange}
                        error={!!addressFieldErrors.barangay}
                        helperText={addressFieldErrors.barangay}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomOutlinedTextField
                        name="city"
                        label="City"
                        fullWidth
                        value={addressState.city}
                        onChange={handleAddressChange}
                        error={!!addressFieldErrors.city}
                        helperText={addressFieldErrors.city}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomOutlinedTextField
                        name="province"
                        label="Province"
                        fullWidth
                        value={addressState.province}
                        onChange={handleAddressChange}
                        error={!!addressFieldErrors.province}
                        helperText={addressFieldErrors.province}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomOutlinedTextField
                        name="zip"
                        label="Zip Code"
                        fullWidth
                        value={addressState.zip}
                        onChange={handleAddressChange}
                        error={!!addressFieldErrors.zip}
                        helperText={addressFieldErrors.zip}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
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

export default ProfileEditForm;
