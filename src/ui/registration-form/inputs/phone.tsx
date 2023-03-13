import InputMask from 'react-input-mask';

import { getHighlightedText1 } from '../../../common/get-highlighted-text';
import { InputsRegistrProps } from '../../../utils/types/registration';

import classes from './inputs.module.css';

export const PhoneInput = ({ register, error, value }: InputsRegistrProps) => (
    <div className={classes.wrapperPhone}>
      <InputMask
        className={classes.input}
        {...register('phone', {
          required: {
            value: value === '+375 (xx) xxx-xx-xx',
            message: 'Поле не может быть пустым',
          },
          pattern: {
            value: /^\+375(\s+)?\(?(29|33|44)\)?(\s+)?[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
            message: 'В формате +375 (xx) xxx-xx-xx',
          },
        })}
        type='tel'
        name='phone'
        id='phone'
        autoComplete='off'
        maskChar='x'
        mask='+375 (99) 999-99-99'
      />
      <span className={value ? classes.placeholder_top : classes.placeholder}>Номер телефона</span>
      <hr className={error?.message ? `${classes.separator_err} ${classes.separator}` : classes.separator} />
      <label
        data-test-id='hint'
        className={error?.type === 'required' || error?.type === 'pattern' ? classes.error : classes.label}
        htmlFor='phone'
      >
        {error?.message}
      </label>
    </div>
  );
