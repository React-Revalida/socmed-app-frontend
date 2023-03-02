import { Button, DialogContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { CustomDialog } from "../../custom/CustomFieldComponents";
import { logoutUser } from "../../redux/actions/authActions";
import "./LogoutDialog.css";

const LogoutDialog = ({ isDialogOpen, onOpenDialog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = localStorage.getItem("darkMode");

  const handleLogout = () => {
    try {
      dispatch(logoutUser()).then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomDialog
      open={isDialogOpen}
      onClose={() => onOpenDialog(false)}
      fullWidth
    >
      <DialogContent
        sx={{ bgcolor: "background.paper" }}
        className={theme === "dark" ? "darkDialog" : "lightDialog"}
      >
        <Box marginTop={2} marginBottom={2} marginLeft={4} marginRight={4}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
            marginBottom={4}
          >
            Logging out...
          </Typography>
          <Typography marginBottom={4} fontFamily={"Open Sans"}>
            Are you sure you want to log out?
          </Typography>
          <Box display={"flex"} justifyContent={"space-evenly"}>
            <Button
              variant="contained"
              onClick={handleLogout}
              className={theme === "dark" ? "darkButton" : "lightButton"}
              sx={{
                fontFamily: "Poppins",
                textTransform: "none",
              }}
            >
              Logout
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => onOpenDialog(false)}
              className={theme === "dark" ? "darkButton" : "lightButton"}
              sx={{
                fontFamily: "Poppins",
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </CustomDialog>
  );
};

export default LogoutDialog;
