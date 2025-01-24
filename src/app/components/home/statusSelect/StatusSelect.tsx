import { useCampaignStore } from '@app/stores/campaingStore';
import { CampaignStatus } from '@app/types/campaigns/status';
import { Dropdown } from 'primereact/dropdown';
import React, { useMemo } from 'react';

const StatusSelect: React.FC = () => {
  const { setSelectedStatusFilterValue, selectedStatusFilterValue } =
    useCampaignStore();

  const options = useMemo(() => {
    const mappedOptions = [
      { name: 'Todas', value: null },
      ...Object.values(CampaignStatus).map((value) => ({
        name: value,
        value,
      })),
    ];
    return mappedOptions;
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
        onChange={(e) => {
          console.log(e);
          setSelectedStatusFilterValue(e.value);
        }}
        optionLabel="name"
        optionValue="value"
        options={options}
        placeholder="Selecciona un estado"
      />
    </>
  );
};

export default StatusSelect;
