import { useCampaignStore } from '@app/stores/campaingStore';
import React from 'react';
import CampaignDisplayCardMobile from '../campaignDisplayCard/CampaignDisplayCardMobile';

const CampaignsCardsGrid: React.FC = () => {
  const { campaigns } = useCampaignStore();
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-items-center gap-6 md:hidden">
      {campaigns.map((campaign) => {
        return (
          <CampaignDisplayCardMobile key={campaign.id} campaign={campaign} />
        );
      })}
    </div>
  );
};

export default CampaignsCardsGrid;
