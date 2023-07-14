import { ERROR_LENGTH, ERROR_PASSWORD, ERROR_STATUS } from '../constants/index.js';
import { userBase } from '../store/index.js';

export const checkValidationPassword = (name: string, password: string, index: number) => {
  const isError = password.length < 5 || name.length < 5;
  return { password, name, error: isError, errorText: isError ? ERROR_LENGTH : '', index };
};

export const checkUserRegValidation = (name: string, password: string) => {
  const infoUser = userBase.getUserStorage(name)!;
  if (infoUser.password !== password) {
    return { password, name, error: true, errorText: ERROR_PASSWORD, index: infoUser.index };
  }
  if (infoUser.status) {
    return { password, name, error: true, errorText: ERROR_STATUS, index: infoUser.index };
  }
  return { password, name, error: false, errorText: '', index: infoUser.index };
};
