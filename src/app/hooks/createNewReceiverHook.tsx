import { useReceiverStore } from '@app/stores/receiversStore';
import { Person } from '@app/types/person/person';
import useAddUsersToCampaign from './addReceiversToCampaignHook';
import { useState } from 'react';

const useCreateNewReceiver = () => {
  const [showCreateNewReceiverDialog, setShowNewReceiverDialog] =
    useState(true);
  const { receivers } = useReceiverStore();
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
    associatedCampaigns.forEach((campaignId) =>
      addReceivers(campaignId, [newReceiver])
    );
  };

  return {
    showCreateNewReceiverDialog,
    setShowNewReceiverDialog,
    createNewReceiver,
  };
};

export default useCreateNewReceiver;
