import { useCampaignStore } from '@app/stores/campaingStore';
import { useReceiverStore } from '@app/stores/receiversStore';
import { Person } from '@app/types/person/person';

const useAddUsersToCampaign = (campaignId: number, receivers: Person[]) => {
  const { addUsersToCampaign } = useCampaignStore();
  const { addCampaignToReceiver } = useReceiverStore();

  try {
    addUsersToCampaign(campaignId, receivers);
    addCampaignToReceiver(receivers, campaignId);
  } catch (e) {
    throw new Error(e);
  }
};

export default useAddUsersToCampaign;
