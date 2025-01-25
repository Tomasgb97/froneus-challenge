import { useCampaignStore } from '@app/stores/campaingStore';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import CampaignNotFound from '../CampaignNotFound';
import { TabMenu } from 'primereact/tabmenu';

const EditCampaigns: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { campaigns } = useCampaignStore();

  cosnt[(tabViewStrategy, setTabViewStrategy)] = useState();

  const tabs: { label: string; icon: string }[] = useMemo(() => {
    return [
      { label: 'Datos', icon: 'pi pi-file' },
      { label: 'Asociados', icon: 'pi pi-user' },
      { label: 'Agregar personas', icon: 'pi pi-id-card' },
    ];
  }, []);

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
    </div>
  );
};

export default EditCampaigns;
