import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Campaign } from '@app/types/campaigns/campaign';
import { CampaignStatus } from '@app/types/campaigns/status';
import { Person } from '@app/types/person/person';

interface CampaignStore {
  campaigns: Campaign[];
  selectedStatusFilterValue: CampaignStatus | null;
  selectedCampaignId: number | null;
  addCampaign: (campaign: Campaign) => void;
  removeCampaign: (id: number) => void;
  clearCampaigns: () => void;
  populateCampaigns: (campaigns: Campaign[]) => void;
  setSelectedStatusFilterValue: (status: CampaignStatus | null) => void;
  setSelectedCampaignId: (id: number | null) => void;
  addUsersToCampaign: (campaingId: number, newReceivers: Person[]) => void;
}

export const useCampaignStore = create(
  persist<CampaignStore>(
    (set) => ({
      campaigns: [],
      selectedStatusFilterValue: CampaignStatus.Activa,
      selectedCampaignId: null,
      removeCampaign: (id) =>
        set((state) => ({
          campaigns: state.campaigns.filter((campaign) => campaign.id !== id),
        })),
      addCampaign: (campaign) =>
        set((state) => {
          const existingCampaign = state.campaigns.find(
            (c) => c.id == campaign.id
          );
          if (existingCampaign) return state;

          return { campaigns: [...state.campaigns, campaign] };
        }),
      clearCampaigns: () => {
        set(() => {
          return { campaigns: [] };
        });
      },
      populateCampaigns: (campaigns: Campaign[]) =>
        set(() => ({
          campaigns: campaigns,
        })),

      setSelectedStatusFilterValue: (status: CampaignStatus | null) =>
        set(() => ({
          selectedStatusFilterValue: status,
        })),
      setSelectedCampaignId: (id: number | null) =>
        set(() => ({
          selectedCampaignId: id,
        })),
      addUsersToCampaign: (campaignId: number, newReceivers: Person[]) => {
        const newReceiversId = newReceivers.map((receiver) => receiver.id);
        set((state) => ({
          campaigns: state.campaigns.map((campaign) =>
            campaign.id === campaignId
              ? {
                  ...campaign,
                  associatedReceivers: [
                    ...(campaign.associatedReceivers || []),
                    ...newReceiversId,
                  ],
                }
              : campaign
          ),
        }));
      },
    }),
    { name: 'campaign-items' }
  )
);
