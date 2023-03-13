import { useState } from 'react';

import { PAGE_PATHS } from '../../utils/consts';
import { FormAuthWrapper } from '../form-auth-wrapper';
import { FormErrors } from '../form-errors';

import { FormAuth } from './form';

export const AuthForm = () => {
  const [showForm, setShowForm] = useState(true);
  const closeForm = () => setShowForm(false);

  const onClick = () => {
    setShowForm(true);
  }

  return showForm ? (
    <FormAuthWrapper
      title='Вход в личный кабинет'
      form={<FormAuth onClose={closeForm} />}
      question='Нет учётной записи?'
      linkTo={PAGE_PATHS.registrationPagePath}
      linkText='Регистрация'
    />
  ) : (
    <FormErrors
      title='Вход не выполнен'
      text='Что-то пошло не так. Попробуйте ещё раз'
      btnText='Повторить'
      onClick={onClick}
    />
  );
};
