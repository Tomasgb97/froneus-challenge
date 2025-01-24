import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useCampaignStore } from '@app/stores/campaingStore';
import { Campaign } from '@app/types/campaigns/campaign';
import { Button } from 'primereact/button';
import { CampaignStatus } from '@app/types/campaigns/status';
import CustomConfirmDialog from '@components/common/confirmDialog';
import { useNavigate } from 'react-router';

const CampaignsTable: React.FC = () => {
  const { campaigns, removeCampaign } = useCampaignStore();
  const navigate = useNavigate();
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(
    null
  );

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

  return (
    <div>
      <CustomConfirmDialog
        dialogMessage="Estas seguro de borrar esta campaña?"
        dialogHeader="Confirmar eliminacion"
        visible={selectedCampaignId !== null}
        onHide={() => setSelectedCampaignId(null)}
        acceptLabel="Si borrar"
        cancelLabel="Cancelar"
        onAccept={() => {
          if (selectedCampaignId) removeCampaign(selectedCampaignId);
          setSelectedCampaignId(null);
        }}
        onReject={() => setSelectedCampaignId(null)}
      />
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
          body={(campaign) => recordingBodyTemplate(campaign)}
          header="Grabado"
        ></Column>
        <Column align={'center'} field="status" header="Estado"></Column>

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
