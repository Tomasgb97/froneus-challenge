import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useCampaignStore } from '@app/stores/campaingStore';
import { Campaign } from '@app/types/campaigns/campaign';

const CampaignsTable: React.FC = () => {
  const { campaigns } = useCampaignStore();

  const datesBodyTemplate = (
    campaign: Campaign,
    type: 'created' | 'startsAt'
  ) => {
    const myDate = type == 'created' ? campaign.createdAt : campaign.startAt;

    const fullDate = new Date(myDate);
    const formattedDateWithoutTime = new Date(
      fullDate.getFullYear(),
      fullDate.getMonth(),
      fullDate.getDate()
    ).toLocaleDateString();
    return <p>{formattedDateWithoutTime}</p>;
  };

  const recordingBodyTemplate = (campaign: Campaign) => {
    return campaign.recording ? 'Si' : 'No';
  };

  return (
    <div>
      <DataTable
        className="p-2"
        pt={{
          wrapper: {
            className: 'rounded-lg',
          },
        }}
        value={campaigns}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column field="name" header="Nombre"></Column>
        <Column
          align={'center'}
          field="createdAt"
          body={(campaignData) => datesBodyTemplate(campaignData, 'created')}
          header="Creada"
        ></Column>
        <Column
          align={'center'}
          field="startAt"
          body={(campaignData) => datesBodyTemplate(campaignData, 'startsAt')}
          header="A partir de"
        ></Column>
        <Column
          align={'center'}
          field="recording"
          body={recordingBodyTemplate}
          header="Grabado"
        ></Column>
        <Column align={'center'} field="status" header="Estado"></Column>
      </DataTable>
    </div>
  );
};

export default CampaignsTable;
