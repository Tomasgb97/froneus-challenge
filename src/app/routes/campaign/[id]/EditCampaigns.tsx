import { useCampaignStore } from '@app/stores/campaingStore';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import CampaignNotFound from '../CampaignNotFound';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import CampaignDisplayCard from '@components/campaigns/campaignDisplayCard/CampaignDisplayCard';
import Associates from '@components/campaigns/campaignAssociates/Associates';
import AddNewAssociates from '@components/campaigns/AddnewAssociates/AddNewAssociates';
import CreateNewReceiverDialog from '@components/common/createNewReceiverDialog/CreateNewReceiverDialog';

interface Tab extends MenuItem {
  component?: React.ReactNode;
}

const EditCampaigns: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { campaigns } = useCampaignStore();

  const thisCampaign = useMemo(() => {
    return campaigns.find((campaign) => campaign.id.toString() == id);
  }, [id, campaigns]);

  if (!thisCampaign) {
    return <CampaignNotFound />;
  }

  const tabs: Tab[] = useMemo(() => {
    return [
      {
        label: 'Datos',
        icon: 'pi pi-file',
        command: (e) => setTabViewStrategy(e.item.label!),
        component: (
          <CampaignDisplayCard
            hasButtons={false}
            key={'tab-1-component'}
            campaign={thisCampaign}
          />
        ),
      },
      {
        label: 'Asociados',
        icon: 'pi pi-user',
        command: (e) => setTabViewStrategy(e.item.label!),
        component: (
          <Associates key={'tab-2-component'} campaign={thisCampaign} />
        ),
      },
      {
        label: 'Agregar personas',
        icon: 'pi pi-id-card',
        command: (e) => setTabViewStrategy(e.item.label!),
        component: (
          <AddNewAssociates key={'tab-3-component'} campaign={thisCampaign} />
        ),
      },
    ];
  }, [thisCampaign]);

  const [tabViewStrategy, setTabViewStrategy] = useState<string>(
    tabs[0].label!
  );

  return (
    <div className="w-full flex flex-col gap-10 items-center mt-auto ">
      <CreateNewReceiverDialog />
      <h1 className="title-md">Editar Campaña</h1>
      <h3 className="title-md text-primary-300 text-center">
        {thisCampaign.name}
      </h3>
      <div className="card w-full">
        <TabMenu
          className="rounded-md"
          pt={{
            action: { className: 'px-2 py-3  md:p-5' },
            menuitem: { className: 'text-gray-600 hover:text-primary-700' },
          }}
          model={tabs}
        />
      </div>

      <div className="w-full min-h-96 bg-slate-100 rounded-md p-3 shadow-sm flex justify-center">
        {tabs.map((_, i) => {
          return tabViewStrategy == tabs[i].label && tabs[i].component;
        })}
      </div>
    </div>
  );
};

export default EditCampaigns;
