import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../Sidebar";
import Main from "../Main";

const useStyles = makeStyles({
  app: {
    display: "flex",
    textAlign: "center",
  },
});

function App() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch("http://localhost:5000/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={classes.app}>
      <Sidebar fetchUsers={fetchUsers} users={users} />
      <Main fetchUsers={fetchUsers} users={users} />
    </div>
  );
}

export default App;
