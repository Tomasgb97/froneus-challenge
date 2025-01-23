import { getChartData } from '@app/lib/getChartData';
import { useCampaignStore } from '@app/stores/campaingStore';
import { Chart } from 'primereact/chart';

import React, { useMemo } from 'react';

const DoughnutChart: React.FC = () => {
  const { campaigns } = useCampaignStore();

  const chartOptions = useMemo(() => {
    return {
      cutout: '60%',
    };
  }, []);

  const chartData = useMemo(() => {
    return getChartData(campaigns);
  }, [campaigns]);

  return (
    <div>
      <h2>Doughnut Chart Example</h2>
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        className="w-full md:w-30rem"
      />
    </div>
  );
};

export default DoughnutChart;
