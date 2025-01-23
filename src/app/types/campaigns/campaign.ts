import { CampaignStatus } from '@app/types/campaigns/status';

export interface Campaign {
  id: string;
  name: string;
  createdAt: Date;
  startAt: Date;
  recording: boolean;
  status: CampaignStatus;
}
