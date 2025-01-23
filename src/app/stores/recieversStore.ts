import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Person } from '@app/types/person/person';

interface ReceiverStore {
  receivers: Person[];
  addReceiver: (receiver: Person) => void;
  removeReceiver: (id: number) => void;
  clearReceivers: () => void;
}

export const useReceiverStore = create(
  persist<ReceiverStore>(
    (set) => ({
      receivers: [],
      removeReceiver: (id) =>
        set((state) => ({
          receivers: state.receivers.filter((receiver) => receiver.id !== id),
        })),
      addReceiver: (receiver) =>
        set((state) => {
          const existingReceiver = state.receivers.find(
            (r) => r.id == receiver.id
          );
          if (existingReceiver) return state;

          return { receivers: [...state.receivers, receiver] };
        }),
      clearReceivers: () => {
        set(() => {
          return { receivers: [] };
        });
      },
    }),
    { name: 'receiver-items-ids' }
  )
);
