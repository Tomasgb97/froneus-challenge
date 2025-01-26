import { validatePhoneNumber } from '@app/lib/regex';

interface FieldItem {
  name: string;
  label: string;
  type: string;
  rules: {};
  maxLength?: number;
  placeholder?: string;
}

const createReceiverFileds: FieldItem[] = [
  {
    name: 'name',
    label: 'Nombre',
    type: 'text',
    rules: { required: 'Este campo es obligatorio' },
    maxLength: 20,
    placeholder: '',
  },
  {
    name: 'surname',
    label: 'Apellido',
    type: 'text',
    rules: { required: 'Este campo es obligatorio' },
    placeholder: '',
  },
  {
    name: 'phone',
    label: 'Telefono',
    type: 'text',
    rules: {
      required: 'Este campo es obligatorio',
      validate: (value: string) =>
        validatePhoneNumber(value) || 'El formato debe ser un telefono valido',
    },
    placeholder: '(Cod.area) + numero',
  },
];

export default createReceiverFileds;
