import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { useAppDispatch } from '../../../hooks/redux';
import { booksAPI } from '../../../services/book-sevice';
import { setRegistrationData } from '../../../store/reducers/user-slice';
import { RegistrationFormValues } from '../../../utils/types/registration';
import { Button } from '../../buttons/btn-primary';
import { Preloader } from '../../preloader';
import { EmailInput, FirstNameInput, LastNameInput, LoginInput, PasswordInput, PhoneInput } from '../inputs';
import { FormNotice } from '../registration-form';

type FormProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  closeForm: () => void;
  setTypeErr: (err: FormNotice) => void;
};

export const Form = ({ step, setStep, closeForm, setTypeErr }: FormProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    trigger,
    formState: { errors, isSubmitSuccessful },
    watch,
    handleSubmit,
    getFieldState,
    reset,
  } = useForm<RegistrationFormValues>({ mode: 'onChange' });

  const { isDirty } = getFieldState('password');

  const [registrationUser, { isLoading, isSuccess, error, }] = booksAPI.useRegistrationUserMutation();

  const [disabled, setbtnDisabled] = useState<boolean>(false);

  const buttonText = ['следующий шаг', 'последний шаг', 'зарегистрироваться'];

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data: RegistrationFormValues) => {
    dispatch(setRegistrationData(data));
    registrationUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      setTypeErr('success');
      dispatch(setRegistrationData(null));
      closeForm();
    }
    if (error) {
      if ('status' in error) {
        if (error.status === 400) {
          setTypeErr('err400');
          reset();
          setStep(1);
          closeForm();
        } else {
          setTypeErr('err');
          setStep(1);
          closeForm();
        }
      }
    }
  }, [error, isSuccess, closeForm, reset, setTypeErr, dispatch, setStep]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleFormChange = () => {
    if (disabled) setbtnDisabled(false);
  };

  const handleNextStep = async () => {
    let isFieldValid = false;

    if (step === 0) {
      isFieldValid = await trigger(['username', 'password']);
    }
    if (step === 1) {
      isFieldValid = await trigger(['firstName', 'lastName']);
    }
    if (step === 2) {
      isFieldValid = await trigger(['phone', 'email']);
    }

    return isFieldValid ? setStep(step + 1) : setbtnDisabled(true);
  };

  const currentInputs = () => {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <LoginInput register={register} error={errors.username} value={watch('username')} />
            <PasswordInput register={register} error={errors.password} isDirty={isDirty} value={watch('password')} />
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <FirstNameInput register={register} error={errors.firstName} value={watch('firstName')} />
            <LastNameInput register={register} error={errors.lastName} value={watch('lastName')} />
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <PhoneInput register={register} error={errors.phone} value={watch('phone')} />
            <EmailInput register={register} error={errors.email} value={watch('email')} />
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <LoginInput register={register} error={errors.username} />
            <PasswordInput register={register} error={errors.password} />
          </React.Fragment>
        );
    }
  };

  if (isLoading) return <Preloader />;

  return (
    <form data-test-id='register-form' id='form' onChange={handleFormChange}>
        {currentInputs()}
        <Button
          disabled={disabled}
          form='form'
          text={buttonText[step]}
          className='btnRegistration'
          id='btn'
          onClick={step === 2 ? handleSubmit(onSubmit) : handleNextStep}
          type='button'
        />
      </form>
  );
};
