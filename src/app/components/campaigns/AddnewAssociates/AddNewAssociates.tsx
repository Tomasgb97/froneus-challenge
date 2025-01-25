import React, { useMemo, useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { useReceiverStore } from '@app/stores/receiversStore';
import { Campaign } from '@app/types/campaigns/campaign';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';

interface AddNewAssociatesProps {
  campaign: Campaign;
}
const AddNewAssociates: React.FC<AddNewAssociatesProps> = ({
  campaign,
}: AddNewAssociatesProps) => {
  const { receivers } = useReceiverStore();
  const navigate = useNavigate();

  //this is not pretty performant, should be retrieved from a backend.
  const notYetAssociatedReceivers = useMemo(() => {
    return receivers.filter(
      (receivers) => !receivers.associatedCampaigns.includes(campaign.id)
    );
  }, [receivers, campaign.associatedReceivers]);
  return (
    <div className="flex flex-col items-center gap-9 ">
      <h1 className="title-md text-primary-300">Agregalos</h1>
      <p>Aqui puedes agregar a mas usuarios a esta campaña</p>

      <div className="flex flex-col items-center gap-4">
        <div className="max-h-12">
          <MultiSelect
            options={notYetAssociatedReceivers}
            itemTemplate={(option) => (
              <div className="hover:text-primary-300">
                {option.name} {option.surname}
              </div>
            )}
            placeholder="Selecciona nuevos asociados"
            maxSelectedLabels={100}
            className="w-full md:w-20rem"
            filter
            emptyMessage="No hay usuarios que puedas agregar"
            emptyFilterMessage="No hay coincidencias"
          />
        </div>
        <Button
          className="text-white bg-green-600 p-2"
          icon="pi pi-check"
          label="Guardar en Campaña"
        ></Button>
      </div>

      <div className="flex flex-col items-center">
        <p>¿El usuario que deseas agregar no existe?</p>
        <span className="text-primary-500">Agragalo</span>
      </div>

      <Button
        link
        onClick={() => navigate('/newUser')}
        className="text-white bg-primary-600 p-2"
        icon="pi pi-user-plus"
        label="Agregar usuario"
      ></Button>
    </div>
  );
};

export default AddNewAssociates;
