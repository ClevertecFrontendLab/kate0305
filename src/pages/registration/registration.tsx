import { useState } from 'react';
import { createPortal } from 'react-dom';

import { useAppDispatch } from '../../hooks/redux';
import { Preloader } from '../../ui/preloader';
import { RegistrationForm } from '../../ui/registration-form';

import classes from './registration.module.css';

export const Registration = () => {
  const [showModal, setShowModal] = useState(true);
  const closeModal = () => setShowModal(false);
  const domElement = document.getElementById('app') as HTMLElement;

  return <RegistrationForm />;
};
