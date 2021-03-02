import React, { useState } from "react";
import moment from "moment";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const Mask = (props) => {
  const [mask, setMask] = useState(props.mask);

  const lastUsed = mask.lastUsed && moment(mask.lastUsed);
  const nextTimeToUse = moment(mask.lastUsed).add(7, "days");
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
        <IconButton
          onClick={() => handleDelete(mask.uuid)}
          aria-label="delete"
          color={isExpired ? "secondary" : "primary"}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          disabled={isExpired || isDirty}
          onClick={markAsUsed}
          aria-label="add"
          color="primary"
        >
          <HowToRegIcon />
        </IconButton>
        <IconButton disabled aria-label="edit" color="primary">
          <CreateIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default Mask;
