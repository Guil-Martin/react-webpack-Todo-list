import React, { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";

const AddInput = (
  { textFieldTodo, isEditing, user, handleAdd, handleEdit },
  ...props
) => {
  const [inputValue, setInputValue] = useState();

  return (
    <Grid item xs={12}>
      <TextField
        style={{ width: "80%" }}
        id="outlined-basic"
        variant="outlined"
        label={isEditing ? isEditing.id + " - Edit ToDo" : "ToDo"}
        inputRef={textFieldTodo}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            isEditing ? handleEdit(inputValue) : handleAdd(inputValue);
            textFieldTodo.current.value = "";
            setInputValue("");
          }
        }}
        onChange={(e) => {
          setInputValue(e.currentTarget.value);
        }}
      />

      <Button
        variant="contained"
        style={{ width: "20%", height: "100%" }}
        onClick={(e) => {
          isEditing ? handleEdit(inputValue) : handleAdd(inputValue);
        }}
      >
        {isEditing ? "Edit ToDo" : "Add ToDo"}
      </Button>
    </Grid>
  );
};

export default AddInput;
