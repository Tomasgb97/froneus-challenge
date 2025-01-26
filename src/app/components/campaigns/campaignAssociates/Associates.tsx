import { useReceiverStore } from '@app/stores/receiversStore';
import { Campaign } from '@app/types/campaigns/campaign';
import { ListBox } from 'primereact/listbox';
import React, { useMemo, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Person } from '@app/types/person/person';
import { useCampaignStore } from '@app/stores/campaingStore';

interface AssociatesProps {
  campaign: Campaign;
}

const Associates: React.FC<AssociatesProps> = ({
  campaign,
}: AssociatesProps) => {
  const { receivers } = useReceiverStore();
  const { campaigns } = useCampaignStore();
  const [selectedReceiver, setSelectedReceiver] = useState<Person | null>(null);
  const associatedReceivers = useMemo(() => {
    let thisCampaignReceivers: Person[] = [];
    campaign.associatedReceivers.forEach((receiverId) => {
      const associatedPerson = receivers.find((rec) => rec.id == receiverId);
      if (associatedPerson) {
        thisCampaignReceivers.push(associatedPerson);
      }
    });
    return thisCampaignReceivers;
  }, [campaign, receivers, selectedReceiver]);

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
        <h1 className="font-bold mt-5">Campañas asocidas</h1>
        {selectedReceiver?.associatedCampaigns.map((campaignId, i) => {
          const matchingCamapaing = campaigns.find(
            (campaign) => campaign.id == campaignId
          );
          if (matchingCamapaing)
            return (
              <li
                key={i}
                className="text-primary-300 hover:text-primary-600 transition"
              >
                <a href={`/campaign/${campaignId}`}>{matchingCamapaing.name}</a>
              </li>
            );
        })}
      </Dialog>
    );
  };

  return (
    <div>
      <InfoDialog />
      <h1 className="text-primary-300">Asociados a la campaña</h1>
      <div className=" flex justify-content-center">
        <ListBox
          listClassName="h-72"
          filter
          onChange={(e) => {
            setSelectedReceiver(e.value);
          }}
          options={associatedReceivers}
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
