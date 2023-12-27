//contains all the mutation logics
"use server";

import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create();

const getToken = async (refresh_token: any) => {
  //console.log("from axios instance",refresh_token)
  try {
    const formData = {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    };
    //console.log("from axios instance",formData)
    // Define your headers
    const headers = {
      "Content-Type": "application/json",
    };
    // Define the URL for your POST request
    const url = "http://127.0.0.1:5000/user/auth";

    // Make a POST request with custom headers using Axios
    const response = await axios.post(url, formData, { headers });

    // cookies().set("access_token", response.data.access_token, {
    //   path: "/",
    //   domain: "localhost",
    //   maxAge: response.data?.expires_in,
    //   httpOnly: true,
    //   secure: false,
    // });
    return response;
  } catch (error) {
    throw new Error("Failed to get a new token");
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    // Check if the token is valid before sending the request
    const refresh_token = cookies().get("refresh_token")?.value; // Assuming token is stored in localStorage
    //console.log("from axios instance",refresh_token)
    let newToken = "";

    if (refresh_token) {
      // Check token validity here, you might have your own validation logic
      // For example, you could decode the token and check its expiration date
      try {
        const response = await getToken(refresh_token);

        newToken = response.data.access_token;
        //console.log("from axios instance",newToken)
      } catch (error) {
        // Handle errors
        console.error("Error:", error);
      }
    }

    // Set the token in the request header
    config.headers.Authorization = `Bearer ${newToken}`;
    //console.log("from axios instance",config)

    return config;
  },
  (error) => Promise.reject(error)
);

// export default axiosInstance;

export async function authenticate(data: any) {
  try {
    const res = await fetch("http://127.0.0.1:5000/user/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-cache", //is so important than can fuck u up if you don't use it . in every req u have to use this line of code
    });

    const user = await res.json();
    console.log(user);

    if (user?.access_token) {
      cookies().set("access_token", user?.access_token, {
        path: "/",
        domain: "localhost",
        maxAge: user?.expires_in,
        httpOnly: true,
        secure: false,
      });
    }

    if (user?.refresh_token) {
      cookies().set("refresh_token", user?.refresh_token, {
        path: "/",
        domain: "localhost",
        maxAge: 60 * 60 * 7,
        httpOnly: true,
        secure: false,
      });
    }

    // if (res.ok && user) {
    //   return user;
    // } else {
    //   console.log("login api not working");
    //   return null;
    // }
  } catch (error: any) {
    console.log("From the authenticate function", error);
    if (error.response) {
      console.log(error.response?.data);
      return error.response?.body?.error;
    }

    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialsSignIn";
    }
    return "authentication error";
  }
}

export async function followUser() {
  try {
  } catch (error) {
    console.log("Error while executing action", error);
  }
}

//Logged in user data
export const fetchLoggedInUser = async () => {
  try {
    // Define the URL for your POST request
    const url = "http://127.0.0.1:5000/user/auth/loggedin/user";

    // Make a POST request with custom headers using Axios
    const response = await axiosInstance.get(url);

    // Handle the response data
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
  }
};

export const parseImage = async () => {
  try {
    const fileId = "4f23068f-cceb-43e7-b9ae-eb129fbe66d0";
    const formData = {
      fileId: fileId,
    };

    // Define the URL for your POST request
    const url = "http://127.0.0.1:5000/storage/url/parser";

    // Make a POST request with custom headers using Axios
    const response = await axiosInstance.post(url, formData);

    // Handle the response data
    //console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
  }
};
