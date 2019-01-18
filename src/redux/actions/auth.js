export const AUTH_REQUESTED = "AUTH_REQUESTED";
export const AUTH_SUCCEED = "AUTH_SUCCEED";
export const AUTH_FAILED = "AUTH_FAILED";
export const LOG_OUT = "LOG_OUT";

export const authRequested = (email, password, confirmPass) => ({
  type: AUTH_REQUESTED,
  payload: { email, password, confirmPass }
});

export const authSucceed = (email, token) => ({
  type: AUTH_SUCCEED,
  payload: { email, token }
});

export const authFailed = error => ({
  type: AUTH_FAILED,
  payload: error
});

export const logOut = () => ({
  type: LOG_OUT
});
