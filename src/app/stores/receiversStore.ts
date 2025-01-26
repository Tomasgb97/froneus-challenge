import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Person } from '@app/types/person/person';

interface ReceiverStore {
  receivers: Person[];
  addReceiver: (receiver: Person) => void;
  removeReceiver: (id: number) => void;
  clearReceivers: () => void;
  populateReceivers: (receivers: Person[]) => void;
  addCampaignToReceiver: (receivers: Person[], campaignId: number);
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
      populateReceivers: (receivers: Person[]) =>
        set(() => ({
          receivers: receivers,
        })),
      addCampaignToReceiver: (newReceivers: Person[], campaignId: number) =>
        set((state) => {
          const existingReceiversMap = new Map(
            state.receivers.map((existingReceiver) => [
              existingReceiver.id,
              existingReceiver,
            ])
          );

          for (const newReceiver of newReceivers) {
            const existingReceiver = existingReceiversMap.get(newReceiver.id);
            if (existingReceiver) {
              if (!existingReceiver.associatedCampaigns.includes(campaignId)) {
                existingReceiver.associatedCampaigns.push(campaignId);
              }
            }
          }

          return { receivers: Array.from(existingReceiversMap.values()) };
        }),
    }),

    { name: 'receiver-items' }
  )
);
