
export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`/api/${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      ...options.headers,
    },
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
