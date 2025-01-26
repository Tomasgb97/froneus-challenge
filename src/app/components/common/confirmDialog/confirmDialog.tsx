import { ConfirmDialog, ConfirmDialogProps } from 'primereact/confirmdialog';

import useToast from '@hooks/UI/useToast';

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
  const { fireToast } = useToast();

  const accept = () => {
    onAccept && onAccept();
    fireToast('Confirmado con exito!', 'success');
  };

  const reject = () => {
    onReject && onReject();
    fireToast('Has cancelado', 'warn');
  };

  return (
    <>
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
