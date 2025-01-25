import { Campaign } from '@app/types/campaigns/campaign';
import React from 'react';

interface DataDisplayProps {
  campaign: Campaign;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ campaign }) => {
  return (
    <div>
      <h2>Data Display</h2>
      <pre>{JSON.stringify(campaign, null, 2)}</pre>
    </div>
  );
};

export default DataDisplay;
