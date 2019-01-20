import exercisesFixture from "./fixture/get/exercises.json";

const API_ENDPOINTS = {
  EXERCISES: "/exercises"
};

axios.get = function(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (url) {
        case API_ENDPOINTS.EXERCISES:
          resolve(exercisesFixture);
          break;
      }
    }, 1000);
  });
};

axios.post = function(url) {
  return new Promise();
};

export function axios() {}
