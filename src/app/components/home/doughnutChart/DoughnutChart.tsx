import { getChartData } from '@app/lib/getChartData';
import { useCampaignStore } from '@app/stores/campaingStore';
import { Chart } from 'primereact/chart';

import React, { useMemo } from 'react';

const DoughnutChart: React.FC = () => {
  const { campaigns, selectedStatusFilterValue } = useCampaignStore();

  const chartOptions = useMemo(() => {
    return {
      cutout: '60%',
    };
  }, []);

  const chartData = useMemo(() => {
    return getChartData(campaigns, selectedStatusFilterValue);
  }, [campaigns, selectedStatusFilterValue]);

  return (
    <div>
      <h2>Doughnut Chart Example</h2>
      {chartData.datasets[0].data.length > 0 ? (
        <Chart
          type="doughnut"
          data={chartData}
          options={chartOptions}
          className="w-full md:w-30rem"
        />
      ) : (
        <h1>No hay data de campañas</h1>
      )}
    </div>
  );
};

export default DoughnutChart;
