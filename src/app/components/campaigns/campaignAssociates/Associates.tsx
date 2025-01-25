import { useReceiverStore } from '@app/stores/recieversStore';
import { Campaign } from '@app/types/campaigns/campaign';
import { ListBox } from 'primereact/listbox';
import React, { useMemo } from 'react';

interface AssociatesProps {
  campaign: Campaign;
}

const Associates: React.FC<AssociatesProps> = ({
  campaign,
}: AssociatesProps) => {
  const { receivers } = useReceiverStore();

  const associatedRecievers = useMemo(() => {
    return receivers.filter((reciever) =>
      reciever.associatedCampaigns.includes(campaign.id)
    );
  }, [campaign, receivers]);

  return (
    <div>
      <h1>Campaign Associates</h1>
      <div className="card flex justify-content-center">
        <ListBox
          filter
          options={associatedRecievers}
          itemTemplate={(option) => (
            <div>
              {option.name} {option.surname}
            </div>
          )}
          filterBy="name,surname"
          className="w-full md:w-14rem"
        />
      </div>
    </div>
  );
};

export default Associates;
