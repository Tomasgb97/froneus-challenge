import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@material-ui/core';

interface CreateNewUserDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (username: string, email: string) => void;
}

const CreateNewUserDialog: React.FC<CreateNewUserDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleCreate = () => {
    onCreate(username, email);
    setUsername('');
    setEmail('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewUserDialog;
