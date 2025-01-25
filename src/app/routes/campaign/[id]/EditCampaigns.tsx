import { useCampaignStore } from '@app/stores/campaingStore';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import CampaignNotFound from '../CampaignNotFound';
import { TabMenu } from 'primereact/tabmenu';

interface Tab {
  label: string;
  icon: string;
  command: (e: { item: Tab }) => void;
  component: React.ReactNode;
}

const EditCampaigns: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { campaigns } = useCampaignStore();

  const tabs: Tab[] = useMemo(() => {
    return [
      {
        label: 'Datos',
        icon: 'pi pi-file',
        command: (e) => setTabViewStrategy(e.item.label),
        component: <h1 className="title-lg">Datos</h1>,
      },
      {
        label: 'Asociados',
        icon: 'pi pi-user',
        command: (e) => setTabViewStrategy(e.item.label),
        component: <h1 className="title-lg">Asociados</h1>,
      },
      {
        label: 'Agregar personas',
        icon: 'pi pi-id-card',
        command: (e) => setTabViewStrategy(e.item.label),
        component: <h1 className="title-lg">Agregar</h1>,
      },
    ];
  }, []);

  const [tabViewStrategy, setTabViewStrategy] = useState<string>(tabs[0].label);

  const thisCampaign = useMemo(() => {
    return campaigns.find((campaign) => campaign.id.toString() == id);
  }, [id, campaigns]);

  if (!thisCampaign) {
    return <CampaignNotFound />;
  }

  return (
    <div className="w-full flex flex-col gap-10 items-center mt-auto ">
      <h1 className="title-md">Editar Campaña</h1>
      <h3 className="title-md text-primary-300 text-center">
        {thisCampaign.name}
      </h3>
      <div className="card w-full">
        <TabMenu
          pt={{
            action: { className: 'px-2 py-3  md:p-5' },
            menuitem: { className: 'text-gray-600 hover:text-primary-700' },
          }}
          model={tabs}
        />
      </div>

      <div className="card w-full">
        {tabs.map((_, i) => {
          return tabViewStrategy == tabs[i].label && tabs[i].component;
        })}
      </div>
    </div>
  );
};

export default EditCampaigns;
