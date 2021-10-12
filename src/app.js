import React, { useState, useRef } from "react";
import { render } from "react-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  TextField,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/BorderColor";
import PriorityIcon from "@mui/icons-material/DateRange";

import "./style.scss";

const primary = "#0c4767ff";
const cardBg = "#A167A533";
const dateColor = "#0c4767ff";

const colorPriority = [
  { priority: "lowest", color: "#81c784" },
  { priority: "low", color: "#4fc3f7" },
  { priority: "medium", color: "#ffb74d" },
  { priority: "high", color: "#e57373" },
];

const App = () => {
  const textFieldTodo = useRef(null);

  const [rerender, setRerender] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [foundTodos, setFoundTodos] = useState([]);

  const [inputValue, setInputValue] = useState();
  const [idToEdit, setIdToEdit] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const getListToDisplay = () =>
    foundTodos.length > 0 ? foundTodos : todoList;

  const handlePriority = (item) => {
    let colorState = colorPriority.findIndex(
      (x) => x.priority === item.priority
    );
    colorState = colorState > colorPriority.length - 2 ? 0 : colorState + 1;
    item.priority = colorPriority[colorState].priority;
    item.color = colorPriority[colorState].color;
    setRerender(!rerender);
  };

  const handleAdd = () => {
    let currentValue = inputValue;
    if (inputValue != "") {
      // Set priority for how many ! are added at the start of the string, then remove them from the final value
      let PriorityMarkCounter = 0;
      for (let i = 0; i < 3; i++) {
        if (currentValue[i] === "!") {
          PriorityMarkCounter += 1;
        }
      }
      currentValue = currentValue.substring(PriorityMarkCounter).trim();

      const currentDate = new Date();
      const newItem = {
        id: currentDate.getTime().toString(),
        title: currentValue,
        priority: colorPriority[PriorityMarkCounter].priority,
        color: colorPriority[PriorityMarkCounter].color,
        date: currentDate,
      };

      setFoundTodos([]); // Empties the search to reset the todos
      setTodoList([...todoList, newItem]);
      textFieldTodo.current.value = "";
      setInputValue("");
      textFieldTodo.current.focus();
    }
  };

  const handleEdit = () => {
    setIsEditing(false);
    const toDoToEdit = todoList.find((x) => x.id === idToEdit);
    toDoToEdit.title = inputValue;
    textFieldTodo.current.value = "";
    setInputValue("");
  };

  const handleDelete = (todo) => {
    setTodoList(todoList.filter((it) => it.id !== todo.id));
    if (foundTodos.length > 0)
      // Also remove the element during search
      setFoundTodos(foundTodos.filter((it) => it.id !== todo.id));
  };

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <TextField
            style={{ width: "80%" }}
            id="outlined-basic"
            variant="outlined"
            label={isEditing ? idToEdit + " - Edit ToDo" : "ToDo"}
            inputRef={textFieldTodo}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                isEditing ? handleEdit() : handleAdd();
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
              isEditing ? handleEdit() : handleAdd();
            }}
          >
            {isEditing ? "Edit ToDo" : "Add ToDo"}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Button
                style={{ width: "100%" }}
                variant="contained"
                onClick={(e) => {
                  getListToDisplay().sort((a, b) => b.date - a.date);
                  setRerender(!rerender);
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
                  getListToDisplay().sort((a, b) => {
                    let bPriority = colorPriority.findIndex(
                      (x) => x.priority === b.priority
                    );
                    let aPriority = colorPriority.findIndex(
                      (x) => x.priority === a.priority
                    );
                    return bPriority > aPriority;
                  });
                  setRerender(!rerender);
                }}
              >
                Filter by priority
              </Button>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <TextField
                style={{ width: "100%", marginTop: "14px" }}
                id="outlined-basic"
                variant="outlined"
                label={"Search for Todos"}
                onChange={(e) => {
                  const value = e.currentTarget.value.toLowerCase();
                  setFoundTodos(
                    todoList.filter((x) => !x.title.toLowerCase().search(value))
                  );
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            {getListToDisplay().map((item) => (
              <Grid item xs={12} sm={6} md={3}>
                <Card style={{ position: "relative", background: cardBg }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {item.title}
                    </Typography>

                    <Typography style={{ color: dateColor }}>
                      {item.date.toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }) +
                        " at " +
                        item.date.toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    </Typography>
                  </CardContent>

                  <CardActions disableSpacing>
                    <IconButton
                      title="Edit ToDo"
                      aria-label="Edit ToDo"
                      style={{ color: "#ffb74d" }}
                      onClick={(e) => {
                        setIsEditing(true);
                        setIdToEdit(item.id);
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
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);
