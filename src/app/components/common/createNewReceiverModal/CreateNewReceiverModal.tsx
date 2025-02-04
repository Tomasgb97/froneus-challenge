import { useCampaignStore } from '@app/stores/campaingStore';
import useCreateNewReceiver from '@hooks/createNewReceiverHook';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import React, { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import createReceiverFileds from './fields';
import { Campaign } from '@app/types/campaigns/campaign';
import { CampaignStatus } from '@app/types/campaigns/status';
import useUIStore from '@app/stores/UI/uiStore';

const CreateNewReceiverModal: React.FC = ({}) => {
  const { createNewReceiver } = useCreateNewReceiver();
  const { campaigns } = useCampaignStore();
  const { toggleCreateNewReceiverModal, showCreateNewReceiverModal } =
    useUIStore();

  const campaignsToBeAdded = useMemo(() => {
    return campaigns.filter(
      (camp) => camp.status !== CampaignStatus.Finalizada
    );
  }, [campaigns]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    const receiverWithFormattedCampaigns = {
      ...data,
      associatedCampaigns: data.associatedCampaigns.map(
        (campaign: Campaign) => campaign.id
      ),
    };
    reset();
    toggleCreateNewReceiverModal();
    createNewReceiver(receiverWithFormattedCampaigns);
  };

  return (
    <Dialog
      visible={showCreateNewReceiverModal}
      onHide={() => {
        if (!showCreateNewReceiverModal) return;

        toggleCreateNewReceiverModal();
      }}
      className="min-w-80  md:w-[40rem]"
    >
      <h1 className="title-sm text-primary-500">Agrega un nuevo asociado</h1>
      <Divider className="h-0.5 bg-primary-300"></Divider>

      <div className="mt-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          {createReceiverFileds.map((dynamicField) => {
            return (
              <div key={dynamicField.name}>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-primary-300"
                    htmlFor={dynamicField.name}
                  >
                    {dynamicField.label}
                  </label>
                  <Controller
                    name={dynamicField.name}
                    control={control}
                    rules={dynamicField.rules}
                    render={({ field, fieldState }) => (
                      <>
                        <InputText
                          key={field.name}
                          type={dynamicField.type}
                          maxLength={dynamicField.maxLength}
                          pt={{
                            root: {
                              className: fieldState.error
                                ? ' border-red-500 focus-visible:outline-red-500 focus:ring-red-500'
                                : '',
                            },
                          }}
                          className="rounded-lg"
                          id={field.name}
                          {...field}
                        ></InputText>
                        {fieldState.error && (
                          <small className="p-error">
                            {fieldState.error.message}
                          </small>
                        )}
                      </>
                    )}
                  ></Controller>
                </div>
              </div>
            );
          })}

          <div className="flex flex-col gap-2 mt-5">
            <label className="text-primary-300" htmlFor="name">
              Campanas a asociar
            </label>
            <Controller
              name="associatedCampaigns"
              control={control}
              rules={{ required: 'Este campo es obligatorio' }}
              render={({ field }) => (
                <MultiSelect
                  key={field.name}
                  pt={{ header: { className: 'bg-primary-100' } }}
                  value={field.value}
                  options={campaignsToBeAdded}
                  onChange={(e: MultiSelectChangeEvent) => field.onChange(e)}
                  optionLabel="name"
                  className="w-full overflow-x-hidden border-primary-300 border-2"
                  itemTemplate={(campaign) => (
                    <div key={campaign.id} className="hover:text-primary-300">
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

export default CreateNewReceiverModal;
