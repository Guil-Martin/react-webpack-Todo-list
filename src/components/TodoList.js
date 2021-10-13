import React, { useState, useRef, useEffect } from "react";
import { Grid } from "@material-ui/core";

import AddInput from "./AddInput";
import Todo from "./Todo";
import Filters from "./Filters";

const colorPriority = [
  { priority: "lowest", color: "#81c784" },
  { priority: "low", color: "#4fc3f7" },
  { priority: "medium", color: "#ffb74d" },
  { priority: "high", color: "#e57373" },
];

const TodoList = ({ user, supabase }, ...props) => {
  const textFieldTodo = useRef(null);

  const [todoList, setTodoList] = useState([]);
  const [foundTodos, setFoundTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [todoFilter, setTodoFilter] = useState("created_at");

  useEffect(() => {
    setTodos();
  }, []);

  useEffect(() => {
    setTodos();
  }, [todoFilter]);

  const getListToDisplay = () =>
    foundTodos.length > 0 ? foundTodos : todoList;

  const setTodos = async () => {
    let { data, error } = await supabase
      .from("Tasks")
      .select("*")
      .eq("user_id", user.id)
      .order(todoFilter, { ascending: false });

    console.log("error", error);

    if (error == null) {
      const dbTodos = [];
      for (let task in data) {
        let newItem = {
          id: data[task].id,
          title: data[task].content,
          priority: colorPriority[data[task].priority].priority,
          color: colorPriority[data[task].priority].color,
          date: data[task].created_at,
        };
        dbTodos.push(newItem);
      }
      setTodoList(dbTodos);
    } else {
      console.log("error", error);
    }
  };

  const handlePriority = async (item) => {
    let priorityIndex = colorPriority.findIndex(
      (x) => x.priority === item.priority
    );
    priorityIndex =
      priorityIndex > colorPriority.length - 2 ? 0 : priorityIndex + 1;

    const { data, error } = await supabase
      .from("Tasks")
      .update({ priority: priorityIndex })
      .eq("id", item.id);

    if (error == null) {
      item.priority = colorPriority[priorityIndex].priority;
      item.color = colorPriority[priorityIndex].color;
      setTodos(); // Refresh list of todos on the page
    }
  };

  const handleAdd = async (value) => {
    let currentValue = value;
    if (value != "") {
      // Set priority for how many ! are added at the start of the string, then remove them from the final value
      let PriorityMarkCounter = 0;
      for (let i = 0; i < 3; i++) {
        if (currentValue[i] === "!") {
          PriorityMarkCounter += 1;
        }
      }
      currentValue = currentValue.substring(PriorityMarkCounter).trim();

      const { data, error } = await supabase.from("Tasks").insert([
        {
          content: currentValue,
          priority: PriorityMarkCounter,
          user_id: user.id,
        },
      ]);

      if (error == null) {
        setFoundTodos([]); // Empties the search to reset the todos

        setTodos(); // Refresh list of todos on the page

        textFieldTodo.current.value = "";
        textFieldTodo.current.focus();
      }
    }
  };

  const handleEdit = async (value) => {
    const { data, error } = await supabase
      .from("Tasks")
      .update({ content: value })
      .eq("id", isEditing.id);

    if (error == null) {
      // const toDoToEdit = todoList.find((x) => x.id === isEditing.is);
      isEditing.title = value;
      textFieldTodo.current.value = "";
      setTodos(); // Refresh list of todos on the page
    }

    setIsEditing(null);
  };

  const handleDelete = async (todo) => {
    const { data, error } = await supabase
      .from("Tasks")
      .delete()
      .eq("id", todo.id);

    if (error == null) {
      setTodoList(todoList.filter((it) => it.id !== todo.id));
      if (foundTodos.length > 0)
        // Also remove the element during search
        setFoundTodos(foundTodos.filter((it) => it.id !== todo.id));
    }
  };

  const handleSearch = async (value) => {
    console.log(textFieldSearch.current.value.toLowerCase());
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid container spacing={2}>
        <AddInput
          textFieldTodo={textFieldTodo}
          isEditing={isEditing}
          user={user}
          handleAdd={handleAdd}
          handleEdit={handleEdit}
        />
      </Grid>

      <Filters setTodoFilter={setTodoFilter} />

      <Grid container spacing={2}>
        {getListToDisplay().map((item) => (
          <Todo
            item={item}
            textFieldTodo={textFieldTodo}
            user={user}
            setIsEditing={setIsEditing}
            handlePriority={handlePriority}
            handleDelete={handleDelete}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default TodoList;
