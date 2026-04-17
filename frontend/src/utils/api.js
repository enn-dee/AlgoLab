const apiURL = import.meta.env.VITE_BACKEND_URL
export const apiFetch = (endpoint, options = {}) => {
  return fetch(`${apiURL}/${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
      ...options.headers
    }
  });
};