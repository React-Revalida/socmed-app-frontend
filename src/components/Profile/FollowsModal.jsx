import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Avatar from "react-avatar";
import { useNavigate } from "react-router";
import { CustomDialog } from "../../custom/CustomFieldComponents";
import "./FollowsModal.css";

const FollowsModal = ({ onOpenDialog, isDialogOpen, data, followTab }) => {
  const theme = localStorage.getItem("darkMode");
  const navigate = useNavigate();

  const handleRedirect = (username) => {
    onOpenDialog(false);
    navigate(`/profile/${username}`);
  };

  return (
    <CustomDialog
      open={isDialogOpen}
      onClose={() => onOpenDialog(false)}
      fullWidth
    >
      <Card
        className={theme === "dark" ? "darkCard" : "lightCard"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        {followTab === 1 ? (
          <CardHeader title="Following" />
        ) : (
          <CardHeader title="Followers" />
        )}
        <CardContent>
          <List>
            {data.map((user) => (
              <ListItem
                sx={{ cursor: "pointer" }}
                onClick={() => handleRedirect(user.username)}
              >
                <ListItemAvatar>
                  <Avatar
                    round={true}
                    size={40}
                    src={user.profilePic}
                    name={user.name}
                  />
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <span>{user.name}</span>
                        <span
                          style={{
                            fontSize: "0.8rem",
                          }}
                        >
                          {"@" + user.username}
                        </span>
                      </Box>
                    </>
                  }
                  // secondary={"@" + user.username}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </CustomDialog>
  );
};

export default FollowsModal;
