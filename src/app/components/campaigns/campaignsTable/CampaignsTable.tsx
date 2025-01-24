import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useCampaignStore } from '@app/stores/campaingStore';
import { Campaign } from '@app/types/campaigns/campaign';
import { Button } from 'primereact/button';
import { CampaignStatus } from '@app/types/campaigns/status';

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
    return campaign.recording ? (
      <p className="font-bold text-primary-600">Si</p>
    ) : (
      <p className="font-bold">No</p>
    );
  };

  const editCampaingBodyTemplate = (campaign: Campaign) => {
    return (
      <Button
        type="button"
        className="text-primary-600"
        label="Editar"
        link
        disabled={campaign.status == CampaignStatus.Finalizada}
      ></Button>
    );
  };

  const deleteCampaingBodyTemplate = (campaign: Campaign) => {
    return (
      <Button
        type="button"
        className="text-red-500"
        label="Eliminar"
        disabled={campaign.status != CampaignStatus.EnEspera}
        onClick={() => {}}
      ></Button>
    );
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
        <Column className="font-bold" field="name" header="Nombre"></Column>
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

        <Column
          align={'center'}
          body={editCampaingBodyTemplate}
          field="edit"
          header="Editar"
        ></Column>

        <Column
          align={'center'}
          body={deleteCampaingBodyTemplate}
          field="Delete"
          header="Eliminar"
        ></Column>
      </DataTable>
    </div>
  );
};

export default CampaignsTable;
