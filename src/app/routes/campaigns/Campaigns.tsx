import { useCampaignStore } from '@app/stores/campaingStore';
import React from 'react';

const Campaigns: React.FC = () => {
  const { campaigns } = useCampaignStore();
  return (
    <div className="h-full">
      <h1>Campaigns</h1>
      {campaigns.map((campaign, i) => (
        <p key={i}>{campaign.name}</p>
      ))}
    </div>
  );
};

export default Campaigns;
