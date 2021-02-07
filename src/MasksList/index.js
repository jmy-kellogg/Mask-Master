import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";

import Mask from "../Mask";

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
  title: {
    margin: "10px",
  },
  button: {
    margin: "10px",
  },
  form: {
    display: "flex",
  },
});

const MaskList = (props) => {
  const classes = useStyles();
  const [masks, setMasks] = useState([]);
  const [name, setName] = useState("");

  const fetchMaskList = () => {
    fetch(`http://localhost:5000/masks?user=${props.user.uuid}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMasks(data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/masks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, userUuid: props.user.uuid }),
    }).then(() => {
      fetchMaskList();
      setName("");
    });
  };

  useEffect(() => {
    fetchMaskList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <h1 className={classes.title}>{props.user.name}</h1>
        </Grid>
        <Grid item>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              required
              id="mask-name-input"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="New Mask's Name"
              size="small"
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size="small"
              type="submit"
            >
              Add Mask
            </Button>
          </form>
        </Grid>
      </Grid>

      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Use Count</TableCell>
            <TableCell align="right">Last time Used</TableCell>
            <TableCell align="right">Next Use</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {masks.map((mask) => (
            <Mask key={mask.uuid} mask={mask} fetchMaskList={fetchMaskList} />
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default MaskList;
