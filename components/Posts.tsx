// "use client"
import { fetchFollowersPost } from "@/lib/data";
import Post from "./Post";
// import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
// import { parseImage } from "@/lib/actions";


async function Posts() {

  const posts = await fetchFollowersPost();
  //console.log(posts)

  //server side rendering I have to use middleware concept here cuz axios interceptor only works on client side
  //const parsed=await parseImage()   

  // useEffect(() => {
  //   const callFunction = async () => {
  //     try {
  //       const fileId = "4f23068f-cceb-43e7-b9ae-eb129fbe66d0"
  //       const formData = {
  //         "fileId": fileId
  //       }

  //       // Define the URL for your POST request
  //       const url = 'http://127.0.0.1:5000/storage/url/parser';

  //       // Make a POST request with custom headers using Axios
  //       const response = await axiosInstance.post(url, formData);

  //       // Handle the response data
  //       console.log(response.data);
  //     } catch (error) {
  //       // Handle errors
  //       console.error('Error:', error);
  //     }
  //   }

  //   callFunction()
  // }, [])


  return (
    <>
      {posts?.ads?.map((post:any) => (
        <Post key={post._id} post={post} />
      ))}
      <h1>Test</h1>
    </>
  );
}

export default Posts;
