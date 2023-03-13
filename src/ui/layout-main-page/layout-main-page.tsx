import { Outlet } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';
import { NavBar } from '../nav-bar';

import classes from './layout-main-page.module.css';

export const LayoutMainPage = () => {
  const isBurgerOpen = useAppSelector((state) => state.burgerReduser.isMenuOpen);

  return (
    <main className={classes.wrapper}>
      {isBurgerOpen || <NavBar />}
      <div className={classes.content}>
        <Outlet />
      </div>
    </main>
  );
};
