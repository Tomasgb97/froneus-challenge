import { useReceiverStore } from '@app/stores/recieversStore';
import { Campaign } from '@app/types/campaigns/campaign';
import { ListBox } from 'primereact/listbox';
import React, { useMemo, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Person } from '@app/types/person/person';

interface AssociatesProps {
  campaign: Campaign;
}

const Associates: React.FC<AssociatesProps> = ({
  campaign,
}: AssociatesProps) => {
  const { receivers } = useReceiverStore();
  const [selectedReceiver, setSelectedReceiver] = useState<Person | null>(null);
  const associatedRecievers = useMemo(() => {
    return receivers.filter((reciever) =>
      reciever.associatedCampaigns.includes(campaign.id)
    );
  }, [campaign, receivers]);

  const InfoDialog = () => {
    return (
      <Dialog
        className="md:min-w-[600px] md:aspect-[16/3]"
        header={`${selectedReceiver?.name}  ${selectedReceiver?.surname}`}
        visible={selectedReceiver !== null}
        onHide={() => {
          setSelectedReceiver(null);
        }}
      >
        <span className="font-bold ">Teléfono: </span>{' '}
        <p className="text-primary-300">{selectedReceiver?.phone}</p>
      </Dialog>
    );
  };

  return (
    <div>
      <InfoDialog />
      <h1 className="text-primary-300">Asociados a la campaña</h1>
      <div className=" flex justify-content-center">
        <ListBox
          filter
          onChange={(e) => {
            console.log(e);
            setSelectedReceiver(e.value);
          }}
          options={associatedRecievers}
          itemTemplate={(option) => (
            <div className="hover:text-primary-300">
              {option.name} {option.surname}
            </div>
          )}
          filterBy="name,surname"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Associates;
