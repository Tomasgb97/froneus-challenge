import React, { useRef } from 'react';
import { ConfirmDialog, ConfirmDialogProps } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

interface customConfirmDialogProps extends ConfirmDialogProps {
  dialogMessage: string;
  dialogHeader: string;
  acceptLabel: string;
  cancelLabel: string;
  onAccept?: () => void;
  onReject?: () => void;
}

export default function CustomconfirmDialog({
  dialogMessage,
  dialogHeader,
  acceptLabel,
  cancelLabel,
  onAccept,
  onReject,
  visible,
  onHide,
}: customConfirmDialogProps) {
  const toast = useRef<Toast>(null);

  const accept = () => {
    onAccept && onAccept();
    toast.current?.show({
      severity: 'info',
      summary: 'Confirmado',
      detail: 'Has confirmado',
      life: 3000,
    });
  };

  const reject = () => {
    onReject && onReject();
    toast.current?.show({
      severity: 'warn',
      summary: 'Cancelado',
      detail: 'Has cancelado',
      life: 3000,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog
        message={dialogMessage}
        header={dialogHeader}
        onHide={onHide}
        visible={visible}
        icon="pi pi-info-circle"
        reject={reject}
        accept={accept}
        rejectLabel={cancelLabel}
        acceptLabel={acceptLabel}
        acceptClassName="p-button-danger bg-red-500 text-white p-1 m-1"
        rejectClassName="p-button bg-primary-300 text-white p-1 m-1"
      />
    </>
  );
}
