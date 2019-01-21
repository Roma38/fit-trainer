import exercisesFixture from "./fixture/get/exercises.json";
import workoutsFixture from "./fixture/get/workouts.json";

const API_ENDPOINTS = {
  EXERCISES: "/exercises",
  WORKOUTS: "/workouts"
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

axios.post = function(url) {
  return new Promise();
};

export function axios() {}
