import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import { FormNotice } from '../../pages/forgot-password/forgot-password';
import { booksAPI } from '../../services/book-sevice';
import { setUser } from '../../store/reducers/user-slice';
import { PAGE_PATHS } from '../../utils/consts';
import { ForgotFormValues } from '../../utils/types/registration';
import { Button } from '../buttons/btn-primary';
import { InputPrimary } from '../input-primary';
import { Preloader } from '../preloader';

import { PasswordConfirmInput } from './inputs/confirm-password';
import { PasswordInput } from './inputs/password';

import classes from './form-forgot.module.css';

type FormProps = {
  closeForm: () => void;
  recoveryCode: string | null;
  setTypeErr: (err: FormNotice) => void;
};

export const FormForgot = ({ closeForm, recoveryCode, setTypeErr }: FormProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    watch,
    trigger,
    formState: { errors, isSubmitSuccessful, touchedFields },
    handleSubmit,
    reset,
    getFieldState,
  } = useForm<ForgotFormValues>({ mode: 'onBlur' });

  const { isDirty } = getFieldState('password');

//   const [isErr, setErr] = useState<string>('');

  const newPassword = watch('password');

  //   const [disabled, setbtnDisabled] = useState<boolean>(false);
  const handleChange = () => {
    trigger('password');
  }

//   const [cookies, setCookie] = useCookies(['clever']);
//   const navigate = useNavigate();

  const [setNewPassword, { data: userData, isLoading, isError, error: err, isSuccess }] =
    booksAPI.useSetNewPasswordMutation();

  const onSubmit: SubmitHandler<ForgotFormValues> = async (data: ForgotFormValues) => {
    setNewPassword({ ...data, code: recoveryCode });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log('You successfully logged in');
    //   setCookie('clever', userData?.jwt, { path: '/' });
    //   dispatch(setUser({ user: userData.user, token: userData.jwt, isAuth: true }));
      setTypeErr('success');
      closeForm();
    }
    if (err) {
      setTypeErr('err');
      closeForm();
    }
  }, [closeForm, dispatch, err, isError, isLoading, isSuccess, setTypeErr, userData]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  if (isLoading) return <Preloader />;

  return (
    <form data-test-id='reset-password-form' id='form-forgot' onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
      <PasswordInput register={register} error={errors.password} value={watch('password')} isDirty={isDirty} />
      <PasswordConfirmInput
        register={register}
        error={errors.passwordConfirmation}
        value={watch('passwordConfirmation')}
        newPassword={newPassword}
      />
      <Button
        form='form-forgot'
        text='Сохранить изменения'
        className='btnRegistration'
        id='btn'
        type='submit'
        disabled={errors.passwordConfirmation?.type === 'validate'}
      />
    </form>
  );
};
