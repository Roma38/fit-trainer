import {
  EXERCISES_LOADING,
  EXERCISES_LOAD_SUCCEED,
  EXERCISES_LOAD_FAILED
} from "../actions/exercises";

const initialState = {
  loading: false,
  succeed: false,
  error: null,
  items: []
};

export const exercisesReduser = (state = initialState, { type, payload }) => {
  switch (type) {
    case EXERCISES_LOADING:
      return { ...state, loading: true, succeed: false };
    case EXERCISES_LOAD_SUCCEED:
      return { ...state, loading: false, succeed: true, items: payload };
    case EXERCISES_LOAD_FAILED:
      return {
        ...state,
        loading: false,
        succeed: false,
        error: payload,
        items: []
      };

    default:
      return state;
  }
};
