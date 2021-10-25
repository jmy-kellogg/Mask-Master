import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MasksList from "../MasksList";
import Login from "../Login";

function App() {
  const [user, setUser] = useState({});

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login onSetUser={setUser} />
        </Route>
        <Route path="/">
          <MasksList user={user} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
