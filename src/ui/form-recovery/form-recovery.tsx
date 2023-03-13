import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import { FormNotice } from '../../pages/forgot-password/forgot-password';
import { booksAPI } from '../../services/book-sevice';
import { RecoveryFormValues } from '../../utils/types/registration';
import { Button } from '../buttons/btn-primary';
import { InputPrimary } from '../input-primary';
import { Preloader } from '../preloader';

import classes from './form-recovery.module.css';

type FormProps = {
  closeForm: () => void;
  setTypeErr: (err: FormNotice) => void;
};

export const FormRecovery = ({ closeForm, setTypeErr }: FormProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    watch,
    formState: { errors, isSubmitSuccessful, touchedFields },
    handleSubmit,
    reset,
  } = useForm<RecoveryFormValues>({ mode: 'onBlur' });

  const [isErr, setErr] = useState<string>('');

  const [cookies, setCookie] = useCookies(['clever']);
  const navigate = useNavigate();

  const [recoveryPassword, { isLoading, isError, error: err, isSuccess }] = booksAPI.useRecoveryPasswordMutation();

  const onSubmit: SubmitHandler<RecoveryFormValues> = async (data: RecoveryFormValues) => {
    recoveryPassword(data);
  };

  useEffect(() => {
    if (isSuccess) {
      console.log('You successfully logged in');
      setTypeErr('recovery');
      closeForm();
    }
    if (err) {
      if ('status' in err) {
        // const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
        setErr('error');
      }
    }
  }, [closeForm, dispatch, err, isError, isLoading, isSuccess, navigate, setCookie, setTypeErr]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  if (isLoading) return <Preloader />;

  return (
    <form data-test-id='send-email-form' id='form-recovery' onSubmit={handleSubmit(onSubmit)}>
      <InputPrimary
        {...register('email', {
          required: 'Поле не может быть пустым',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Введите корректный email',
          },
        })}
        error={errors.email}
        name='email'
        id='email'
        placeholder='Email'
        value={watch('email')}
        touchedFields={touchedFields.email}
      />
      {isErr && (
        <p className={classes.error} data-test-id='hint'>
          {isErr}
        </p>
      )}
      <p className={classes.hint}>На это email будет отправлено письмо с инструкциями по восстановлению пароля</p>
      <Button form='form-recovery' text='Восстановить' className='btnRegistration' id='btn' type='submit' />
    </form>
  );
};
