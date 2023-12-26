import axios from "axios";

const axiosInstance = axios.create();

const getToken = async (refresh_token: any) => {
  try {
    const formData = {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    };
    // Define your headers
    const headers = {
      "Content-Type": "application/json",
    };
    // Define the URL for your POST request
    const url = "http://127.0.0.1:5000/user/auth";

    // Make a POST request with custom headers using Axios
    const response = await axios.post(url, formData, { headers });
    return response;
  } catch (error) {
    throw new Error("Failed to get a new token");
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    // Check if the token is valid before sending the request
    const refresh_token = localStorage.getItem("refresh_token"); // Assuming token is stored in localStorage
    let newToken = "";

    if (refresh_token) {
      // Check token validity here, you might have your own validation logic
      // For example, you could decode the token and check its expiration date
      try {
        const response = await getToken(refresh_token);
        localStorage.setItem("token", response.data.access_token);
        newToken = response.data.access_token;
      } catch (error) {
        // Handle errors
        console.error("Error:", error);
      }
    }

    // Set the token in the request header
    config.headers.token = `Bearer ${newToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
