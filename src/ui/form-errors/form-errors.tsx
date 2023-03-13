import { Button } from '../buttons/btn-primary';

import classes from './form-errors.module.css';

type FormErrorsProps = {
  title: string;
  text: string;
  btnText?: string;
  onClick?: () => void;
}

export const FormErrors = ({ title, text, btnText, onClick }: FormErrorsProps) => (
  <div className={classes.wrapper} data-test-id='status-block'>
    <h1 className={classes.title}>{title}</h1>
    <p className={classes.text}>{text}</p>
    {btnText && <Button text={btnText} type='button' className='btnFormErr' onClick={onClick} />}
  </div>
);
