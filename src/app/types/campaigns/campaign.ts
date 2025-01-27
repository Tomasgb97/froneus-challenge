import { CampaignStatus } from '@app/types/campaigns/status';

export interface Campaign {
  id: string;
  name: string;
  createdAt: string;
  startAt: string;
  recording: boolean;
  status: CampaignStatus;
  associatedReceivers: number[];
}
