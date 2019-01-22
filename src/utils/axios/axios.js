import exercisesFixture from "./fixture/get/exercises.json";
import workoutsFixture from "./fixture/get/workouts.json";

const API_ENDPOINTS = {
  EXERCISES: "/exercises",
  WORKOUTS: "/workouts",
  ADD_EXERCISE: "/add-exercise",
  UPDATE_EXERCISES: "/update-exercises",
  ADD_WORKOUT: "/add-workout"
};

const generateId = array => {
  if (array.length < 1) {
    return 1;
  }

  const idArray = array.map(({ id }) => id);
  return Math.max(...idArray) + 1;
};

axios.get = function(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (url) {
        case API_ENDPOINTS.EXERCISES:
          resolve(exercisesFixture);
          break;
        case API_ENDPOINTS.WORKOUTS:
          resolve(workoutsFixture);
          break;
        default:
          break;
      }
    }, 1000);
  });
};

axios.post = function(url, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (url) {
        case API_ENDPOINTS.ADD_EXERCISE:
          resolve({ ...data, id: generateId(exercisesFixture) });
          break;
        case API_ENDPOINTS.UPDATE_EXERCISES:
          resolve("ok");
          break;
        case API_ENDPOINTS.ADD_WORKOUT:
          console.log(data);
          resolve("ok");
          break;

        default:
          break;
      }
    }, 1000);
  });
};

export function axios() {}
