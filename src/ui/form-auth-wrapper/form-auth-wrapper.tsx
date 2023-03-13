import { NavLink } from 'react-router-dom';

import classes from './form-auth-wrapper.module.css';

type FormAutWrapperProps = {
  title: string;
  subTitle?: JSX.Element;
  form: JSX.Element;
  question: string;
  linkTo: string;
  linkText: string;
  navToAuth?: JSX.Element;
  dataTest?: string;
  enter?: boolean;
};

export const FormAuthWrapper = ({
  title,
  subTitle,
  form,
  question,
  linkTo,
  linkText,
  navToAuth,
  dataTest,
  enter,
}: FormAutWrapperProps) => (
  <div data-test-is={dataTest}>
    {navToAuth}
    <div className={classes.formContainer}>
      <div className={classes.header}>
        <h1 className={classes.title}>{title}</h1>
        {subTitle}
      </div>
      {form}
      <div className={classes.footer}>
        <div className={classes.container}>
          <p className={classes.question}>{question}</p>
          <NavLink to={linkTo} className={enter ? classes.enter : classes.link}>
            {linkText}
          </NavLink>
        </div>
      </div>
    </div>
  </div>
);
