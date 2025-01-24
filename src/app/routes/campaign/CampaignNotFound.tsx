import { Button } from 'primereact/button';
import React from 'react';
import { useNavigate } from 'react-router';

const CampaignNotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col justify-center text-center items-center gap-2">
      <h1 className="text-4xl text-white font-bold">Campaña no encontrada</h1>
      <p className="text-primary-300">
        La campaña que buscas no existe o no pudo ser encontrada.
      </p>

      <Button
        onClick={() => navigate('/')}
        className="p-2 bg-primary-400 text-white mt-6"
        icon="pi pi-home"
        label="Volver"
      ></Button>
    </div>
  );
};

export default CampaignNotFound;
