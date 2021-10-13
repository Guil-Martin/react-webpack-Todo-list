import React from "react";
import { Grid, Button } from "@material-ui/core";

const Filters = ({ setTodoFilter }, ...props) => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <Button
          style={{ width: "100%" }}
          variant="contained"
          onClick={(e) => {
            setTodoFilter("created_at");
          }}
        >
          Filter by date
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Button
          style={{ width: "100%" }}
          variant="contained"
          onClick={(e) => {
            setTodoFilter("priority");
          }}
        >
          Filter by priority
        </Button>
      </Grid>
    </Grid>
  );
};

export default Filters;
