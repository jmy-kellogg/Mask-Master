import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";

import DeleteUserDialog from "../DeleteUserDialog";

const useStyles = makeStyles({
  drawer: {
    width: 200,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 200,
  },
  form: {
    display: "flex",
  },
});

const Sidebar = (props) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [userDialog, setUserDialog] = useState(null);

  const handleClickOpen = (user) => {
    setUserDialog(user);
  };

  const handleClose = (didDelete) => {
    setUserDialog(null);
    if (didDelete) props.fetchUsers();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    }).then(() => {
      props.fetchUsers();
      setName("");
    });
  };

  return (
    <React.Fragment>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          <ListItem divider key="add-user">
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                required
                id="person-name-input"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="New Person"
                size="small"
              />
              <IconButton aria-label="edit" color="primary" type="submit">
                <AddIcon />
              </IconButton>
            </form>
          </ListItem>
          {props.users.map((user) => (
            <ListItem divider dense key={user.uuid}>
              <ListItemText primary={user.name} />
              <IconButton
                aria-label="delete"
                onClick={() => handleClickOpen(user)}
              >
                <CloseIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {userDialog && (
        <DeleteUserDialog user={userDialog} onClose={handleClose} />
      )}
    </React.Fragment>
  );
};

export default Sidebar;
