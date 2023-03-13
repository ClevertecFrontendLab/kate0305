/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classnames from 'classnames/bind';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { booksAPI } from '../../services/book-sevice';
import { closeMenu } from '../../store/reducers/burger-menu-slice';
import { PAGE_PATHS } from '../../utils/consts';
import { AmountOfBooksInCategory, NavMenuProps } from '../../utils/types/navbar';
import { ButtonDropdown } from '../buttons/btn-dropdown';
import { UserButtons } from '../user/user-buttons';

import classes from './nav-bar.module.css';

const style = classnames.bind(classes);

export const NavBar = ({ dataTestId }: NavMenuProps) => {
  const [isOpenBooksCaregorty, setOpenBooksCaregorty] = useState<boolean>(true);
  const [width, setWidth] = useState(window.innerWidth);

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const close = () => dispatch(closeMenu());
  const isBurgerOpen = useAppSelector((state) => state.burgerReduser.isMenuOpen);
  const { isAuth } = useAppSelector((state) => state.userReduser);

  const [getCategories, { data: categoriesData }] = booksAPI.useLazyGetCategoriesQuery();

  const [getBooks, { data: booksData }] = booksAPI.useLazyGetListBooksQuery();

  useEffect(() => {
    if (isAuth) {
      getCategories();
      getBooks('', false);
    }
  }, [getBooks, getCategories, isAuth]);

  const categoriesArray = booksData?.map(({ categories }) => categories ?? '').flat();

  const amountOfBooks = categoriesArray?.reduce((prev, cur) => {
    prev[cur] = (prev[cur] || 0) + 1;

    return prev;
  }, {} as AmountOfBooksInCategory);

  const getNumberOfBooks = (category: AmountOfBooksInCategory, key: string) => (category[key] > 0 ? category[key] : 0);

  const setActive = ({ isActive }: { isActive: boolean }) => (isActive ? classes.active : classes.link);
  const setActiveGenre = ({ isActive }: { isActive: boolean }) => (isActive ? classes.activeGenre : classes.genre);

  const toggleBooksList = () => setOpenBooksCaregorty(!isOpenBooksCaregorty);
  const closeBooksList = () => {
    setOpenBooksCaregorty(false);
    close();
  };

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResizeWindow);

    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const books = style({
    showcase: true,
    active: pathname.includes('books'),
  });

  const className = style({
    wrapper: true,
    burger: isBurgerOpen,
  });

  const list = style({
    list: true,
    hidden: !isOpenBooksCaregorty,
  });

  return (
    <nav className={className} data-test-id={dataTestId}>
      <div>
        <div className={books}>
          <NavLink
            to='/books/all'
            className={classes.link}
            data-test-id={isBurgerOpen ? 'burger-showcase' : 'navigation-showcase'}
            onClick={toggleBooksList}
          >
            Витрина книг
          </NavLink>
          {pathname.includes('books') && (
            <ButtonDropdown isOpen={isOpenBooksCaregorty} isColor={true} onClick={toggleBooksList} />
          )}
        </div>

        {categoriesData && isOpenBooksCaregorty && (
          <ul className={list}>
            <NavLink
              to='/books/all'
              className={setActiveGenre}
              data-test-id={width < 800 ? 'burger-books' : 'navigation-books'}
              onClick={close}
            >
              Все книги
            </NavLink>
            {categoriesData.map(({ id, path, name }) => (
              <div key={`${id}`}>
                <NavLink
                  to={`/books/${path}`}
                  className={setActiveGenre}
                  onClick={close}
                  data-test-id={isBurgerOpen ? `burger-${path}` : `navigation-${path}`}
                >
                  {name}
                </NavLink>
                <span
                  className={classes.amount}
                  data-test-id={isBurgerOpen ? `burger-book-count-for-${path}` : `navigation-book-count-for-${path}`}
                >
                  {amountOfBooks && getNumberOfBooks(amountOfBooks, name)}
                </span>
              </div>
            ))}
          </ul>
        )}
      </div>
      <NavLink
        to={PAGE_PATHS.termsOfUsePagePath}
        className={setActive}
        data-test-id={isBurgerOpen ? 'burger-terms' : 'navigation-terms'}
        onClick={closeBooksList}
      >
        Правила пользования
      </NavLink>
      <NavLink
        to={PAGE_PATHS.contractOfferPagePath}
        className={setActive}
        data-test-id={isBurgerOpen ? 'burger-contract' : 'navigation-contract'}
        onClick={closeBooksList}
      >
        Договор оферты
      </NavLink>
      {width < 800 && <UserButtons isNavBar={true} />}
    </nav>
  );
};
