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

  return (
    <div className="card">
      <DataTable value={campaigns} tableStyle={{ minWidth: '50rem' }}>
        <Column field="name" header="Nombre"></Column>
        <Column
          field="createdAt"
          body={(campaignData) => datesBodyTemplate(campaignData, 'created')}
          header="Creada"
        ></Column>
        <Column
          field="startAt"
          body={(campaignData) => datesBodyTemplate(campaignData, 'startsAt')}
          header="A partir de"
        ></Column>
        <Column field="recording" header="Grabado"></Column>
        <Column field="status" header="Estado"></Column>
      </DataTable>
    </div>
  );
};

export default CampaignsTable;
