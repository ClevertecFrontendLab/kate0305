import { ElementType } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

export type RegistrationFormValues = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export type AuthFormValues = {
  identifier: string;
  password: string;
};

export type RecoveryFormValues = {
  email: string;
};

export interface ForgotFormValues {
  password: string;
  passwordConfirmation: string;
};

export interface ForgotFormReq extends ForgotFormValues {
  code: string | null;
};

export type InputPrimaryProps = {
  as?: ElementType;
  mask?: Array<string | RegExp>;
  type?: 'text' | 'password' | 'email' | 'tel';
  name: string;
  id: string;
  placeholder: string;
  labelText?: string;
  error: FieldError | undefined;
  value: string | undefined;
  isNotValid?: boolean;
  touchedFields?: boolean | undefined;
  //   getValues: UseFormGetValues<RegistrationFormValues>;
};

interface InputsProps {
  error: FieldError | undefined;
  isDirty?: boolean | undefined;
  value?: string | undefined;
}

export interface InputsRegistrProps extends InputsProps {
  register: UseFormRegister<RegistrationFormValues>;
};

export interface InputsForgotProps extends InputsProps {
  register: UseFormRegister<ForgotFormValues>;
  newPassword?: string;
};


export type InputsTelProps = {
  error: FieldError | undefined;
  isDirty?: boolean | undefined;
  value?: string | undefined;
};
