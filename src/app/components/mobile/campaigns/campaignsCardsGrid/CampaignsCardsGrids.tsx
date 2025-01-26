import { useCampaignStore } from '@app/stores/campaingStore';
import React from 'react';
import CampaignDisplayCard from '../../../campaigns/campaignDisplayCard/CampaignDisplayCard';

const CampaignsCardsGrid: React.FC = () => {
  const { campaigns } = useCampaignStore();
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-items-center gap-6 md:hidden">
      {campaigns.length > 0 ? (
        campaigns.map((campaign) => (
          <CampaignDisplayCard key={campaign.id} campaign={campaign} />
        ))
      ) : (
        <h1 className="title-sm">No hay campañas disponibles</h1>
      )}
    </div>
  );
};

export default CampaignsCardsGrid;
