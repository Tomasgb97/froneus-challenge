import { getDateStringWithoutTime } from '@app/lib/getDateStringWithoutTime';
import { useCampaignStore } from '@app/stores/campaingStore';
import { Campaign } from '@app/types/campaigns/campaign';
import { CampaignStatus } from '@app/types/campaigns/status';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';

interface CampaignDisplayCardProps {
  campaign: Campaign;
  hasButtons?: boolean;
}

const CampaignDisplayCard: React.FC<CampaignDisplayCardProps> = ({
  campaign,
  hasButtons = true,
}) => {
  const navigate = useNavigate();
  const { setSelectedCampaignId } = useCampaignStore();
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
        disabled={campaign.status == CampaignStatus.Finalizada}
        onClick={() => navigate(`/campaign/${campaign.id}`)}
        label="Editar"
        className="bg-primary-600 p-2 text-white"
      />
      <Button
        disabled={
          campaign.status == CampaignStatus.Activa ||
          campaign.status == CampaignStatus.Finalizada
        }
        label="Eliminar"
        severity="secondary"
        className="bg-red-500 p-2 text-white"
        style={{ marginLeft: '0.5em' }}
        onClick={() => setSelectedCampaignId(campaign.id)}
      />
    </>
  );

  return (
    <div className="card flex justify-content-center">
      <Card
        title={campaign.name}
        subTitle={campaign.status}
        footer={hasButtons && footer}
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

export default CampaignDisplayCard;
