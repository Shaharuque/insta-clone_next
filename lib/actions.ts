//contains all the mutation logics
"use server";

import axios from "axios";
import { cookies } from "next/headers";
import axiosInstance from "./axiosInstance";


export async function authenticate(data: any) {
  try {
    const res = await fetch("http://127.0.0.1:5000/user/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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


// export const parseImage=async ()=>{
//      try {
//         const fileId = "4f23068f-cceb-43e7-b9ae-eb129fbe66d0"
//         const formData = {
//           "fileId": fileId
//         }

//         // Define the URL for your POST request
//         const url = 'http://127.0.0.1:5000/storage/url/parser';

//         // Make a POST request with custom headers using Axios
//         const response = await axiosInstance.post(url, formData);

//         // Handle the response data
//         console.log(response.data);
//       } catch (error) {
//         // Handle errors
//         console.error('Error:', error);
//       }
//     } 