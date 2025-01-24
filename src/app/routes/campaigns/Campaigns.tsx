import CampaignsTable from '@components/campaigns/campaignsTable/CampaignsTable';
import CampaignsCardsGrid from '@components/mobile/campaigns/campaignsCardsGrid/CampaignsCardsGrids';
import { Divider } from 'primereact/divider';
import React from 'react';

const Campaigns: React.FC = () => {
  return (
    <div className=" p-4 w-full flex flex-col items-center h-full">
      <h1 className="text-7xl text-white font-bold">Maneja tus campañas</h1>
      <Divider layout="horizontal" className="flex h-0.5 bg-primary-900" />
      <div className=" hidden md:flex">
        <CampaignsTable />
      </div>
      <CampaignsCardsGrid />
    </div>
  );
};

export default Campaigns;
