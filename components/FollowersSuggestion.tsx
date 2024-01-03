import React from "react";
import { FollowersSuggestionCard } from "./FollowersSuggestionCard";
import { OwnProfilePage } from "./OwnProfilePage";
import { fetchSuggestedUsers,fetchFollowedUsers } from "@/lib/data";
import Link from "next/link";

type props = {
  loggedUser:any;
  userId: string;
};

const FollowersSuggestion = async ({loggedUser,userId}:props) => {
  //let loggedInUser = "7e648dc6-f120-42e6-9c34-8cf366a63654";
  const suggestedUser = await fetchSuggestedUsers(userId);
  const followedUser = await fetchFollowedUsers(userId);
  //console.log(suggestedUser);
  //console.log('---',followedUser)

  return (
    <div>
      <OwnProfilePage loggedUser={loggedUser}></OwnProfilePage>

      <div className="flex justify-between mb-4 lg:w-[350px]">
        <h1 className="text-[14px] text-gray-400 font-bold">
          Suggested for you
        </h1>
        <Link href={'/dashboard/all_suggestion'} className="text-[13px]">See All</Link>
      </div>
      {suggestedUser?.suggestions?.map((suggestion: any, index: any) => (
        <div key={index}>
          <FollowersSuggestionCard
            loggedInUser={userId}
            suggestion={suggestion}
          ></FollowersSuggestionCard>
        </div>
      ))}
    </div>
  );
};

export default FollowersSuggestion;
