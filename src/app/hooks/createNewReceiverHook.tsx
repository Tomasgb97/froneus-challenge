import { useReceiverStore } from '@app/stores/receiversStore';
import { Person } from '@app/types/person/person';
import useAddUsersToCampaign from './addReceiversToCampaignHook';

const useCreateNewReceiver = () => {
  const { receivers, addReceiver } = useReceiverStore();
  const { addReceivers } = useAddUsersToCampaign();

  const createNewReceiver = ({
    name,
    surname,
    phone,
    associatedCampaigns,
  }: {
    name: string;
    surname: string;
    phone: string;
    associatedCampaigns: number[];
  }) => {
    const newReceiver: Person = {
      id: receivers.length + 1,
      name,
      surname,
      phone,
      associatedCampaigns,
    };

    addReceiver(newReceiver);

    associatedCampaigns.forEach((campaignId) =>
      addReceivers(campaignId, [newReceiver])
    );
  };

  return {
    createNewReceiver,
  };
};

export default useCreateNewReceiver;
