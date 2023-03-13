import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';

import { sortBooks } from '../../common/sort-books';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { booksAPI } from '../../services/book-sevice';
import { booksSlice, setBooksByCategory } from '../../store/reducers/books-slice';
import { BookList } from '../../ui/book-list';
import { EmptyList } from '../../ui/empty-list-books';
import { NavMenu } from '../../ui/navigation-menu';
import { Preloader } from '../../ui/preloader';
import { Toast } from '../../ui/toast';
import { ListOfBooks } from '../../utils/types/book';

import classes from './main-page.module.css';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { sortedBooks, booksByCategory, foundBooks, searchValue } = useAppSelector((state) => state.booksReduser);
  const { isAuth } = useAppSelector((state) => state.userReduser);
  const { category } = useParams();
  const [view, setView] = useState<string>('tile');
  const [showToast, setShowToast] = useState(false);
  const closeToast = () => setShowToast(false);

  const [
    getBooks,
    { isError: errBooks, isLoading: loadBooks, data: booksData, isFetching, isSuccess: successCategory },
  ] = booksAPI.useLazyGetListBooksQuery();

  const [
    getCategories,
    { data: categoriesData, isError: errCategories, isLoading: loadCategories, isSuccess: successBook },
  ] = booksAPI.useLazyGetCategoriesQuery();

  useEffect(() => {
    if (isAuth) {
      getCategories();
      getBooks('', false);
    }
  }, [getBooks, getCategories, isAuth]);

  const { setSortedBooks } = booksSlice.actions;

  useEffect(() => {
    if (errBooks || errCategories) setShowToast(true);
  }, [errBooks, errCategories]);

  useEffect(() => {
    if (successCategory && successBook) {
      const booksAfterSort = sortBooks(booksData as ListOfBooks[], true);

      dispatch(setSortedBooks(booksAfterSort));
    }
  }, [successCategory, booksData, dispatch, setSortedBooks, successBook]);

  useEffect(() => {
    const currentCategory = categoriesData?.find((i) => i.path === category)?.name;
    const booksByCurrentCategory = sortedBooks.filter(
      ({ categories }) => categories?.filter((i) => i === currentCategory).length
    );
    const books = category === 'all' ? sortedBooks : booksByCurrentCategory;

    dispatch(setBooksByCategory(books));
  }, [categoriesData, category, sortedBooks, dispatch]);

  const domElement = document.getElementById('app') as HTMLElement;

  if (loadBooks || loadCategories || isFetching) return <Preloader />;

  return (
    <React.Fragment>
      {showToast && createPortal(<Toast onClose={closeToast} />, domElement)}
      <section className={classes.wrapper}>
        {successCategory && successBook && (
          <React.Fragment>
            <NavMenu setView={setView} />
            {booksByCategory.length ? (
              <BookList view={view} books={searchValue ? foundBooks : booksByCategory} />
            ) : (
              <EmptyList text='В этой категории книг ещё нет' dataTestId='empty-category' />
            )}
          </React.Fragment>
        )}
      </section>
    </React.Fragment>
  );
};
