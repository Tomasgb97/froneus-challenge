import DoughnutChart from '@components/home/doughnutChart/DoughnutChart';
import React from 'react';
import StatusSelect from '@components/home/statusSelect/StatusSelect';

const Home: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6 items-center px-2">
      <h1 className="title-lg">
        Tus{' '}
        <a href="/campaigns" className="text-primary-300">
          campañas
        </a>{' '}
        con nosotros
      </h1>

      <div className="w-full max-w-96 flex justify-between items-center overflow-hidden">
        <StatusSelect />
      </div>
      <div className="p-2">
        <DoughnutChart />
      </div>
    </div>
  );
};

export default Home;
