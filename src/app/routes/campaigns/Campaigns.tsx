import CampaignsTable from '@components/campaigns/campaignsTable/CampaignsTable';
import React from 'react';

const Campaigns: React.FC = () => {
  return (
    <div className=" w-full flex flex-col items-center h-full">
      <h1 className="text-7xl text-white font-bold">Maneja tus campañas</h1>
      <CampaignsTable />
    </div>
  );
};

export default Campaigns;
