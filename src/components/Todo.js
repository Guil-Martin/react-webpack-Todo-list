import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  IconButton,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/BorderColor";
import PriorityIcon from "@mui/icons-material/DateRange";

const md = require("markdown-it")();
// var result = md.renderInline('__markdown-it__ rulezz!');

const primary = "#0c4767ff";
const cardBg = "#A167A533";
const dateColor = "#0c4767ff";

const Todo = (
  { user, item, textFieldTodo, setIsEditing, handlePriority, handleDelete },
  ...props
) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }) +
      " at " +
      date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card style={{ position: "relative", background: cardBg }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {md.render(item.title)}
          </Typography>

          <Typography style={{ color: dateColor }}>
            {formatDate(item.date)}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            title="Edit ToDo"
            aria-label="Edit ToDo"
            style={{ color: "#ffb74d" }}
            onClick={(e) => {
              setIsEditing(item);
              textFieldTodo.current.value = item.title;
              textFieldTodo.current.focus();
              textFieldTodo.current.select();
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            title="Delete ToDo"
            aria-label="Delete ToDo"
            style={{ color: "#d32f2f" }}
            onClick={(e) => handleDelete(item)}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton
            title="Change priority"
            aria-label="Change priority"
            style={{
              position: "absolute",
              backgroundColor: item.color,
              right: 0,
              bottom: 0,
              border: "2px",
              borderStyle: "solid",
              borderRadius: 0,
            }}
            onClick={(e) => {
              handlePriority(item);
            }}
          >
            <PriorityIcon />
            <Typography style={{ fontSize: "0.5em" }}>
              {item.priority.toUpperCase()}
            </Typography>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Todo;
