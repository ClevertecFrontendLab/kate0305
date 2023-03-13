import { useEffect, useState } from 'react';

import { InputsForgotProps } from '../../../utils/types/registration';
import { ButtonEye } from '../../buttons/btn-eye';
import { InputPrimary } from '../../input-primary';

import classes from './password.module.css';

export const PasswordConfirmInput = ({ register, error, value, newPassword }: InputsForgotProps) => {
  const [isEyeOpen, setEyeOpen] = useState<boolean>(false);
//   const [isValid, setValid] = useState<boolean>(false);
  const [isNotValid, setNotValid] = useState<boolean>(false);

//   useEffect(() => {
//     if (isDirty && !error?.message) setValid(true);
//     else setValid(false);
//   }, [error, isDirty]);

  const handleBlur = () => {
    if (error?.message) setNotValid(true);
    else setNotValid(false);
  };

  const toggleEye = () => setEyeOpen(!isEyeOpen);

  const handleChange = () => {
    setNotValid(false);
  };

  return (
    <div className={classes.wrapper}>
      <InputPrimary
        {...register('passwordConfirmation', {
          onChange: handleChange,
          onBlur: handleBlur,
          required: 'Поле не может быть пустым',
          validate: (v) => v === newPassword || 'Пароли не совпадают',
        })}
        error={error}
        type={isEyeOpen ? 'text' : 'password'}
        name='passwordConfirmation'
        id='passwordConfirmation'
        placeholder='Повторите пароль'
        labelText={error?.message}
        value={value}
        isNotValid={isNotValid}
      />
      {value && <ButtonEye onClick={toggleEye} isOpen={isEyeOpen} />}
    </div>
  );
};
