import { Campaign } from '@app/types/campaigns/campaign';
import { CampaignStatus } from '@app/types/campaigns/status';
import { generateRandomColors } from './generateRandomColors';

export function getChartData(campaigns: Campaign[], status?: CampaignStatus) {
  if (status) {
    campaigns.filter((campaign) => campaign.status == status);
  }

  const colors = generateRandomColors(campaigns.length - 1);

  const data = {
    labels: [] as string[],
    datasets: {
      data: [] as number[],
      backgroundColor: colors,
    },
  };

  for (let i = 0; i < campaigns.length; i++) {
    data.labels.push(campaigns[i].name);
    data.datasets.data.push(campaigns[i].associatedReceivers.length - 1);
  }

  return data;
}
