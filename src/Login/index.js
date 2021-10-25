import React from "react";
import { Button, Stack, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";

const LoginPage = (props) => {
  let history = useHistory();
  const fetchUser = () => {
    // TODO: will replace with logged in user
    fetch("http://localhost:5000/users/961e4db3-d410-4756-8874-0d4482bae0dc")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        props.onSetUser(data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Stack spacing={2}>
      <TextField label="User Name" id="outlined-start-adornment" />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => fetchUser()}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default LoginPage;
