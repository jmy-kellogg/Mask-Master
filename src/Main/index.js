import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, CircularProgress, Stack } from "@mui/material";

import MasksList from "../MasksList";

const Main = (props) => {
  const [user, setUser] = useState({ name: "", sub: "", uuid: "" });
  const {
    user: authUser,
    isAuthenticated,
    isLoading,
    logout,
    loginWithRedirect,
  } = useAuth0();

  const createUser = () => {
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: authUser.name, sub: authUser.sub }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        if (data) {
          setUser(data);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const fetchUser = () => {
    fetch(`http://localhost:5000/users/${authUser.sub}`)
      .then((response) => {
        if (response.status === 204) {
          return createUser();
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setUser(data);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

  return (
    <React.Fragment>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <h1>{user && user.name}</h1>
            {isAuthenticated ? (
              <Button
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Log Out
              </Button>
            ) : (
              <Button onClick={() => loginWithRedirect()}>Log In</Button>
            )}
          </Stack>
          {isAuthenticated && <MasksList user={user} />}
        </div>
      )}
    </React.Fragment>
  );
};

export default Main;
