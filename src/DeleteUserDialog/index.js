import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

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
