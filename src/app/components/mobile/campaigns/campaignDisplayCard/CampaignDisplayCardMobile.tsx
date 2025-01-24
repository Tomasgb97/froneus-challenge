import { getDateStringWithoutTime } from '@app/lib/getDateStringWithoutTime';
import { Campaign } from '@app/types/campaigns/campaign';
import { CampaignStatus } from '@app/types/campaigns/status';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';

interface CampaignDisplayCardMobileProps {
  campaign: Campaign;
}

const CampaignDisplayCardMobile: React.FC<CampaignDisplayCardMobileProps> = ({
  campaign,
}) => {
  const navigate = useNavigate();
  const statusTextStyle = useMemo(() => {
    const statusColor = {
      [CampaignStatus.Activa]: 'text-green-500 font-semibold',
      [CampaignStatus.EnEspera]: 'text-yellow-500 font-semibold',
      [CampaignStatus.Finalizada]: 'text-red-500 font-semibold',
    };

    return statusColor[campaign.status] || 'black';
  }, [campaign.status]);

  const header = (
    <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    />
  );
  const footer = (
    <>
      <Button
        onClick={() => navigate(`/campaigns/${campaign.id}`)}
        label="Editar"
        className="bg-primary-600 p-2 text-white"
      />
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
        pt={{ subTitle: { className: statusTextStyle } }}
      >
        <ul>
          <li>
            <span className="font-semibold">Creada</span>:{' '}
            {getDateStringWithoutTime(campaign.createdAt)}
          </li>
          <li>
            <span className="font-semibold">Empieza</span>:{' '}
            {getDateStringWithoutTime(campaign.startAt)}
          </li>
          <li>
            <span className="font-semibold">Grabacion</span>:{' '}
            {campaign.recording ? 'SI' : 'NO'}{' '}
          </li>
          <li>
            <span className="font-semibold">Asociados</span>:{' '}
            {campaign.associatedReceivers.length}
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default CampaignDisplayCardMobile;
