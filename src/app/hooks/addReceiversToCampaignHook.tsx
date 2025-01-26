import { useCampaignStore } from '@app/stores/campaingStore';
import { useReceiverStore } from '@app/stores/receiversStore';
import { Person } from '@app/types/person/person';

const useAddUsersToCampaign = () => {
  const { addUsersToCampaign } = useCampaignStore();
  const { addCampaignToReceiver } = useReceiverStore();

  const addReceivers = (campaignId: number, receivers: Person[]) => {
    try {
      addUsersToCampaign(campaignId, receivers);
      addCampaignToReceiver(receivers, campaignId);
    } catch (e) {
      throw new Error(
        `Failed to add receivers to campaign: ${(e as Error).message}`
      );
    }
  };

  return addReceivers;
};

export default useAddUsersToCampaign;
