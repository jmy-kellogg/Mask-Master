import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";

import MasksList from "../MasksList";

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch("http://localhost:5000/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main>
      {users.map((user) => (
        <Card key={user.uuid}>
          <MasksList user={user} />
        </Card>
      ))}
    </main>
  );
}

export default App;
