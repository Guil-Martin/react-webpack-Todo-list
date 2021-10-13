import React, { useState, useRef, useEffect } from "react";
import { render } from "react-dom";
import { Container, Button } from "@material-ui/core";

import TodoList from "./components/TodoList";

import "./style.scss";

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const App = () => {
  const [user, setUser] = useState(null);

  const checkUser = () => {
    const authUser = supabase.auth.user();
    setUser(authUser);
  };

  useEffect(() => {
    checkUser();
    supabase.auth.onAuthStateChange(() => {
      checkUser();
    });
  }, []);

  return (
    <Container>
      {user ? (
        <>
          <Button
            variant="contained"
            onClick={(e) => {
              supabase.auth.signOut();
            }}
          >
            {user.user_metadata.user_name} - Signout
          </Button>
          <TodoList user={user} supabase={supabase} />
        </>
      ) : (
        <button onClick={() => supabase.auth.signIn({ provider: "github" })}>
          Connect with Github
        </button>
      )}
    </Container>
  );
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);
