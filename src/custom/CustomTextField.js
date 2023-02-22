import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:after": {
      borderBottomColor: "var(--twitter-color)!important",
    },
  },
}));

export function CustomTextField(props) {
  const classes = useStyles();

  return (
    <TextField
      variant="standard"
      {...props}
      label={props.label}
      InputProps={{ classes: { root: classes.root } }}
    />
  );
}
