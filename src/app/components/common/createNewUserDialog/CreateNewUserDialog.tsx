import useCreateNewReceiver from '@hooks/createNewReceiverHook';
import { Dialog } from 'primereact/dialog';
import React from 'react';

const CreateNewUserDialog: React.FC = ({}) => {
  const { setShowNewUserDialog } = useCreateNewReceiver();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');

  return (
    <Dialog
      onHide={() => {
        setShowNewUserDialog(false);
      }}
    ></Dialog>
  );
};

export default CreateNewUserDialog;
