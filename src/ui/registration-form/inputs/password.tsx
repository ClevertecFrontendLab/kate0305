import { useEffect, useState } from 'react';

import { InputsRegistrProps } from '../../../utils/types/registration';
import { ButtonEye } from '../../buttons/btn-eye';
import { InputPrimary } from '../../input-primary';

import classes from './inputs.module.css';

export const PasswordInput = ({ register, error, isDirty, value }: InputsRegistrProps) => {
  const [isEyeOpen, setEyeOpen] = useState<boolean>(false);
  const [isValid, setValid] = useState<boolean>(false);
  const [isNotValid, setNotValid] = useState<boolean>(false);

  useEffect(() => {
    if (isDirty && !error?.message) setValid(true);
    else setValid(false);
  }, [error, isDirty]);

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
        {...register('password', {
          onChange: handleChange,
          onBlur: handleBlur,
          required: 'Поле не может быть пустым',
          validate: (v) => {
            const arr = [];
            const checkLenght = v.length > 7 || 'не менее 8 символов';
            const checkCapitalLetter = /[A-Z]/.test(v) || 'заглавной буквой';
            const checkNumber = /\d/.test(v) || 'цифрой';

            if (typeof checkLenght === 'string') arr.push(checkLenght);
            if (typeof checkCapitalLetter === 'string') arr.push(checkCapitalLetter);
            if (typeof checkNumber === 'string') arr.push(checkNumber);

            return arr.length ? arr.join(' ') : true;
          },
        })}
        error={error}
        type={isEyeOpen ? 'text' : 'password'}
        name='password'
        id='password'
        placeholder='Пароль'
        labelText='Пароль не менее 8 символов, с заглавной буквой и цифрой'
        value={value}
        isNotValid={isNotValid}
      />
      {isValid && <span className={classes.isValid} data-test-id='checkmark' />}
      <ButtonEye onClick={toggleEye} isOpen={isEyeOpen} />
    </div>
  );
};
