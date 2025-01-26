import { useCampaignStore } from '@app/stores/campaingStore';
import useCreateNewReceiver from '@hooks/createNewReceiverHook';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const CreateNewUserDialog: React.FC = ({}) => {
  const { setShowNewUserDialog, showCreateNewUserDialog } =
    useCreateNewReceiver();
  const { campaigns } = useCampaignStore();
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const receiverWithFormattedCampaigns = {
      ...data,
      associatedCampaigns: data.associatedCampaigns.map(
        (campaign) => campaign.id
      ),
    };
  };

  return (
    <Dialog
      visible={showCreateNewUserDialog}
      onHide={() => {
        setShowNewUserDialog(false);
      }}
      className="min-w-80  md:w-[40rem]"
    >
      <h1 className="title-sm text-primary-500">Agrega un nuevo asociado</h1>
      <Divider className="h-0.5 bg-primary-300"></Divider>

      <div className="mt-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label className="text-primary-300" htmlFor="name">
              Nombre
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Este campo es obligatorio' }}
              render={({ field, fieldState }) => (
                <InputText
                  type="text"
                  maxLength={20}
                  className="rounded-lg"
                  id={field.name}
                  {...field}
                ></InputText>
              )}
            ></Controller>
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <label className="text-primary-300" htmlFor="name">
              Apellido
            </label>
            <Controller
              name="surname"
              control={control}
              rules={{ required: 'Este campo es obligatorio' }}
              render={({ field, fieldState }) => (
                <InputText
                  type="text"
                  maxLength={20}
                  className="rounded-lg"
                  id={field.name}
                  {...field}
                ></InputText>
              )}
            ></Controller>
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <label className="text-primary-300" htmlFor="name">
              Telefono
            </label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: 'Este campo es obligatorio' }}
              render={({ field, fieldState }) => (
                <InputText
                  type="text"
                  maxLength={20}
                  className="rounded-lg"
                  id={field.name}
                  {...field}
                ></InputText>
              )}
            ></Controller>
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <label className="text-primary-300" htmlFor="name">
              Campanas a asociar
            </label>
            <Controller
              name="associatedCampaigns"
              control={control}
              rules={{ required: 'Este campo es obligatorio' }}
              render={({ field, fieldState }) => (
                <MultiSelect
                  pt={{ header: { className: 'bg-primary-100' } }}
                  value={field.value}
                  options={campaigns}
                  onChange={(e: MultiSelectChangeEvent) => field.onChange(e)}
                  optionLabel="name"
                  className="w-full overflow-x-hidden border-primary-300 border-2"
                  itemTemplate={(campaign) => (
                    <div className="hover:text-primary-300">
                      {campaign.name}
                    </div>
                  )}
                />
              )}
            ></Controller>
          </div>

          <div className="flex w-full mt-6">
            <Button
              className=" bg-primary-300 p-2 font-semibold text-white"
              type="submit"
              role="button"
            >
              Agregar usuario
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default CreateNewUserDialog;
