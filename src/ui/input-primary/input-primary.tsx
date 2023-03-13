import { forwardRef, Ref, useEffect, useState } from 'react';

import { getHighlightedText1 } from '../../common/get-highlighted-text';
import { InputPrimaryProps } from '../../utils/types/registration';

import classes from './input-primary.module.css';

export const InputPrimary = forwardRef((props: InputPrimaryProps, ref: Ref<HTMLInputElement>) => {
  const {
    type,
    name,
    id,
    placeholder,
    labelText,
    error,
    value,
    isNotValid,
    touchedFields,
    ...rest
  } = props;
  const [errR, setErrR] = useState<boolean>(false);
  
  useEffect(() => {
    if (error?.type === 'required') setErrR(true);
  }, [error?.type]);

  const setHintText = () => {
    // if (touchedFields && !value) return 'Поле не может быть пустым';
    if (error?.type === 'pattern') return error.message;
    if (labelText && error?.message) {
      return getHighlightedText1(labelText, error.message.split(' '));
    }

    return labelText;
  };

  return (
    <div className={classes.wrapper}>
      <input
        {...rest}
        ref={ref}
        className={classes.input}
        type={type}
        name={name}
        id={id}
        autoComplete='off'
      />
      <span className={value ? classes.placeholder_top : classes.placeholder}>{placeholder}</span>
      <hr className={error?.message ? `${classes.separator_err} ${classes.separator}` : classes.separator} />
      <label
        data-test-id='hint'
        className={
          error?.type === 'required' || error?.type === 'pattern' || isNotValid ? classes.error : classes.label
        }
        htmlFor={name}
      >
        {setHintText()}
      </label>
      {!value && touchedFields && (
        <span className={classes.error} data-test-id='hint'>
          Поле не может быть пустым
        </span>
      )}
    </div>
  );
});
