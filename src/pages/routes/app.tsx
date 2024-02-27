import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';
import { history } from '@redux/configure-store';
import { selectIsLoading } from '@redux/redusers/app-slice';
import { useAppSelector } from '@hooks/index';
import { Paths, AuthPaths, ResultPaths } from '@type/paths';
import { ResultRequestKeys } from '@type/result-request-keys';
import { AuthPage } from '@pages/auth-page';
import { PrivateRoute } from '@pages/routes/private-routes';
import { PublicRoute } from '@pages/routes/public-routes';
import { ChangePasswordForm } from '@components/form/change-password-form';
import { ConfirmEmailForm } from '@components/form/confirm-email-form';
import { AuthLayout } from '@components/layouts/auth-layout';
import { Loader } from '@components/loader';
import { RequestResult } from '@components/request-result/request-result';
import { MainLayout } from '@components/layouts/main-layout';

const MainPage = lazy(() => import('..'));

export const App = () => {
    const isLoading = useAppSelector(selectIsLoading);
    return (
        <>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path={Paths.HOME} element={<Navigate to={Paths.MAIN} replace />}></Route>
                    <Route
                        path={Paths.MAIN}
                        element={
                            <PrivateRoute>
                                <MainLayout />
                            </PrivateRoute>
                        }
                    >
                        <Route index element={<MainPage />} />
                    </Route>
                    <Route
                        path={Paths.AUTH}
                        element={
                            <PublicRoute>
                                <AuthLayout />
                            </PublicRoute>
                        }
                    >
                        <Route index element={<AuthPage />} />
                        <Route path={AuthPaths.REGISTRATION} element={<AuthPage />} />
                        <Route path={AuthPaths.CONFIRM_EMAIL} element={<ConfirmEmailForm />} />
                        <Route path={AuthPaths.CHANGE_PASSWORD} element={<ChangePasswordForm />} />
                    </Route>
                    <Route path={Paths.RESULT} element={<AuthLayout />}>
                        <Route
                            path={ResultPaths.REGISTRATION_SUCCESS}
                            element={<RequestResult keyErr={ResultRequestKeys.SIGN_UP_SUC} />}
                        />
                        <Route
                            path={ResultPaths.REGISTRATION_ERR}
                            element={<RequestResult keyErr={ResultRequestKeys.SIGN_UP_ERR} />}
                        />
                        <Route
                            path={ResultPaths.REGISTRATION_ERR_409}
                            element={<RequestResult keyErr={ResultRequestKeys.SIGN_UP_ERR_409} />}
                        />
                        <Route
                            path={ResultPaths.LOGIN_ERR}
                            element={<RequestResult keyErr={ResultRequestKeys.SIGN_IN_ERR} />}
                        />
                        <Route
                            path={ResultPaths.CHECK_EMAIL_ERR}
                            element={<RequestResult keyErr={ResultRequestKeys.CHECK_EMAIL_ERR} />}
                        />
                        <Route
                            path={ResultPaths.CHECK_EMAIL_ERR_404}
                            element={
                                <RequestResult keyErr={ResultRequestKeys.CHECK_EMAIL_ERR_404} />
                            }
                        />
                        <Route
                            path={ResultPaths.CHANGE_PASSWORD_SUCCESS}
                            element={
                                <RequestResult keyErr={ResultRequestKeys.CHANGE_PASSWORD_SUCCESS} />
                            }
                        />
                        <Route
                            path={ResultPaths.CHANGE_PASSWORD_ERR}
                            element={
                                <RequestResult keyErr={ResultRequestKeys.CHANGE_PASSWORD_ERR} />
                            }
                        />
                    </Route>
                </Routes>
            </HistoryRouter>
            {isLoading && <Loader />}
        </>
    );
};