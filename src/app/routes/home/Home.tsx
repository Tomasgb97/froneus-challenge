import DoughnutChart from '@components/home/doughnutChart/DoughnutChart';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center px-2">
      <h1 className="text-7xl text-white font-bold">
        Tus campañas con nosotros
      </h1>
      <DoughnutChart />
    </div>
  );
};

export default Home;
