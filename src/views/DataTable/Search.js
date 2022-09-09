import React, { useState } from "react";
import { TextField, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import "../../assets/css/Search.css";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "wheat",
    },
  },
});
function Search({ onSearch }) {
  const [search, setSearch] = useState("");
  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };
  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      id="standard-bare"
      variant="outlined"
      defaultValue="Search"
      value={search}
      onChange={(e) => onInputChange(e.target.value)}
      InputProps={{
        style: {
          height: "40px",
        },
        endAdornment: (
          <IconButton id="removeCircle">
            <SearchOutlined />
          </IconButton>
        ),
      }}
    />
  );
}
export default Search;
