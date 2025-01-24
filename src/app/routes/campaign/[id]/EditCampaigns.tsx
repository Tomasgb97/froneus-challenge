import { useCampaignStore } from '@app/stores/campaingStore';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import CampaignNotFound from '../CampaignNotFound';

const EditCampaigns: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { campaigns } = useCampaignStore();

  const thisCampaign = useMemo(() => {
    return campaigns.find((campaign) => campaign.id.toString() == id);
  }, [id, campaigns]);

  if (!thisCampaign) {
    return <CampaignNotFound />;
  }

  return (
    <div>
      <h1>Edit Campaign</h1>
      <p>Editing campaign with ID: {id}</p>
      <p>{thisCampaign.name}</p>

      {/* Add your form and other components here */}
    </div>
  );
};

export default EditCampaigns;
