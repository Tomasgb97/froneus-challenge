import { create } from 'zustand';

// Define the type for the UI store
type UIStore = {
  showCreateNewReceiverModal: boolean;
  toggleCreateNewReceiverModal: () => void;
};

// Create the Zustand store
const useUIStore = create<UIStore>((set) => ({
  showCreateNewReceiverModal: false, // Initial state
  toggleCreateNewReceiverModal: () =>
    set((state) => ({
      showCreateNewReceiverModal: !state.showCreateNewReceiverModal,
    })),
}));

export default useUIStore;
