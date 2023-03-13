import classnames from 'classnames/bind';

import { ButtonEyeProps } from '../../../utils/types/buttons';

import classes from './btn-eye.module.css';

const style = classnames.bind(classes);

export const ButtonEye = ({ isOpen, onClick }: ButtonEyeProps) => {
  const eye = style({
    eye: true,
    open: isOpen,
  });

  return (
    <button
      className={eye}
      onClick={onClick}
      data-test-id={isOpen ? 'eye-opened' : 'eye-closed'}
      type='button'
      aria-label='eye'
    />
  );
};
