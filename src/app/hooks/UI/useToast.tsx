import useToastStore from '@app/stores/UI/toastStore';

const useToast = () => {
  const { showToast, hideToast } = useToastStore();

  const fireToast = (
    message: string,
    severity: 'success' | 'info' | 'warn' | 'error'
  ) => {
    showToast(message, severity);
    setTimeout(() => {
      hideToast();
    }, 3000);
  };

  return { fireToast };
};

export default useToast;
