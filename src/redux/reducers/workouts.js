import {
  WORKOUTS_LOADING,
  WORKOUTS_LOAD_SUCCEED,
  WORKOUTS_LOAD_FAILED,
  ADD_WORKOUT,
  UPDATE_WORKOUT
} from "../actions/workouts.js";

const initialState = {
  loading: false,
  succeed: false,
  error: null,
  items: []
};

export const workoutsReduser = (state = initialState, { type, payload }) => {
  switch (type) {
    case WORKOUTS_LOADING:
      return { ...state, loading: true, succeed: false };
    case WORKOUTS_LOAD_SUCCEED:
      return { ...state, loading: false, succeed: true, items: payload };
    case WORKOUTS_LOAD_FAILED:
      return { ...state, loading: false, succeed: false, error: payload, items: [] };
    case ADD_WORKOUT:
      return { ...state, items: [...state.items, payload] };
      
    case UPDATE_WORKOUT:
      const workoutIndex = state.items.findIndex(({date}) => date === payload.date)
      state.items[workoutIndex] = { date: payload.date, program: payload.program }
      return { ...state };

    default:
      return state;
  }
};
