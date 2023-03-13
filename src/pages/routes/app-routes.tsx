import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthForm } from '../../ui/auth-form';
import { Layout } from '../../ui/layout';
import { LayoutAuthorization } from '../../ui/layout-auth';
import { LayoutMainPage } from '../../ui/layout-main-page';
import { RegistrationForm } from '../../ui/registration-form';
import { PAGE_PATHS } from '../../utils/consts';
import { BookPage } from '../book';
import { ForgotPasswordForm } from '../forgot-password';
import { MainPage } from '../main';
import { Terms } from '../terms';

import { AuthRoute } from './auth-route';
import { PrivateRoute } from './private-routes';

export const AppRouter = () => (
  <Routes>
    <Route
      path={PAGE_PATHS.mainPagePath}
      element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }
    >
      <Route element={<LayoutMainPage />}>
        <Route path={PAGE_PATHS.mainPagePath} element={<Navigate to='/books/all' />} />
        <Route path={PAGE_PATHS.booksCategoryPagePath} element={<MainPage />} />
        <Route path={PAGE_PATHS.termsOfUsePagePath} element={<Terms title='terms' />} />
        <Route path={PAGE_PATHS.contractOfferPagePath} element={<Terms title='contract' />} />
      </Route>
      <Route path={PAGE_PATHS.bookPagePath} element={<BookPage />} />
    </Route>

    <Route
      element={
        <AuthRoute>
          <LayoutAuthorization />
        </AuthRoute>
      }
    >
      <Route path={PAGE_PATHS.mainPagePath} element={<Navigate to='/auth' />} />
      <Route path={PAGE_PATHS.authPagePath} element={<AuthForm />} />
      <Route path={PAGE_PATHS.registrationPagePath} element={<RegistrationForm />} />
      <Route path={PAGE_PATHS.forgotPassPagePath} element={<ForgotPasswordForm />} />
    </Route>
  </Routes>
);
