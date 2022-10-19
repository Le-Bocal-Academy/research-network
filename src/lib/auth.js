import { API_URL, API_TOKEN_NAME, handleResponse } from "./constants";

export const isLoggedIn = () => !!localStorage.getItem(API_TOKEN_NAME);
export const authenticate = (options = {}) => {
  options.headers = options.headers || {};
  options.headers["Content-Type"] = "application/json";
  if (isLoggedIn()) {
    options.headers.Authorization =
      "bearer " + localStorage.getItem(API_TOKEN_NAME);
  }
  return options;
};

export async function login(credentials = {}) {
  const response = await fetch(API_URL + "/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await handleResponse(response);
  localStorage.setItem(API_TOKEN_NAME, data.token);
  return data.success;
}

export async function register(credentials) {
  const response = await fetch(API_URL + "/register", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await handleResponse(response);
  return data.success;
}

export async function getProfile(id = "") {
  const path = id ? `/user/${id}` : "/user";
  const options = authenticate();
  const response = await fetch(API_URL + path, options);
  const data = await handleResponse(response);
  return data;
}

export async function updateProfile(profile) {
  const options = authenticate({
    method: "PUT",
    body: JSON.stringify({
      email: profile.email,
      firstname: profile.firstname,
      lastname: profile.lastname,
      age: Number(profile.age),
      occupation: profile.occupation,
    }),
  });
  const response = await fetch(API_URL + "/user", options);
  const data = await handleResponse(response);
  return data;
}
