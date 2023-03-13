/* eslint-disable react/button-has-type */
import classes from './btn.module.css';

type ButtonProps = {
  text: string;
  dataTestId?: string;
  className: string;
  id?: string;
  type?: 'button' | 'submit';
  form?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button = ({ text, dataTestId, className, id, form, disabled, type = 'button', onClick }: ButtonProps) => (
  <button
    disabled={disabled}
    form={form}
    onClick={onClick}
    className={`${classes.btn} ${classes[className]}`}
    type={type}
    id={id}
    data-test-id={dataTestId}
  >
    {text}
  </button>
);
