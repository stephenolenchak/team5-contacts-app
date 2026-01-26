import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function EditContact({ open, contact, onClose }) {
  if (!contact) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Contact</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Name" defaultValue={contact.name} />
          <TextField label="Email" defaultValue={contact.email} />
          <TextField label="Phone" defaultValue={contact.phone} />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onClose}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

