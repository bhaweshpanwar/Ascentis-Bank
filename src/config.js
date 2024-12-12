// src/config.js
export const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_KEY;

// Base API URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Endpoints
export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}${import.meta.env.VITE_API_LOGIN}`,
  HOME: `${API_BASE_URL}${import.meta.env.VITE_API_HOME}`,
  OTP: `${API_BASE_URL}${import.meta.env.VITE_API_OTP}`,
  FORGOT: `${API_BASE_URL}${import.meta.env.VITE_API_FORGOT}`,
  VALIDATE: `${API_BASE_URL}${import.meta.env.VITE_API_VALIDATE}`,
  CHANGE: `${API_BASE_URL}${import.meta.env.VITE_API_CHANGE}`,
  TRANSACTION: `${API_BASE_URL}${import.meta.env.VITE_API_TRANSACTION}`,
  TRANSACTION_LIST: `${API_BASE_URL}${
    import.meta.env.VITE_API_TRANSACTION_LIST
  }`,
  AUTOPAY_LIST: `${API_BASE_URL}${import.meta.env.VITE_API_AUTOPAY_LIST}`,
  EXISTING_FD: `${API_BASE_URL}${import.meta.env.VITE_API_EXISTING_FD}`,
  AUTOPAY: `${API_BASE_URL}${import.meta.env.VITE_API_AUTOPAY}`,
  AUTO_PWD: `${API_BASE_URL}${import.meta.env.VITE_API_AUTO_PWD}`,
  LOGOUT: `${API_BASE_URL}${import.meta.env.VITE_API_LOGOUT}`,
  DROP_FD: `${API_BASE_URL}${import.meta.env.VITE_API_DROP_FD}`,
  DROP_AUTOPAY: `${API_BASE_URL}${import.meta.env.VITE_API_DROP_AUTOPAY}`,
  FD: `${API_BASE_URL}${import.meta.env.VITE_API_FD}`,
  FD_PWD: `${API_BASE_URL}${import.meta.env.VITE_API_FD_PWD}`,
  ACCOUNT_INFO: `${API_BASE_URL}${import.meta.env.VITE_API_ACCOUNT_INFO}`,
  PAY: `${API_BASE_URL}${import.meta.env.VITE_API_PAY}`,
  CHECK_EMAIL: `${API_BASE_URL}${import.meta.env.VITE_API_CHECK_EMAIL}`,
  CHECK_USER_ID: `${API_BASE_URL}${import.meta.env.VITE_API_CHECK_USER_ID}`,
  VALIDATE_OTP: `${API_BASE_URL}${import.meta.env.VITE_API_VALIDATE_OTP}`,
  DELETE_ACCOUNT: `${API_BASE_URL}${import.meta.env.VITE_API_DELETE_ACCOUNT}`,
};
