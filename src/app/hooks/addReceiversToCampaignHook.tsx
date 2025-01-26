import { useCampaignStore } from '@app/stores/campaingStore';
import { useReceiverStore } from '@app/stores/receiversStore';
import { Person } from '@app/types/person/person';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const useAddUsersToCampaign = () => {
  const { addUsersToCampaign } = useCampaignStore();
  const { addCampaignToReceiver } = useReceiverStore();
  const addReceiverToastRef = useRef<Toast | null>(null);

  const addReceivers = (campaignId: number, receivers: Person[]) => {
    try {
      addUsersToCampaign(campaignId, receivers);
      addCampaignToReceiver(receivers, campaignId);

      addReceiverToastRef.current?.show({
        severity: 'success',
        summary: 'Exito!',
        detail: 'Se agregaron los usuarios nuevos a la campaña!',
        life: 3000,
      });
    } catch (e) {
      addReceiverToastRef.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No pudieron agregarse los nuevos usuarios. intente nuevamente',
        life: 3000,
      });
      throw new Error(
        `Failed to add receivers to campaign: ${(e as Error).message}`
      );
    }
  };

  return { addReceivers, addReceiverToastRef };
};

export default useAddUsersToCampaign;
