import { getChartData } from '@app/lib/getChartData';
import { useCampaignStore } from '@app/stores/campaingStore';
import { Chart } from 'primereact/chart';

import React, { useCallback, useMemo } from 'react';

const DoughnutChart: React.FC = () => {
  const { campaigns } = useCampaignStore();

  const chartOptions = useMemo(() => {
    return {
      cutout: '60%',
    };
  }, []);

  //   const chartData = useMemo(() => {
  //     return getChartData(campaigns);
  //   }, [campaigns]);

  const chartData = {
    labels: ['Sales', 'Marketing', 'Development', 'Customer Support', 'HR'],
    datasets: [
      {
        data: [300, 150, 200, 100, 80], // Values for each category
        backgroundColor: [
          'rgb(255, 99, 132)', // Red
          'rgb(54, 162, 235)', // Blue
          'rgb(255, 206, 86)', // Yellow
          'rgb(75, 192, 192)', // Green
          'rgb(153, 102, 255)', // Purple
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.8)', // Slightly transparent red
          'rgba(54, 162, 235, 0.8)', // Slightly transparent blue
          'rgba(255, 206, 86, 0.8)', // Slightly transparent yellow
          'rgba(75, 192, 192, 0.8)', // Slightly transparent green
          'rgba(153, 102, 255, 0.8)', // Slightly transparent purple
        ],
      },
    ],
  };

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
