import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box, useTheme } from "@mui/system";
import React from "react";
import Avatar from "react-avatar";
import "../styles/EditProfile.css";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { CustomTextField } from "../custom/CustomTextField";

const ProfileEditForm = ({ profile }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleGenderChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderClose = () => {
    setOpen(false);
  };

  const handleGenderOpen = () => {
    setOpen(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="profile">
            <div className="profileTitle">
              <div>
                <Avatar
                  round={true}
                  size="120"
                  name={profile.name}
                  src={profile.profilePic}
                ></Avatar>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ bgcolor: "background.paper" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              variant="fullWidth"
            >
              <Tab label="Profile" {...a11yProps(0)} />
              <Tab label="Address" {...a11yProps(1)} />
            </Tabs>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="firstname"
                      label="First Name"
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="middlename"
                      label="Middle Name"
                      fullWidth
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="lastname"
                      label="Last Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="gender">Gender</InputLabel>
                      <Select
                        labelId="gender"
                        id="gender"
                        open={open}
                        onClose={handleGenderClose}
                        onOpen={handleGenderOpen}
                        value={age}
                        label="Gender"
                        onChange={handleGenderChange}
                      >
                        <MenuItem value="MALE">Male</MenuItem>
                        <MenuItem value="FEMALE">Female</MenuItem>
                        <MenuItem value="OTHERS">Others</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      name="bio"
                      label="Bio"
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                Item Two
              </TabPanel>
            </SwipeableViews>
          </Box>
          <Grid item xs={12}>
            <Button
              type="submit"
              className="editProfile"
              sx={{ float: "right", mt: 3, mb: 2, mr: 2 }}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
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
