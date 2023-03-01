import React, { useEffect } from "react";
import "./SearchInput.css";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import * as profileActions from "../../../redux/actions/profileActions";
import { useNavigate } from "react-router";

const SearchInput = ({ placeholder }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectAllUsers = useSelector((state) => state.user.allUsers);
  const [allUsers, setAllUsers] = React.useState(selectAllUsers);

  useEffect(() => {
    dispatch(profileActions.getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setAllUsers(selectAllUsers);
  }, [selectAllUsers]);

  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <Autocomplete
      fullWidth
      popupIcon={""}
      options={Object.values(allUsers)}
      onChange={(event, newValue) => {
        event.preventDefault();
        if (newValue) {
          const username = Object.keys(allUsers).find(
            (key) => allUsers[key] === newValue
          );
          navigate(`/profile/${username}`);
        }
      }}
      renderInput={(params) => (
        <TextField
          className="search-field"
          {...params}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          sx={{
            "& > :not(style)": { color: "var(--plain-text)" },
          }}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <SearchIcon
                style={{ color: "gray", marginLeft: "10px" }}
                fontSize="small"
              />
            ),
          }}
        />
      )}
    />
  );
};

export default SearchInput;
