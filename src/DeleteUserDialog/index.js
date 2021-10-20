import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const DeleteUserDialog = (props) => {
  const handleDelete = (uuid) => {
    fetch(`http://localhost:5000/users/${uuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      props.onClose(true);
    });
  };

  return (
    <Dialog
      open
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the user {props.user.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary" autoFocus>
          No
        </Button>
        <Button onClick={() => handleDelete(props.user.uuid)} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;
