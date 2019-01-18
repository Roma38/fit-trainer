import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { exercisesReduser } from "./exercises";
import { workoutsReduser } from "./workouts";

const rootReduser = combineReducers({
  auth: authReducer,
  exercises: exercisesReduser,
  workouts: workoutsReduser
});

export default rootReduser;
