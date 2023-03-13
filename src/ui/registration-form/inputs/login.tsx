import { useState } from 'react';

import { InputsRegistrProps } from '../../../utils/types/registration';
import { InputPrimary } from '../../input-primary';

export const LoginInput = ({ register, error, value }: InputsRegistrProps) => {
  //   const [value, setValue] = useState('');
  const [isNotValid, setNotValid] = useState<boolean>(false);

  const handleBlur = () => {
    if (error?.message) setNotValid(true);
    else setNotValid(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotValid(false);
    // setValue(e.target.value);
  };

  return (
    <InputPrimary
      {...register('username', {
        onChange: handleChange,
        onBlur: handleBlur,
        required: 'Поле не может быть пустым',
        validate: (v) => {
          const arr: string[] = [];
          const checkNumber = /\d/.test(v) || 'цифры';
          const checkLetter = /^[A-Z\d]+$/i.test(v) || 'латинский алфавит';

          if (typeof checkNumber === 'string') arr.push(checkNumber);
          if (typeof checkLetter === 'string') arr.push(checkLetter);

          return arr.length ? arr.join(' ') : true;
        },
      })}
      error={error}
      name='username'
      id='username'
      placeholder='Придумайте логин для входа'
      labelText='Используйте для логина латинский алфавит и цифры'
      value={value}
      isNotValid={isNotValid}
    />
  );
};
