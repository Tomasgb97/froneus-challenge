import { useCampaignStore } from '@app/stores/campaingStore';
import { CampaignStatus } from '@app/types/campaigns/status';
import { Dropdown } from 'primereact/dropdown';
import React, { useMemo } from 'react';

const StatusSelect: React.FC = () => {
  const { setSelectedStatusFilterValue, selectedStatusFilterValue } =
    useCampaignStore();

  const options = useMemo(() => {
    return Object.values(CampaignStatus);
  }, []);

  return (
    <>
      <span className="text-2xl  text-primary-300">Filtra por estado</span>
      <Dropdown
        value={selectedStatusFilterValue}
        onChange={(e) => setSelectedStatusFilterValue(e.value)}
        options={options}
        optionLabel="Estado"
        placeholder="Selecciona un estado"
      />
    </>
  );
};

export default StatusSelect;
