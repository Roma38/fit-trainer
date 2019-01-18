export const WORKOUTS_LOADING = "WORKOUTS_LOADING";
export const WORKOUTS_LOAD_SUCCEED = "WORKOUTS_LOAD_SUCCEED";
export const WORKOUTS_LOAD_FAILED = "WORKOUTS_LOAD_FAILED";

export const workoutsLoadStart = () => ({ type: WORKOUTS_LOADING });

export const workoutsLoadSucceed = items => ({
  type: WORKOUTS_LOAD_SUCCEED,
  payload: items
});

export const workoutsLoadFailed = error => ({
  type: WORKOUTS_LOAD_FAILED,
  payload: error
});
