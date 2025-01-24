import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Campaign } from '@app/types/campaigns/campaign';
import { Button } from 'primereact/button';
import { CampaignStatus } from '@app/types/campaigns/status';
import { useNavigate } from 'react-router';
import { getDateStringWithoutTime } from '@app/lib/getDateStringWithoutTime';
import { useCampaignStore } from '@app/stores/campaingStore';

const CampaignsTable: React.FC = ({}) => {
  const { campaigns, setSelectedCampaignId } = useCampaignStore();
  const navigate = useNavigate();

  const datesBodyTemplate = (
    campaign: Campaign,
    type: 'created' | 'startsAt'
  ) => {
    const myDate = type == 'created' ? campaign.createdAt : campaign.startAt;
    const formatedDate = getDateStringWithoutTime(myDate);

    return <p>{formatedDate}</p>;
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
        onClick={() => navigate(`/campaign/${campaign.id}`)}
      ></Button>
    );
  };

  const deleteCampaingBodyTemplate = (campaign: Campaign) => {
    return (
      <Button
        onClick={() => setSelectedCampaignId(campaign.id)}
        icon="pi pi-times"
        label={'Eliminar'}
      ></Button>
    );
  };

  const statusBodyTemplate = (campaign: Campaign) => {
    const statusColor = {
      [CampaignStatus.Activa]: 'text-green-500 font-semibold',
      [CampaignStatus.EnEspera]: 'text-yellow-500 font-semibold',
      [CampaignStatus.Finalizada]: 'text-red-500 font-semibold',
    };

    const style = statusColor[campaign.status] || 'black';
    return <p className={style}>{campaign.status}</p>;
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
        scrollable={true}
        emptyMessage="No tienes campañas en el historial"
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
          body={(campaign) => recordingBodyTemplate(campaign)}
          header="Grabado"
        ></Column>
        <Column
          align={'center'}
          body={(campaign) => statusBodyTemplate(campaign)}
          field="status"
          header="Estado"
        ></Column>

        <Column
          align={'center'}
          body={(campaign) => editCampaingBodyTemplate(campaign)}
          field="edit"
          header="Editar"
        ></Column>

        <Column
          align={'center'}
          body={(campaign) => deleteCampaingBodyTemplate(campaign)}
          field="Delete"
          header="Eliminar"
        ></Column>
      </DataTable>
    </div>
  );
};

export default CampaignsTable;
