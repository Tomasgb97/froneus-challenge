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
      <p className="text-2xl  text-primary-300">Filtra por estado</p>
      <Dropdown
        className="min-w-36 focus-within:shadow-none  "
        pt={{
          input: {
            className: 'py-1 focus-visible:shadow-none',
          },
        }}
        value={selectedStatusFilterValue}
        onChange={(e) => setSelectedStatusFilterValue(e.value)}
        options={options}
        placeholder="Selecciona un estado"
      />
    </>
  );
};

export default StatusSelect;
