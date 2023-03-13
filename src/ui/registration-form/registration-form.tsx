import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';
import { booksAPI } from '../../services/book-sevice';
import { PAGE_PATHS } from '../../utils/consts';
import { FormAuthWrapper } from '../form-auth-wrapper';
import { FormErrors } from '../form-errors';
import { Preloader } from '../preloader';

import { Form } from './form';

import classes from './registration-form.module.css';

export type FormNotice = 'err400' | 'err' | 'success';

export const RegistrationForm = () => {
  const [step, setStep] = useState<number>(0);
  const [err, setErr] = useState<FormNotice>('err');
  const [showForm, setShowForm] = useState(true);
  const closeForm = () => setShowForm(false);
  const navigate = useNavigate();

  const [registrationUser, {isLoading}] = booksAPI.useRegistrationUserMutation();
    const { data } = useAppSelector((state) => state.userReduser);

  const setTypeErr = (error: FormNotice) => {
    setErr(error);
  };

  const formToastData = {
    err400: {
      title: 'Данные не сохранились',
      text: 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
      btnText: 'Назад к регистрации',
      onClick: () => setShowForm(true),
    },
    err: {
      title: 'Данные не сохранились',
      text: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
      btnText: 'Повторить',
      onClick: () => data && registrationUser(data),
    },
    success: {
      title: 'Регистрация успешна',
      text: 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль',
      btnText: 'Вход',
      onClick: () => navigate(PAGE_PATHS.authPagePath),
    },
  };

  const onClick = () => {
    setShowForm(true);
  };

 if (isLoading) return <Preloader />;

  return showForm ? (
    <FormAuthWrapper
      title='Регистрация'
      subTitle={<h2 className={classes.subtitle}>{step + 1} шаг из 3</h2>}
      form={<Form step={step} setStep={setStep} closeForm={closeForm} setTypeErr={setTypeErr} />}
      question='Есть учётная запись?'
      linkTo={PAGE_PATHS.authPagePath}
      linkText='Войти'
      dataTest='register-form'
      enter={true}
    />
  ) : (
    <FormErrors {...formToastData[err]} />
  );
};
