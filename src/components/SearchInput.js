import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";

const SearchInput = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          style={{ width: "100%", marginTop: "14px" }}
          id="outlined-basic"
          variant="outlined"
          inputRef={textFieldSearch}
          label={"Search for Todos"}
          onChange={(e) => {
            // const value = e.currentTarget.value.toLowerCase();
            // setFoundTodos(
            //   todoList.filter((x) => !x.title.toLowerCase().search(value))
            // );
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SearchInput;
