import { Campaign } from '@app/types/campaigns/campaign';
import { CampaignStatus } from '@app/types/campaigns/status';
import { generateRandomColors } from './generateRandomColors';

export function getChartData(
  campaigns: Campaign[],
  status?: CampaignStatus | null
) {
  let newCampaigns = campaigns;
  if (status) {
    newCampaigns = campaigns.filter((campaign) => campaign.status == status);
  }

  const colors = generateRandomColors(newCampaigns.length);

  const data = {
    labels: [] as string[],
    datasets: [
      {
        label: 'Personas asociadas',
        data: [] as number[],
        backgroundColor: colors,
      },
    ],
  };

  for (let i = 0; i < newCampaigns.length; i++) {
    data.labels.push(newCampaigns[i].name);
    data.datasets[0].data.push(newCampaigns[i].associatedReceivers.length - 1);
  }

  return data;
}
