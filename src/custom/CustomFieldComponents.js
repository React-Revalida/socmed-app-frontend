import { Dialog, Select, TextField } from "@mui/material";
import { styled } from "@mui/styles";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "var(--plain-text)!important",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--twitter-color)!important",
  },
  "& .MuiOutlinedInput-root": {
    borderColor: "var(--twitter-color)!important",
    "&:hover fieldset": {
      borderColor: "var(--twitter-color)!important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--twitter-color)!important",
    },
  },
});

const CssSelect = styled(Select)({
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--twitter-color)!important",
  },
  // change border color when select is open
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--twitter-color)!important",
  },
});

const CssDialog = styled(Dialog)({
  "@global": {
    // change scrollbar color
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--twitter-color)",
      outline: "1px solid slategrey",
    },
  },
});

export function CustomOutlinedTextField(props) {
  return (
    <CssTextField
      label="Custom CSS"
      id="custom-css-outlined-input"
      {...props}
    />
  );
}

export function CustomSelect(props) {
  return (
    <CssSelect label="Custom CSS" id="custom-css-outlined-input" {...props} />
  );
}

export function CustomDialog(props) {
  return <CssDialog {...props} />;
}
