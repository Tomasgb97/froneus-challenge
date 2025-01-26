import { useCampaignStore } from '@app/stores/campaingStore';
import { useReceiverStore } from '@app/stores/receiversStore';
import { Person } from '@app/types/person/person';
import useToast from './UI/useToast';
const useAddUsersToCampaign = () => {
  const { addUsersToCampaign } = useCampaignStore();
  const { addCampaignToReceiver } = useReceiverStore();
  const { fireToast } = useToast();

  const addReceivers = (campaignId: number, receivers: Person[]) => {
    try {
      addUsersToCampaign(campaignId, receivers);
      addCampaignToReceiver(receivers, campaignId);

      fireToast('Confirmado con exito!', 'success');
    } catch (e) {
      fireToast(
        'Hubo un error agregando el nuevo usuario a la campaña',
        'error'
      );
      throw new Error(
        `Failed to add receivers to campaign: ${(e as Error).message}`
      );
    }
  };

  return { addReceivers };
};

export default useAddUsersToCampaign;
