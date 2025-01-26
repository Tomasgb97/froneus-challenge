import { useCampaignStore } from '@app/stores/campaingStore';
import { CampaignStatus } from '@app/types/campaigns/status';
import { Campaign } from '@app/types/campaigns/campaign';
import { Person } from '@app/types/person/person';
import { useReceiverStore } from '@app/stores/receiversStore';

const useCreateCampaign = () => {
  const { campaigns, addCampaign } = useCampaignStore();
  const { addCampaignToReceiver } = useReceiverStore();

  const createCampaign = ({
    name,
    createdAt,
    startAt,
    recording,
    status,
    associatedReceivers,
  }: {
    id: number;
    name: string;
    createdAt: string;
    startAt: string;
    recording: boolean;
    status: CampaignStatus;
    associatedReceivers: Person[];
  }) => {
    const newCampaign: Campaign = {
      id: campaigns.length + 1,
      name,
      startAt,
      createdAt,
      associatedReceivers: associatedReceivers.map((receiver) => receiver.id),
      status,
      recording,
    };

    addCampaign(newCampaign);
    addCampaignToReceiver(associatedReceivers, newCampaign.id);
  };

  return {
    createCampaign,
  };
};

export default useCreateCampaign;
