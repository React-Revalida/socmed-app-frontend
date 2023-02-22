import { Select, TextField } from "@mui/material";
import { styled } from "@mui/styles";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "var(--twitter-color)!important",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--twitter-color)!important",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--twitter-color)!important",
    },
    "&:hover fieldset": {
      borderColor: "var(--twitter-color)!important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--twitter-color)!important",
    },
  },
});

const CssSelect = styled(Select)({
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid var(--twitter-color)!important",
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
