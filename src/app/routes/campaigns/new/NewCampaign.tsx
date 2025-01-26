import { useReceiverStore } from '@app/stores/receiversStore';
import { CampaignStatus } from '@app/types/campaigns/status';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import { ListBox } from 'primereact/listbox';
import { MultiSelect } from 'primereact/multiselect';
import { SelectButton } from 'primereact/selectbutton';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const NewCampaign: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const { receivers } = useReceiverStore();
  const [startTimechecked, setStartTimechecked] = useState<boolean>(false);
  const onSubmit = (data: any) => {
    console.log('submiting', data);
  };
  return (
    <div className="p-4 md:p-10 max-w-[22rem] md:max-w-full md:w-[40rem] rounded-lg bg-slate-100">
      <h1 className="title-sm text-primary-500">Crea una nueva campaña</h1>
      <Divider className="h-0.5 bg-primary-300"></Divider>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex flex-col gap-2 mb-20">
            <label
              className="text-primary-300 font-semibold"
              htmlFor="campaign-name"
            >
              Nombre de la campaña
            </label>
            <Controller
              name="campaign-name"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <>
                  <InputText
                    type="text"
                    maxLength={50}
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

          <div className="flex flex-col gap-2 mb-10">
            <label
              htmlFor="campaign-start"
              className="font-semibold text-primary-300"
            >
              Iniciar las llamadas al crear
            </label>

            <InputSwitch
              pt={{ input: { className: 'w-full h-full' } }}
              checked={startTimechecked}
              onChange={(e) => {
                setStartTimechecked(e.value);
              }}
            />

            {!startTimechecked && (
              <Controller
                name="campaign-start"
                control={control}
                rules={{
                  required: 'Este campo es obligatorio si no activas el switch',
                }}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col">
                    <small>Selecciona una fecha de inicio:</small>
                    <Calendar
                      locale="es"
                      minDate={new Date()}
                      showIcon
                      className={`rounded-lg border-none border-slate-100 ${
                        fieldState.error ? 'p-invalid' : ''
                      }`}
                      id={field.name}
                      value={field.value}
                      onChange={(e) => field.onChange(e.value)}
                    />
                    {fieldState.error && (
                      <small className="p-error">
                        {fieldState.error.message}
                      </small>
                    )}
                  </div>
                )}
              />
            )}
          </div>

          <div className="flex flex-col gap-2 mb-10">
            <label
              className="text-primary-300 font-semibold"
              htmlFor="campaign-receivers"
            >
              ¿Quienes la van a recibir?
            </label>
            <Controller
              name="campaign-receivers"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <MultiSelect
                    options={receivers}
                    itemTemplate={(receiver) => (
                      <div key={receiver.id} className="hover:text-primary-300">
                        {receiver.name + ' ' + receiver.surname}
                      </div>
                    )}
                    optionLabel="name"
                    placeholder="Selecciona quienes recibiran las llamadas"
                    className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                    {...field}
                  />
                  {fieldState.error && (
                    <small className="p-error">
                      {fieldState.error.message}
                    </small>
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex flex-col gap-2 mb-10">
            <label
              className="text-primary-300 font-semibold"
              htmlFor="campaign-recording"
            >
              ¿Quieres grabar estos llamados?
            </label>
            <Controller
              name="campaign-recording"
              control={control}
              rules={{ required: 'Este campo es obligatorio' }}
              render={({ field, fieldState }) => (
                <div>
                  <SelectButton
                    {...field}
                    options={[
                      { label: 'Si', value: true },
                      { label: 'No', value: false },
                    ]}
                    optionLabel="label"
                    optionValue="value"
                    className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                  />
                  {fieldState.error && (
                    <small className="p-error">
                      {fieldState.error.message}
                    </small>
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-primary-300 font-semibold"
              htmlFor="campaign-status"
            >
              ¿Con que estatus debe iniciar?
            </label>
            <Controller
              name="campaign-status"
              control={control}
              rules={{ required: 'Este campo es obligatorio' }}
              render={({ field, fieldState }) => (
                <div>
                  <ListBox
                    {...field}
                    options={Object.keys(CampaignStatus).filter(
                      (s) => s !== CampaignStatus.Finalizada
                    )}
                    optionLabel="status"
                    className={`w-full ${fieldState.error ? 'p-invalid' : ''}`}
                    itemTemplate={(status) => (
                      <div className="hover:text-primary-300">{status}</div>
                    )}
                  />
                  {fieldState.error && (
                    <small className="p-error">
                      {fieldState.error.message}
                    </small>
                  )}
                </div>
              )}
            />
          </div>
        </div>
        <div className="flex w-full mt-6">
          <Button
            className=" bg-primary-300 p-2 font-semibold text-white"
            type="submit"
            role="button"
          >
            Crear Campaña
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewCampaign;
