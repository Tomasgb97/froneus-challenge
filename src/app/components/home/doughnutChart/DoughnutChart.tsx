import { getChartData } from '@app/lib/getChartData';
import { useCampaignStore } from '@app/stores/campaingStore';
import { Chart } from 'primereact/chart';

import React, { useMemo } from 'react';

const DoughnutChart: React.FC = () => {
  const { campaigns, selectedStatusFilterValue } = useCampaignStore();

  const chartOptions = useMemo(() => {
    return {
      cutout: '40%',
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  }, []);

  const chartData = useMemo(() => {
    return getChartData(campaigns, selectedStatusFilterValue);
  }, [campaigns, selectedStatusFilterValue]);

  const totalAmountofRecievers = useMemo(() => {
    return chartData.datasets[0].data.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  }, [chartData.datasets[0]]);

  return (
    <div>
      <h1 className="font-semibold mb-4 text-white text-center">
        Total de personas:{' '}
        <p className="text-primary-300">{totalAmountofRecievers}</p>
      </h1>
      {chartData.datasets[0].data.length > 0 ? (
        <Chart
          type="doughnut"
          data={chartData}
          options={chartOptions}
          className="w-full md:w-30rem cursor-pointer"
        />
      ) : (
        <h1 className="font-bold text-white text-4xl">
          No hay data de campañas
        </h1>
      )}
    </div>
  );
};

export default DoughnutChart;
