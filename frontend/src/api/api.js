import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    console.log(config, ".............config");
    if (config.url == "/login" || config.url == "/register") {
      return config;
    }
    const accessToken = JSON.parse(
      localStorage.getItem("accessToken") || "null",
    );

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired or invalid");

      const originalRequest = error.config;

      // Already tried refreshing → logout
      if (originalRequest?._retry) {
        window.dispatchEvent(new Event("auth:logout"));
        return Promise.reject(error);
      }

      try {
        // Mark request as already retried
        originalRequest._retry = true;

        // Call refresh token API
        const result = await refreshApi.get("/auth/getAccessToken");

        const newAccessToken = result.data.data.accessToken;
        console.log(result, ".....result");
        console.log(newAccessToken, "new aceess token");

        if (newAccessToken) {
          // Store new access token
          localStorage.setItem("accessToken", JSON.stringify(newAccessToken));

          // Update original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry original request
          return api(originalRequest);
        }

        // No new token
        window.dispatchEvent(new Event("auth:logout"));

        return Promise.reject(error);
      } catch (refreshError) {
        console.log("Refresh token failed");

        window.dispatchEvent(new Event("auth:logout"));

        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 403) {
      console.log("You don't have permission");
    }

    return Promise.reject(error);
  },
);

export default api;
