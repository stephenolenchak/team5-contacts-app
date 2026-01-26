import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const DeleteContact = ({ open, contact, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Contact</DialogTitle>
      <DialogContent>
        Are you sure you want to delete {contact?.name}?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={() => onConfirm(contact.id)}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteContact;
