import { InputsRegistrProps } from '../../../utils/types/registration';
import { InputPrimary } from '../../input-primary';

export const EmailInput = ({ register, error, value }: InputsRegistrProps) => (
  <InputPrimary
    {...register('email', {
      required: 'Поле не может быть пустым',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Введите корректный email',
      },
    })}
    value={value}
    error={error}
    type='email'
    name='email'
    id='email'
    placeholder='E-mail'
  />
);
