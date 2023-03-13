import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { createPortal } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { booksAPI } from '../../../services/book-sevice';
import { setUser } from '../../../store/reducers/user-slice';
import { PAGE_PATHS } from '../../../utils/consts';
import { AuthFormValues } from '../../../utils/types/registration';
import { ButtonEye } from '../../buttons/btn-eye';
import { Button } from '../../buttons/btn-primary';
import { FormErrors } from '../../form-errors';
import { InputPrimary } from '../../input-primary';
import { Preloader } from '../../preloader';

import classes from './form-auth.module.css';

type FormProps = {
  onClose: () => void;

};

export const FormAuth = ({ onClose }: FormProps) => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.userReduser);

  const {
    register,
    watch,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm<AuthFormValues>({ mode: 'onBlur' });

  const [isEyeOpen, setEyeOpen] = useState<boolean>(false);
  const [isForgotErr, setForgotErr] = useState<boolean>(false);
  const toggleEye = () => setEyeOpen(!isEyeOpen);

  //   const [disabled, setbtnDisabled] = useState<boolean>(false);

  const [cookies, setCookie] = useCookies(['clever']);
  const navigate = useNavigate();

  const [loginUser, { data: userData, isLoading, isError, error, isSuccess }] = booksAPI.useLoginUserMutation();

  const onSubmit: SubmitHandler<AuthFormValues> = async (data: AuthFormValues) => {
    loginUser(data);
  };

  useEffect(() => {
    if (isSuccess && userData) {
      console.log('You successfully logged in');
      dispatch(setUser({ user: userData.user, token: userData.jwt, isAuth: true }));
      setCookie('clever', userData?.jwt, { path: '/' });
      navigate(PAGE_PATHS.mainPagePath);
    }
    if (error) {
      if ('status' in error) {
        if (error.status === 400) setForgotErr(true);
        else onClose();
      }
    }
  }, [dispatch, error, isError, isLoading, isSuccess, navigate, onClose, setCookie, userData]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  if (isLoading) return <Preloader />;

  return (
    <form data-test-id='auth-form' id='form' onSubmit={handleSubmit(onSubmit)}>
      <InputPrimary
        {...register('identifier', {
          required: 'Поле не может быть пустым',
        })}
        error={errors.identifier}
        name='identifier'
        id='identifier'
        placeholder='Логин'
        value={watch('identifier')}
      />
      <div className={classes.password}>
        <InputPrimary
          {...register('password', {
            required: 'Поле не может быть пустым',
          })}
          error={errors.password}
          type={isEyeOpen ? 'text' : 'password'}
          name='password'
          id='password'
          placeholder='Пароль'
          value={watch('password')}
        />
        {watch('password') && <ButtonEye onClick={toggleEye} isOpen={isEyeOpen} />}
      </div>
      {isForgotErr ? (
        <p className={`${classes.hint} ${classes.error}`} data-test-id='hint'>Неверный логин или пароль!</p>
      ) : (
        <NavLink to={PAGE_PATHS.forgotPassPagePath} className={classes.hint}>Забыли логин или пароль?</NavLink>
      )}
      {isForgotErr && (
        <NavLink to={PAGE_PATHS.forgotPassPagePath} className={classes.hint}>
          Восстановить?
        </NavLink>
      )}
      <Button form='form' text='Вход' className='btnRegistration' id='btn' type='submit' />
    </form>
  );
};
