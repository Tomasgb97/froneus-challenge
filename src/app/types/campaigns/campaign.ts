import { CampaignStatus } from '@app/types/campaigns/status';

export interface Campaign {
  id: number;
  name: string;
  createdAt: string;
  startAt: string;
  recording: boolean;
  status: CampaignStatus;
  associatedReceivers: number[];
}
