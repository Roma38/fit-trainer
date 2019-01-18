import {
  AUTH_REQUESTED,
  AUTH_SUCCEED,
  AUTH_FAILED,
  LOG_OUT
} from "../actions/auth";

const initialState = {
  authLoading: false,
  loggedIn: false,
  authError: null,
  email: null,
  token: null
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_REQUESTED:
      return { ...state, authLoading: true, authError: null };
    case AUTH_SUCCEED:
      return {
        ...state,
        loggedIn: true,
        email: payload.email,
        token: payload.token,
        authError: null
      };
    case AUTH_FAILED:
      return { ...state, authError: payload.error };
    case LOG_OUT:
      return { ...state, loggedIn: false, email: null, token: null };

    default:
      return state;
  }
};