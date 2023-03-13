import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store/store';
import { BookData, ListOfBooks, LoginInfo, RecoveryInfo, UserResponse } from '../utils/types/book';
import { CategoriesList } from '../utils/types/navbar';
import { AuthFormValues, ForgotFormReq, RecoveryFormValues, RegistrationFormValues } from '../utils/types/registration';

export const booksAPI = createApi({
  reducerPath: 'booksAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://strapi.cleverland.by',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const { isAuth, token } = (getState() as RootState).userReduser;

      if (isAuth) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getListBooks: build.query<ListOfBooks[], string>({
      query: () => '/api/books',
    }),
    getCategories: build.query<CategoriesList[], void>({
      query: () => '/api/categories',
    }),
    getBook: build.query<BookData, string>({
      query: (id) => `/api/books/${id}`,
    }),
    registrationUser: build.mutation<UserResponse, RegistrationFormValues>({
      query(data) {
        return {
          url: '/api/auth/local/register',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
    }),
    loginUser: build.mutation<LoginInfo, AuthFormValues>({
      query(data) {
        return {
          url: '/api/auth/local',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
    }),
    recoveryPassword: build.mutation<RecoveryInfo, RecoveryFormValues>({
      query(data) {
        return {
          url: '/api/auth/forgot-password',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
    }),
    setNewPassword: build.mutation<UserResponse, ForgotFormReq>({
      query(data) {
        return {
          url: '/api/auth/reset-password',
          method: 'POST',
          body: data,
          credentials: 'include',
        };
      },
    }),
  }),
});
