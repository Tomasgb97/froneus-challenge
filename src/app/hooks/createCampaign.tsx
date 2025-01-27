import { useCampaignStore } from '@app/stores/campaingStore';
import { CampaignStatus } from '@app/types/campaigns/status';
import { Campaign } from '@app/types/campaigns/campaign';
import { Person } from '@app/types/person/person';
import { useReceiverStore } from '@app/stores/receiversStore';
import useToast from './UI/useToast';

const useCreateCampaign = () => {
  const { campaigns, addCampaign } = useCampaignStore();
  const { addCampaignToReceivers } = useReceiverStore();
  const { fireToast } = useToast();

  const createCampaign = ({
    name,
    startAt,
    recording,
    status,
    associatedReceivers,
  }: {
    id: number;
    name: string;
    startAt: string;
    recording: boolean;
    status: CampaignStatus;
    associatedReceivers: Person[];
  }) => {
    try {
      const newCampaign: Campaign = {
        id: campaigns.length + 1,
        name,
        startAt,
        createdAt: new Date().toISOString(),
        associatedReceivers: associatedReceivers.map((receiver) => receiver.id),
        status,
        recording,
      };

      addCampaign(newCampaign);
      addCampaignToReceivers(associatedReceivers, newCampaign.id);
      fireToast('La campaña fue creada con exito!', 'success');
    } catch (e) {
      fireToast('Hubo un error creando la campaña', 'error');
      throw new Error(
        `Failed to add receivers to campaign: ${(e as Error).message}`
      );
    }
  };

  return {
    createCampaign,
  };
};

export default useCreateCampaign;
