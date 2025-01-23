import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Campaign } from '@app/types/campaigns/campaign';

interface CampaignStore {
  campaigns: Campaign[];
  addCampaign: (campaign: Campaign) => void;
  removeCampaign: (id: number) => void;
  clearCampaigns: () => void;
  populateCampaigns: (campaigns: Campaign[]) => void;
}

export const useCampaignStore = create(
  persist<CampaignStore>(
    (set) => ({
      campaigns: [],
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
    }),
    { name: 'campaign-items' }
  )
);
