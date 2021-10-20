import React, { useState } from "react";
import moment from "moment";
import { IconButton, TableCell, TableRow } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const Mask = (props) => {
  const [mask, setMask] = useState(props.mask);

  const lastUsed = mask.lastUsed && moment(mask.lastUsed);
  const nextTimeToUse = moment(mask.lastUsed).add(5, "days");
  const isExpired = parseInt(mask.timesUsed) > 4;
  const isDirty = moment()
    .startOf("day")
    .isBefore(nextTimeToUse.startOf("day"));

  const markAsUsed = () => {
    const newCount = parseInt(mask.timesUsed || 0) + 1;
    const newMask = {
      ...mask,
      timesUsed: newCount,
      lastUsed: moment().toISOString(),
    };

    fetch(`http://localhost:5000/masks/${mask.uuid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMask),
    }).then(() => {
      setMask(newMask);
    });
  };

  const handleDelete = (uuid) => {
    fetch(`http://localhost:5000/masks/${uuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      props.fetchMaskList();
    });
  };

  return (
    <TableRow key={mask.uuid}>
      <TableCell component="th" scope="row">
        {mask.name}
      </TableCell>
      <TableCell align="right">{mask.timesUsed}</TableCell>
      <TableCell align="right">
        {lastUsed && lastUsed.format("MMM DD")}
      </TableCell>
      <TableCell align="right">
        {lastUsed && nextTimeToUse.format("MMM DD")}
      </TableCell>
      <TableCell align="right">
        {isExpired ? (
          <IconButton
            onClick={() => handleDelete(mask.uuid)}
            aria-label="delete"
            color={isExpired ? "secondary" : "primary"}
          >
            <DeleteIcon />
          </IconButton>
        ) : (
          <IconButton
            disabled={isDirty}
            onClick={markAsUsed}
            aria-label="add"
            color="primary"
          >
            <CheckCircleOutlineIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export default Mask;
