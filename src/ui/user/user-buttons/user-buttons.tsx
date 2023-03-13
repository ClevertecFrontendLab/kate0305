import classnames from 'classnames/bind';

import { useAppDispatch } from '../../../hooks/redux';
import { logOut } from '../../../store/reducers/user-slice';
import { ButtonProfile } from '../button';

import classes from './user-buttons.module.css';

const style = classnames.bind(classes);

type UserButtonsProps = {
  isShow?: boolean;
  isNavBar?: boolean;
};

export const UserButtons = ({ isShow, isNavBar }: UserButtonsProps) => {
  const button = style({
    container: isShow || isNavBar,
    hide: !isShow,
  });

  const dispatch = useAppDispatch();

  const logOutUser = () => {
    dispatch(logOut());
  };

  return (
    <div className={button}>
      <ButtonProfile text='Профиль' />
      <ButtonProfile text='Выход' onClick={logOutUser} dataTest='exit-button' />
    </div>
  );
};
