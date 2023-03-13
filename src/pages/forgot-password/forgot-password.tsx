import { useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

import { FormAuthWrapper } from '../../ui/form-auth-wrapper';
import { FormErrors } from '../../ui/form-errors';
import { FormForgot } from '../../ui/form-forgot';
import { FormRecovery } from '../../ui/form-recovery';
import { PAGE_PATHS } from '../../utils/consts';

import classes from './forgot-password.module.css';

export type FormNotice = 'recovery' | 'err' | 'success';

export const ForgotPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const recoveryCode = searchParams.get('code');
  const [showForm, setShowForm] = useState(true);
  const closeForm = () => setShowForm(false);
  const [err, setErr] = useState<FormNotice>('success');
  const navigate = useNavigate();

  const setTypeErr = (error: FormNotice) => {
    setErr(error);
  };

  const navToAuth = () => (
    recoveryCode ? undefined : <NavLink to={PAGE_PATHS.authPagePath} className={classes.return}>
      Вход в личный кабинет
    </NavLink>
  );

    const formToastData = {
      recovery: {
        title: 'Письмо выслано',
        text: 'Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля',
      },
      err: {
        title: 'Данные не сохранились',
        text: 'Что-то пошло не так. Попробуйте ещё раз',
        btnText: 'Повторить',
        onClick: () => {
          setShowForm(true);
        },
      },
      success: {
        title: 'Новые данные сохранены',
        text: 'Зайдите в личный кабинет, используя свои логин и новый пароль',
        btnText: 'Вход',
        onClick: () => navigate(PAGE_PATHS.authPagePath),
      },
    };

  return showForm ? (
    <FormAuthWrapper
      navToAuth={navToAuth()}
      title='Восстановление пароля'
      form={
        recoveryCode ? (
          <FormForgot closeForm={closeForm} recoveryCode={recoveryCode} setTypeErr={setTypeErr} />
        ) : (
          <FormRecovery closeForm={closeForm} setTypeErr={setTypeErr} />
        )
      }
      question={recoveryCode ? 'После сохранения войдите в библиотеку, используя новый пароль' : 'Нет учётной записи?'}
      linkTo={recoveryCode ? '' : PAGE_PATHS.authPagePath}
      linkText={recoveryCode ? '' : 'Регистрация'}
      dataTest={recoveryCode ? 'reset-password-form' : 'send-email-form'}
    />
  ) : (
    <FormErrors {...formToastData[err]} />
  );
};
