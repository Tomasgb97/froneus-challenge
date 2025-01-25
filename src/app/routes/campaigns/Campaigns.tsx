import { useCampaignStore } from '@app/stores/campaingStore';
import CampaignsTable from '@components/campaigns/campaignsTable/CampaignsTable';
import CampaignsCardsGrid from '@components/mobile/campaigns/campaignsCardsGrid/CampaignsCardsGrids';
import { Divider } from 'primereact/divider';
import CustomConfirmDialog from '@components/common/confirmDialog';
import React from 'react';

const Campaigns: React.FC = () => {
  const { removeCampaign, setSelectedCampaignId, selectedCampaignId } =
    useCampaignStore();

  return (
    <div className=" p-4 w-full flex flex-col items-center h-full">
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

      <h1 className="title-lg">Maneja tus campañas</h1>
      <Divider layout="horizontal" className="flex h-0.5 bg-primary-900" />
      <div className=" hidden md:flex">
        <CampaignsTable />
      </div>
      <CampaignsCardsGrid />
    </div>
  );
};

export default Campaigns;
