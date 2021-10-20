import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import Mask from "../Mask";

const MaskList = (props) => {
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
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <h1>{props.user.name}</h1>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
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

      <Table aria-label="simple table" size="small">
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
