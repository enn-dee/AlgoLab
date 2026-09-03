// export const apiFetch = async (endpoint, options = {}) => {
//   const token = localStorage.getItem("token");

//   const response = await fetch(`/api/${endpoint}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//       ...options.headers,
//     },
//   });

//   const contentType = response.headers.get("content-type");
//   const isJson = contentType && contentType.includes("application/json");

//   if (!isJson) {
//     const text = await response.text();
//     console.error(
//       `Non-JSON response (${response.status}): ${text.substring(0, 200)}`,
//     );
//     throw new Error(
//       "API returned HTML instead of JSON. Backend might not be running or proxy not working.",
//     );
//   }

//   if (!response.ok) {
//     const data = await response
//       .clone()
//       .json()
//       .catch(() => ({}));
//     throw new Error(
//       data.msg || data.error || `Request failed (${response.status})`,
//     );
//   }

//   return response;
// };

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  // 🔥 If body is FormData, do NOT set Content-Type
  const isFormData = options.body instanceof FormData;

  const headers = {
    // Only set Content-Type for JSON, skip for FormData
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    Authorization: token,
    ...options.headers,
  };

  // Remove Content-Type header if it was set to undefined (in case options.headers overrides)
  // but we handle it by not including it.

  const response = await fetch(`/api/${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  if (!isJson) {
    const text = await response.text();
    console.error(
      `Non-JSON response (${response.status}): ${text.substring(0, 200)}`,
    );
    throw new Error(
      "API returned HTML instead of JSON. Backend might not be running or proxy not working.",
    );
  }

  if (!response.ok) {
    const data = await response
      .clone()
      .json()
      .catch(() => ({}));
    throw new Error(
      data.msg || data.error || `Request failed (${response.status})`,
    );
  }

  return response;
};
