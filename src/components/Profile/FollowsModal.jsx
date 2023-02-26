import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import Avatar from "react-avatar";
import { useNavigate } from "react-router";
import { CustomDialog } from "../../custom/CustomFieldComponents";

const FollowsModal = ({ onOpenDialog, isDialogOpen, data, followTab }) => {
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
                  <Avatar src={user.profilePic} round={true} size={30} />
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={"@" + user.username}
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
