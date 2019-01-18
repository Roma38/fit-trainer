export const EXERCISES_LOADING = "EXERCISES_LOADING";
export const EXERCISES_LOAD_SUCCEED = "EXERCISES_LOAD_SUCCEED";
export const EXERCISES_LOAD_FAILED = "EXERCISES_LOAD_FAILED";

export const exercisesLoadStart = () => ({ type: EXERCISES_LOADING });

export const exercisesLoadSucceed = exercises => ({
  type: EXERCISES_LOAD_SUCCEED,
  payload: exercises
});

export const exercisesLoadFailed = error => ({
  type: EXERCISES_LOAD_FAILED,
  payload: error
});
