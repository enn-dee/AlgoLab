export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  console.log(`Making request to: /api/${endpoint}`);

  const response = await fetch(`/api/${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      ...options.headers,
    },
  });

  console.log(`Response status: ${response.status}`);
  console.log(`Response URL: ${response.url}`);

  // Check if response is JSON
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response;
  } else {
    
    console.error(`Expected JSON but got ${contentType}`);
    const text = await response.text();
    console.error(`First 200 chars: ${text.substring(0, 200)}`);
    throw new Error(
      `API returned HTML instead of JSON. Backend might not be running or proxy not working.`,
    );
  }
};
