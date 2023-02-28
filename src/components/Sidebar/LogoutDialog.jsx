import { Button, DialogContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { CustomDialog } from "../../custom/CustomFieldComponents";
import { logoutUser } from "../../redux/actions/authActions";

const LogoutDialog = ({ isDialogOpen, onOpenDialog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <DialogContent sx={{ bgcolor: "background.paper" }}>
        <Box marginTop={2} marginBottom={2} marginLeft={4} marginRight={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }} marginBottom={4}>
            Logging out...
          </Typography>
          <Typography marginBottom={4}>
            Are you sure you want to log out?
          </Typography>
          <Box display={"flex"} justifyContent={"space-evenly"}>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => onOpenDialog(false)}
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
