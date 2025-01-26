import { create } from 'zustand';

type ToastState = {
  visible: boolean;
  message: string;
  severity: 'success' | 'info' | 'warn' | 'error';
  showToast: (
    message: string,
    severity: 'success' | 'info' | 'warn' | 'error'
  ) => void;
  hideToast: () => void;
};

const useToastStore = create<ToastState>((set) => ({
  visible: false,
  message: '',
  severity: 'success',
  showToast: (message, severity) => set({ visible: true, message, severity }),
  hideToast: () => set({ visible: false, message: '', severity: 'success' }),
}));

export default useToastStore;
