import { Campaign } from '@app/types/campaigns/campaign';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React from 'react';

interface CampaignDisplayCardMobileProps {
  campaign: Campaign;
}

const CampaignDisplayCardMobile: React.FC<CampaignDisplayCardMobileProps> = ({
  campaign,
}) => {
  const header = (
    <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    />
  );
  const footer = (
    <>
      <Button label="Editar" className="bg-primary-600 p-2 text-white" />
      <Button
        label="Eliminar"
        severity="secondary"
        className="bg-red-500 p-2 text-white"
        style={{ marginLeft: '0.5em' }}
      />
    </>
  );

  return (
    <div className="card flex justify-content-center">
      <Card
        title={campaign.name}
        subTitle={campaign.status}
        footer={footer}
        header={header}
        className="md:w-25rem"
      >
        <ul>
          <li>Creada:</li>
          <li>Empieza: </li>
          <li>Grabacion: {campaign.recording ? 'SI' : 'NO'} </li>
          <li>Asociados: {campaign.associatedReceivers.length}</li>
        </ul>
      </Card>
    </div>
  );
};

export default CampaignDisplayCardMobile;
