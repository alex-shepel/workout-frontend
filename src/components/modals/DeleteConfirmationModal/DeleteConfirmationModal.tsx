import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import React, { FC } from 'react';
import { IProps } from './types';

const DeleteConfirmationModal: FC<IProps> = props => {
  const { goal, open, onConfirm, onClose } = props;
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Are you sure you want to delete {goal}?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete {goal}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm}>Yes</Button>
        <Button onClick={onClose} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
