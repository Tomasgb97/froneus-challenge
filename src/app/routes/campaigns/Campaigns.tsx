import CampaignsTable from '@components/campaigns/campaignsTable/CampaignsTable';
import { Divider } from 'primereact/divider';
import React from 'react';

const Campaigns: React.FC = () => {
  return (
    <div className=" w-full flex flex-col items-center h-full">
      <h1 className="text-7xl text-white font-bold">Maneja tus campañas</h1>
      <Divider layout="horizontal" className="flex h-0.5 bg-primary-900" />
      <CampaignsTable />
    </div>
  );
};

export default Campaigns;
